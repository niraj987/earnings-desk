"""LangGraph orchestration: fan-out / fan-in with a manager.

            ┌──> Revenue Analyst ──┐
 Extraction ┼──> Risk Analyst    ──┼──> Editor Manager
            ├──> Outlook Analyst ──┤
            └──> Comparison Agent ─┘
"""
import operator, time
from typing import Annotated, Any, TypedDict
from agents import extraction, revenue_analyst, risk_analyst, outlook_analyst, comparison_agent, editor_manager
from core import llm


class State(TypedDict, total=False):
    report_text: str
    prior_text: str
    use_llm: bool
    company: str
    period: str
    sentences: list
    figures: list
    prior_figures: list
    revenue: Any
    risk: Any
    outlook: Any
    comparison: Any
    note: dict
    trace: Annotated[list, operator.add]       # reducer lets parallel branches append safely


def _t(agent, t0, info):
    return {"agent": agent, "seconds": round(time.perf_counter() - t0, 4), "info": info}


def n_extract(s: State):
    t0 = time.perf_counter()
    if s.get("figures"):                         # what-if mode: reuse (edited) figures
        return {"trace": [_t("Extraction", t0, "reused supplied figures")]}
    cur = extraction.run(s["report_text"], "F")
    prior = extraction.run(s["prior_text"], "P") if s.get("prior_text") else None
    return {"company": cur.company, "period": cur.period, "sentences": cur.sentences, "figures": cur.figures,
            "prior_figures": prior.figures if prior else [],
            "trace": [_t("Extraction", t0, f"{len(cur.figures)} figures" + (f" + {len(prior.figures)} prior" if prior else ""))]}


def n_revenue(s: State):
    t0 = time.perf_counter(); v = revenue_analyst.run(s["figures"])
    return {"revenue": v, "trace": [_t("Revenue", t0, v.headline)]}


def n_risk(s: State):
    t0 = time.perf_counter(); v = risk_analyst.run(s["figures"], s["sentences"])
    return {"risk": v, "trace": [_t("Risk", t0, v.headline)]}


def n_outlook(s: State):
    t0 = time.perf_counter(); v = outlook_analyst.run(s["figures"], s["sentences"])
    return {"outlook": v, "trace": [_t("Outlook", t0, v.headline)]}


def n_compare(s: State):
    t0 = time.perf_counter(); v = comparison_agent.run(s["figures"], s.get("prior_figures", []))
    return {"comparison": v, "trace": [_t("Comparison", t0, v.headline)]}


def n_editor(s: State):
    t0 = time.perf_counter()
    views = {k: s[k] for k in ("revenue", "risk", "outlook", "comparison")}
    polished = None
    if s.get("use_llm"):
        facts = "\n".join(c.render() for v in views.values() for c in v.claims)
        valid = {f.id for f in s["figures"] + s.get("prior_figures", [])} | {d.id for v in views.values() for d in v.derived}
        polished = llm.polish_summary(facts, valid)
    note = editor_manager.run(views, s["figures"], s.get("prior_figures", []), s["sentences"],
                              s["company"], s["period"], polished)
    note["llm_used"] = bool(polished)
    return {"note": note, "trace": [_t("Editor", t0, f"{note['verdict']} | coverage {note['coverage']}%")]}


def build_graph():
    from langgraph.graph import StateGraph, START, END
    g = StateGraph(State)
    for name, fn in [("extract", n_extract), ("revenue", n_revenue), ("risk", n_risk),
                     ("outlook", n_outlook), ("comparison", n_compare), ("editor", n_editor)]:
        g.add_node(name, fn)
    g.add_edge(START, "extract")
    for a in ("revenue", "risk", "outlook", "comparison"):
        g.add_edge("extract", a)                 # fan-out
    g.add_edge(["revenue", "risk", "outlook", "comparison"], "editor")   # fan-in (waits for all four)
    g.add_edge("editor", END)
    return g.compile()


def _fallback(state):
    """Same topology without LangGraph (thread pool) - keeps the demo runnable anywhere."""
    from concurrent.futures import ThreadPoolExecutor
    state = {**state, "trace": []}
    out = n_extract(state); state["trace"] += out.pop("trace"); state.update(out)
    with ThreadPoolExecutor(4) as ex:
        for out in ex.map(lambda fn: fn(state), [n_revenue, n_risk, n_outlook, n_compare]):
            state["trace"] += out.pop("trace"); state.update(out)
    out = n_editor(state); state["trace"] += out.pop("trace"); state.update(out)
    return state


def run_pipeline(report_text="", prior_text="", use_llm=False, figures=None, prior_figures=None,
                 sentences=None, company="Company", period="") -> State:
    init: State = {"report_text": report_text, "prior_text": prior_text, "use_llm": use_llm, "trace": []}
    if figures:
        init.update(figures=figures, prior_figures=prior_figures or [], sentences=sentences or [],
                    company=company, period=period)
    try:
        return build_graph().invoke(init)
    except ImportError:
        return _fallback(init)
