# How it works

## 1. The idea
A single LLM summarising an earnings report can hallucinate numbers. This desk splits the job across **specialist agents**
that only communicate through *figures with provenance*. An analyst can only say something if it can point to an extracted
figure (or the exact report sentence) that supports it - and the Editor enforces this.

## 2. Coordination architecture - fan-out / fan-in with a manager
| Stage | Agent (module) | Input | Output |
|---|---|---|---|
| 0 | **Extraction Agent** (`agents/extraction.py`) | raw text of current (+ prior) report | `Figure` list: id, value, unit, **source sentence**; sentence list `S1..Sn` |
| 1 (parallel) | **Revenue Analyst** (`revenue_analyst.py`) | figures | claims on revenue, growth, margins, net margin, FCF conversion |
| 1 (parallel) | **Risk Analyst** (`risk_analyst.py`) | figures + sentences | lexicon-based red flags + numeric flags (leverage, concentration, cash conversion, thin margin) → High/Med/Low |
| 1 (parallel) | **Outlook Analyst** (`outlook_analyst.py`) | figures + sentences | guidance midpoint, implied sequential growth, margin guide vs actual, management tone |
| 1 (parallel) | **Comparison Agent** (`comparison_agent.py`, group-of-3 add-on) | current + prior figures | per-metric delta, direction ▲▼▬, favourable/unfavourable |
| 2 | **Editor Manager** (`editor_manager.py`) | the four views | grounded one-page note, disagreement list, sources table |

`core/graph.py` wires this in **LangGraph**: `extract → {revenue, risk, outlook, comparison}` (fan-out) and
`{…} → editor` (fan-in; LangGraph waits for all four). A `trace` list with a reducer lets parallel nodes log safely.
If LangGraph is not installed the same topology runs on a thread pool.

## 3. Grounding (RAG / structured extraction)
* **Structured extraction over the document** - regex specs find each metric in the sentence that mentions it, parse
  `$4.82 billion → 4820 ($M)`, `up 12%`, `down 3%` (sign from words), EPS, guidance ranges.
* **Provenance IDs** - `F#` current figure, `P#` prior figure, `S#` report sentence, `R#/K#/O#` derived figures
  (e.g. `K1 = F9 / F8` debt-to-cash). Derived numbers store their formula as their source.
* **Grounding gate** - the Editor checks each claim has ≥1 ref and every ref exists in the registry. Claims that fail are
  **dropped and listed** as warnings; coverage % is displayed on the note.
* **Optional LLM** (`core/llm.py`, LangChain) only rewrites the executive summary; output is rejected unless every `[tag]`
  is valid and every number appears in the supplied facts. Without an API key everything is deterministic and offline.

## 4. Disagreement flagging
Each analyst returns a stance (positive / neutral / negative). The Editor flags opposite stances for the pairs
revenue↔risk, outlook↔risk, revenue↔outlook, revenue↔QoQ trend. In the sample: revenue +12 % and guidance up, yet the Risk
Analyst rates risk **High** (38 % customer concentration, 1.6× debt/cash, litigation, supply chain) → flagged in the note.

## 5. Interactive UI (`app.py`)
* **Workflow tab** - live graph, nodes turn green with per-agent timings.
* **Figures & what-if** - edit any extracted number (cut guidance, raise debt) and re-run analysts to see the note change.
* **Trace a claim** - pick any sentence in the note and see the figure IDs and original report sentence behind it.
* **Ask the note** - grounded Q&A that returns matching figures with their sources (no hallucination possible).

## 6. Scoring rules (all in code, easy to tweak)
Revenue: YoY ≥8% +1 · ≥3% +0.5 · <0 −1; op margin ≥15% +0.5; FCF>0 +0.5. Outlook: implied sequential growth ≥4% +1;
margin guide ±0.5pp; tone ±0.5. Risk: weighted sum ≥6 High, ≥3 Medium. Stance: score ≥1 positive, ≤−0.5 negative.

## 7. Limitations / extensions
Regex extraction targets conventional press-release phrasing; scanned PDFs need OCR. Extension path: swap `extraction.run`
for an LLM tool-calling extractor that must return the same `Figure` schema (the rest of the system is unchanged), add a
vector store for 10-K retrieval, or add a Microsoft Agent Framework / Semantic Kernel runtime behind the same agent functions.
