"""EDITOR MANAGER - fan-in. Merges the analyst views into one grounded note,
enforces the 'every claim traces to a figure' rule, and flags disagreements."""
import re
from core.models import build_registry, by_key

SIGN = {"positive": 1, "neutral": 0, "negative": -1}
ICON = {"positive": "🟢", "neutral": "🟡", "negative": "🔴"}


def _disagreements(rev, risk, out, cmp_):
    d = []
    pairs = [(rev, risk, "Revenue momentum vs. risk profile"), (out, risk, "Guidance vs. risk profile"),
             (rev, out, "Current results vs. forward guidance")]
    if cmp_ and cmp_.table:
        pairs.append((rev, cmp_, "Revenue view vs. quarter-over-quarter trend"))
    for a, b, title in pairs:
        if SIGN[a.stance] * SIGN[b.stance] < 0:
            d.append({"title": title, "between": [a.agent, b.agent],
                      "text": f"{a.agent} is {a.stance} ({a.headline}) but {b.agent} is {b.stance} ({b.headline})"})
    return d


def run(views: dict, figures, prior, sentences, company, period, llm_summary=None) -> dict:
    rev, risk, out, cmp_ = views["revenue"], views["risk"], views["outlook"], views["comparison"]
    reg = build_registry(figures, prior, sentences, list(views.values()))

    # ---- grounding gate -------------------------------------------------
    total = ok = 0
    ungrounded = []
    kept = {}
    for k, v in views.items():
        kept[k] = []
        for c in v.claims:
            total += 1
            if c.refs and all(r in reg for r in c.refs):
                ok += 1; kept[k].append(c)
            elif not c.refs and (c.text.startswith("No ") or "could not" in c.text):
                kept[k].append(c)       # explicit 'nothing found' statements need no figure
            else:
                ungrounded.append(f"{v.agent}: {c.text}")
    coverage = round(100 * ok / max(total, 1), 1)

    # ---- verdict --------------------------------------------------------
    scores = [rev.score, risk.score, out.score] + ([cmp_.score] if cmp_.table else [])
    avg = sum(scores) / len(scores)
    verdict = "Constructive" if avg >= 0.6 else "Cautious" if avg <= -0.3 else "Balanced / Mixed"
    dis = _disagreements(rev, risk, out, cmp_)

    f = by_key(figures)
    r, g = f.get("revenue"), f.get("revenue_growth")
    if r:
        summary = (f"{company} reported {period} revenue of {r.display}" + (f" ({g.value:+.1f}% YoY)" if g else "") +
                   f" [{r.id}{', ' + g.id if g else ''}]. Revenue view is {rev.stance}, risk view is {risk.stance}, "
                   f"and outlook is {out.stance}; overall stance: {verdict}.")
    else:
        summary = f"{company} {period}: key figures could not be extracted. Overall stance: {verdict}."
    if llm_summary:
        summary = llm_summary

    # ---- note -----------------------------------------------------------
    L = [f"# {company} — {period} Analyst Note",
         f"**Overall stance: {verdict}**  |  Grounding coverage: **{coverage}%** ({ok}/{total} claims traced to figures)", "",
         f"> {summary}", ""]
    for n, (title, key, lim) in enumerate([("Revenue", "revenue", 4), ("Risk", "risk", 5), ("Outlook", "outlook", 3)], 1):
        v = views[key]
        L += [f"## {n}. {title}  {ICON[v.stance]} {v.stance.title()}", f"_{v.headline}_"]
        L += [f"- {c.render()}" for c in kept[key][:lim]] + [""]
    if cmp_.table:
        L += ["## 4. Quarter-over-quarter", "| Metric | Prior | Current | Change | Dir | Refs |", "|---|---|---|---|---|---|"]
        L += [f"| {t['metric']} | {t['prior']} | {t['current']} | {t['change']} | {t['direction']} {('✅' if t['favorable']=='favorable' else '⚠️' if t['favorable']=='unfavorable' else '➖')} | {', '.join(t['refs'])} |" for t in cmp_.table]
        L.append("")
    L.append("## Analyst disagreements")
    L += ([f"- ⚠️ **{x['title']}** — {x['text']}." for x in dis] or ["- None: analysts broadly agree."])
    L.append("")
    body = "\n".join(L)
    used = sorted(set(re.findall(r"\b([FPRKOS]\d+)\b", body)), key=lambda x: (x[0], int(x[1:])))
    L += ["## Sources", "| ID | Item | Value | Source |", "|---|---|---|---|"]
    for i in used:
        if i in reg:
            x = reg[i]
            src = x.source.replace("|", "/")
            L.append(f"| {i} | {x.label} | {x.display} | {src[:110]}{'…' if len(src) > 110 else ''} |")
    return {"markdown": "\n".join(L), "coverage": coverage, "verdict": verdict, "summary": summary,
            "disagreements": dis, "ungrounded": ungrounded, "registry": reg, "used_ids": used}
