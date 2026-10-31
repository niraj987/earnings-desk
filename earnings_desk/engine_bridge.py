"""Bridge between Node.js / Express backend and the Python multi-agent pipeline."""
import sys
import json
import os

# Ensure the earnings_desk folder is on sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from dataclasses import asdict, is_dataclass
from core.graph import run_pipeline
from core.loader import load_text
from core.qa import ask
from core.models import Figure


def clean_object(obj):
    """Recursively convert dataclasses, sets, and objects to JSON-serializable types."""
    if is_dataclass(obj):
        return asdict(obj)
    if isinstance(obj, set):
        return list(obj)
    if isinstance(obj, dict):
        return {k: clean_object(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [clean_object(v) for v in obj]
    return obj


def serialize_figure(f):
    return {
        "id": f.id,
        "key": f.key,
        "label": f.label,
        "value": f.value,
        "unit": f.unit,
        "display": f.display,
        "source": f.source,
        "period": getattr(f, "period", "current")
    }


def serialize_claim(c):
    return {
        "text": c.text,
        "refs": c.refs,
        "rendered": c.render()
    }


def serialize_view(v):
    return {
        "agent": v.agent,
        "section": v.section,
        "stance": v.stance,
        "score": v.score,
        "headline": v.headline,
        "claims": [serialize_claim(c) for c in v.claims],
        "derived": [serialize_figure(d) for d in v.derived],
        "table": v.table
    }


def format_state(st):
    """Format full pipeline state for frontend consumption."""
    reg_clean = {}
    if "note" in st and "registry" in st["note"]:
        for k, v in st["note"]["registry"].items():
            reg_clean[k] = serialize_figure(v)

    return {
        "company": st.get("company", "Company"),
        "period": st.get("period", ""),
        "figures": [serialize_figure(f) for f in st.get("figures", [])],
        "prior_figures": [serialize_figure(f) for f in st.get("prior_figures", [])],
        "sentences": st.get("sentences", []),
        "views": {
            "revenue": serialize_view(st["revenue"]),
            "risk": serialize_view(st["risk"]),
            "outlook": serialize_view(st["outlook"]),
            "comparison": serialize_view(st["comparison"])
        },
        "note": {
            "markdown": st["note"].get("markdown", ""),
            "verdict": st["note"].get("verdict", ""),
            "coverage": st["note"].get("coverage", 0),
            "summary": st["note"].get("summary", ""),
            "disagreements": st["note"].get("disagreements", []),
            "ungrounded": st["note"].get("ungrounded", []),
            "used_ids": list(st["note"].get("used_ids", [])),
            "llm_used": st["note"].get("llm_used", False),
            "registry": reg_clean
        },
        "trace": st.get("trace", [])
    }


def handle_analyze(data):
    report_text = data.get("report_text", "")
    prior_text = data.get("prior_text", "")
    use_llm = bool(data.get("use_llm", False))

    st = run_pipeline(report_text=report_text, prior_text=prior_text, use_llm=use_llm)
    return format_state(st)


def handle_what_if(data):
    raw_figures = data.get("figures", [])
    raw_prior = data.get("prior_figures", [])
    sentences = data.get("sentences", [])
    company = data.get("company", "Company")
    period = data.get("period", "")
    use_llm = bool(data.get("use_llm", False))

    figs = [Figure(
        id=f["id"],
        key=f["key"],
        label=f["label"],
        value=float(f["value"]),
        unit=f["unit"],
        source=f.get("source", ""),
        period=f.get("period", "current")
    ) for f in raw_figures]

    prior_figs = [Figure(
        id=f["id"],
        key=f["key"],
        label=f["label"],
        value=float(f["value"]),
        unit=f["unit"],
        source=f.get("source", ""),
        period=f.get("period", "prior")
    ) for f in raw_prior]

    st = run_pipeline(
        figures=figs,
        prior_figures=prior_figs,
        sentences=sentences,
        company=company,
        period=period,
        use_llm=use_llm
    )
    return format_state(st)


def handle_qa(data):
    question = data.get("question", "")
    raw_registry = data.get("registry", {})
    raw_views = data.get("views", {})

    # Reconstruct registry
    reg = {}
    for k, f in raw_registry.items():
        reg[k] = Figure(
            id=f["id"],
            key=f["key"],
            label=f["label"],
            value=float(f.get("value", 0)),
            unit=f.get("unit", ""),
            source=f.get("source", ""),
            period=f.get("period", "current")
        )

    # Reconstruct views for QA
    from core.models import AnalystView, Claim
    views_list = []
    for k in ("revenue", "risk", "outlook", "comparison"):
        if k in raw_views:
            v_data = raw_views[k]
            claims = [Claim(text=c["text"], refs=c.get("refs", [])) for c in v_data.get("claims", [])]
            views_list.append(AnalystView(
                agent=v_data.get("agent", k.capitalize()),
                section=v_data.get("section", ""),
                stance=v_data.get("stance", "neutral"),
                score=float(v_data.get("score", 0)),
                headline=v_data.get("headline", ""),
                claims=claims
            ))

    answers = ask(question, reg, views_list)
    return {"question": question, "answers": answers}


def handle_samples():
    sample_dir = os.path.join(BASE_DIR, "sample_data")
    
    presets = [
        {
            "id": "acme",
            "name": "Acme Technologies (Balanced / Mixed)",
            "description": "+12% YoY revenue, high customer concentration (38%), patent litigation, and 1.62x leverage.",
            "current_name": "Acme Technologies Q3 FY2026",
            "current_file": "acme_q3_2026.txt",
            "prior_name": "Acme Technologies Q2 FY2026",
            "prior_file": "acme_q2_2026.txt",
            "expected_verdict": "Balanced / Mixed"
        },
        {
            "id": "cloudscale",
            "name": "CloudScale AI Systems (Bullish Hypergrowth)",
            "description": "+36% YoY revenue, 74.5% gross margin, zero leverage, surging free cash flow and raised guidance.",
            "current_name": "CloudScale AI Systems Q3 FY2026",
            "current_file": "cloudscale_q3_2026.txt",
            "prior_name": "CloudScale AI Systems Q2 FY2026",
            "prior_file": "cloudscale_q2_2026.txt",
            "expected_verdict": "Positive / Bullish"
        },
        {
            "id": "novaretail",
            "name": "NovaRetail Group (High Risk / Margin Squeeze)",
            "description": "-2% YoY revenue, high debt ($4.6B vs $1.1B cash), freight logistics headwinds, and cautious outlook.",
            "current_name": "NovaRetail Group Q3 FY2026",
            "current_file": "novaretail_q3_2026.txt",
            "prior_name": "NovaRetail Group Q2 FY2026",
            "prior_file": "novaretail_q2_2026.txt",
            "expected_verdict": "High Risk"
        }
    ]

    loaded_presets = []
    for p in presets:
        c_path = os.path.join(sample_dir, p["current_file"])
        p_path = os.path.join(sample_dir, p["prior_file"])
        c_text = open(c_path, "r", encoding="utf-8").read() if os.path.exists(c_path) else ""
        p_text = open(p_path, "r", encoding="utf-8").read() if os.path.exists(p_path) else ""
        loaded_presets.append({
            **p,
            "current_text": c_text,
            "prior_text": p_text
        })

    return {
        "presets": loaded_presets,
        "current_name": loaded_presets[0]["current_name"],
        "current_text": loaded_presets[0]["current_text"],
        "prior_name": loaded_presets[0]["prior_name"],
        "prior_text": loaded_presets[0]["prior_text"]
    }


def main():
    try:
        raw_input = sys.stdin.read()
        if not raw_input.strip():
            print(json.dumps({"error": "No input provided"}))
            return

        payload = json.loads(raw_input)
        action = payload.get("action", "analyze")

        if action == "analyze":
            result = handle_analyze(payload)
        elif action == "what_if":
            result = handle_what_if(payload)
        elif action == "qa":
            result = handle_qa(payload)
        elif action == "samples":
            result = handle_samples()
        else:
            result = {"error": f"Unknown action: {action}"}

        # Output utf-8 encoded json safely
        sys.stdout.reconfigure(encoding="utf-8")
        print(json.dumps(result, ensure_ascii=False))

    except Exception as e:
        import traceback
        err_msg = traceback.format_exc()
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass
        print(json.dumps({"error": str(e), "traceback": err_msg}))


if __name__ == "__main__":
    main()

