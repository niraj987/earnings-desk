"""Interactive UI:  streamlit run app.py"""
import pandas as pd, streamlit as st
from core.graph import run_pipeline
from core.loader import load_text
from core.llm import llm_available
from core.qa import ask

st.set_page_config(page_title="Earnings Analysis Desk", page_icon="📊", layout="wide")
st.title("📊 Financial Earnings Report Analysis Desk")
st.caption("Multi-agent fan-out / fan-in system · every claim in the note traces to an extracted figure")

# ---------------- sidebar ----------------
with st.sidebar:
    st.header("1 · Load report")
    mode = st.radio("Source", ["Sample (Acme Q3 vs Q2)", "Upload (PDF/TXT)", "Paste text"])
    cur = prior = ""
    if mode.startswith("Sample"):
        cur, prior = load_text("sample_data/acme_q3_2026.txt"), load_text("sample_data/acme_q2_2026.txt")
        st.text_area("Preview", cur, height=180, disabled=True)
    elif mode.startswith("Upload"):
        a = st.file_uploader("Current quarter report", type=["pdf", "txt", "md"])
        b = st.file_uploader("Previous quarter (optional → enables Comparison Agent)", type=["pdf", "txt", "md"])
        cur, prior = (load_text(a) if a else ""), (load_text(b) if b else "")
    else:
        cur = st.text_area("Current quarter", height=160)
        prior = st.text_area("Previous quarter (optional)", height=120)
    use_llm = st.checkbox("LLM-polish executive summary", value=False, disabled=not llm_available(),
                          help="Needs ANTHROPIC_API_KEY or OPENAI_API_KEY. Output is validated against the figures.")
    if st.button("▶ Run analyst desk", type="primary", width="stretch", disabled=not cur.strip()):
        st.session_state.state = run_pipeline(cur, prior, use_llm=use_llm)
        st.session_state.pop("edited", None)

state = st.session_state.get("state")
if not state:
    st.info("Choose a report in the sidebar and press **Run analyst desk**.")
    st.stop()

# ---------------- what-if override ----------------
if "edited" in st.session_state:
    state = st.session_state.edited
note = state["note"]

c1, c2, c3, c4 = st.columns(4)
c1.metric("Overall stance", note["verdict"])
c2.metric("Grounding coverage", f"{note['coverage']}%")
c3.metric("Figures extracted", len(state["figures"]))
c4.metric("Disagreements flagged", len(note["disagreements"]))

tabs = st.tabs(["📝 Analyst note", "🕸 Workflow", "🔢 Figures & what-if", "🧑‍💼 Agent views", "🔍 Trace a claim", "💬 Ask the note"])

with tabs[0]:
    st.markdown(note["markdown"])
    st.download_button("⬇ Download note (.md)", note["markdown"], "analyst_note.md")
    if note.get("llm_used"):
        st.success("Executive summary was LLM-polished and passed the grounding validator.")

with tabs[1]:
    done = {t["agent"]: t for t in state["trace"]}
    def node(n, key, label):
        t = done.get(key)
        col = "#c8f7c5" if t else "#eeeeee"
        tl = f"{label}\\n{t['seconds']*1000:.1f} ms" if t else label
        return f'{n} [label="{tl}", style=filled, fillcolor="{col}", shape=box, style="rounded,filled"];'
    parts = ["digraph G { rankdir=LR;",
             'R [label="Earnings report", shape=folder, style=filled, fillcolor="#dbe9ff"];',
             node("X", "Extraction", "Extraction Agent"), node("A", "Revenue", "Revenue Analyst"),
             node("B", "Risk", "Risk Analyst"), node("C", "Outlook", "Outlook Analyst"),
             node("D", "Comparison", "Comparison Agent"), node("E", "Editor", "Editor Manager"),
             'N [label="Analyst note", shape=note, style=filled, fillcolor="#ffe9a8"];',
             "R->X; X->A; X->B; X->C; X->D; A->E; B->E; C->E; D->E; E->N; }"]
    dot = " ".join(parts)
    st.graphviz_chart(dot)
    st.caption("Fan-out: Extraction → 4 parallel agents · Fan-in: Editor Manager merges, checks grounding, flags disagreement.")
    st.dataframe(pd.DataFrame(state["trace"]), width="stretch", hide_index=True)

with tabs[2]:
    st.write("Edit any extracted number and re-run the analysts to see how the note reacts (e.g. cut guidance, raise debt).")
    df = pd.DataFrame([{"id": f.id, "figure": f.label, "value": f.value, "unit": f.unit, "source sentence": f.source} for f in state["figures"]])
    edited = st.data_editor(df, disabled=["id", "figure", "unit", "source sentence"], hide_index=True, width="stretch")
    if st.button("🔁 Re-run analysts with edited figures"):
        figs = [type(f)(**{**f.__dict__, "value": float(v)}) for f, v in zip(state["figures"], edited["value"])]
        st.session_state.edited = run_pipeline(figures=figs, prior_figures=state.get("prior_figures", []),
                                               sentences=state["sentences"], company=state["company"], period=state["period"])
        st.rerun()
    if "edited" in st.session_state and st.button("↩ Reset to extracted values"):
        st.session_state.pop("edited"); st.rerun()

with tabs[3]:
    for k in ("revenue", "risk", "outlook", "comparison"):
        v = state[k]
        with st.expander(f"{v.agent} — {v.stance.upper()} ({v.score:+.2f})", expanded=(k == "risk")):
            st.write(v.headline)
            for c in v.claims:
                st.markdown(f"- {c.render()}")
            if v.table:
                st.dataframe(pd.DataFrame(v.table).drop(columns="refs"), hide_index=True, width="stretch")

with tabs[4]:
    reg = note["registry"]
    claims = [(v.agent, c) for k in ("revenue", "risk", "outlook", "comparison") for c in state[k].claims]
    pick = st.selectbox("Pick a claim", range(len(claims)), format_func=lambda i: f"{claims[i][0]}: {claims[i][1].text[:90]}")
    ag, cl = claims[pick]
    st.markdown(f"**Claim:** {cl.text}")
    for r in cl.refs:
        x = reg[r]
        st.markdown(f"- **{r}** · {x.label} · `{x.display}`  \n  _{x.source}_")
    if note["ungrounded"]:
        st.error("Ungrounded claims dropped: " + "; ".join(note["ungrounded"]))

with tabs[5]:
    q = st.text_input("Ask about the report (e.g. “what was free cash flow?”, “debt levels”)")
    if q:
        for line in ask(q, note["registry"], [state[k] for k in ("revenue", "risk", "outlook", "comparison")]):
            st.markdown(f"- {line}", unsafe_allow_html=True)
