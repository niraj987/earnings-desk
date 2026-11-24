# 🎓 Earnings Desk — Teacher Demonstration Guide

This guide gives you an exact, step-by-step walkthrough to present the **Earnings Desk** in front of your teacher or evaluation committee.

---

## 📊 The 3 Test Reports at a Glance

You have **3 contrasting test reports** built directly into the platform and saved in `test_reports/`. Each tests a distinct multi-agent stance:

| Test Report | Stance / Verdict | Revenue Growth | Key Risk / Highlight | What It Demonstrates |
| :--- | :--- | :--- | :--- | :--- |
| **1. CloudScale AI Systems** | 🟢 **Constructive / Bullish** | **+36.0% YoY** ($2.40B) | Gross margin 74.5%, zero net debt, raised guidance | Unanimous positive agent alignment across all 4 specialists |
| **2. Acme Technologies** | 🟡 **Balanced / Mixed** | **+12.0% YoY** ($4.82B) | Top 2 customers = 38% of rev, patent litigation | **Agent Conflict Resolution**: Revenue positive vs Risk negative |
| **3. NovaRetail Group** | 🔴 **Cautious / High Risk** | **-2.0% YoY** ($6.10B) | **4.18x Debt-to-Cash**, logistics cost inflation | Unanimous negative signals, high leverage trigger, guidance cut |

---

## 🚀 5-Minute Live Demo Script (Step-by-Step)

### Step 1: Open the Homepage & Introduce the Architecture (1 min)
1. Open `http://localhost:5000` (or the production link `https://earningsdesk-two.vercel.app`).
2. Show the **Daytime Earth Hero**: Explain that Earnings Desk is designed for financial clarity with zero hallucination.
3. Scroll down slightly: Show the **Agent Execution Terminal** displaying the 5 agents coordinating in real time.
4. Click **"Go to Analysis Desk"** in the top navigation header.

---

### Step 2: Demonstrate the 3 Reports Live in Analysis Desk (1 min)
1. At the top of the Analysis Desk, point out the quick-selection pills:
   - Click **`CloudScale AI`**: Point out the **Bullish** stance, 100% Grounding Coverage, and 74.5% gross margin.
   - Click **`Acme Tech`**: Show the **Balanced / Mixed** stance. Explain to the teacher:
     > *"Notice that Revenue Analyst is positive because sales grew +12%, but Risk Analyst flagged negative because 38% of revenue comes from just 2 customers. The Editor agent resolved this disagreement mathematically instead of guessing."*
   - Click **`NovaRetail`**: Show the **High Risk** stance. Point out the $4.6B debt vs $1.1B cash.

---

### Step 3: Run a Live Analysis via "New Report" (1.5 min)
Teachers love to see live processing!
1. Click the **"New Report"** button in the header.
2. In the modal, point out the 3 **Test Reports** buttons at the top:
   - Click `🟢 CloudScale AI (Bullish)` or `🟡 Acme Tech (Balanced)` or `🔴 NovaRetail (High Risk)`.
   - The Current Quarter and Previous Quarter texts will auto-populate instantly.
   - *(Optional: Click the "Upload Files" tab to show file upload from `test_reports/`)*.
3. Click **"Run Multi-Agent Desk"**.
4. Watch the 5 specialist agents execute:
   - **Extraction Agent**: Parses structured figures and verbatim sentences.
   - **Revenue Agent**: Evaluates YoY growth and gross/operating margins.
   - **Risk Agent**: Scans debt, leverage, and customer concentration.
   - **Outlook Agent**: Compares forward guidance against current run-rate.
   - **Comparison Agent**: Computes QoQ deltas.
   - **Editor Manager**: Synthesizes the final Grounded Analyst Note.

---

### Step 4: Prove Zero Hallucination (Claim Tracer) (45 sec)
1. In the Analysis Desk, click the **"Claim Tracer"** tab.
2. Select any claim from the dropdown.
3. Show the teacher:
   - Every single statement cites an exact reference ID (e.g. `[F1]`, `[R1]`, `[S4]`).
   - Clicking a pill displays the **exact verbatim sentence from the official press release** or the exact mathematical formula.
   - Emphasize: **100% Grounded — zero LLM hallucination**.

---

### Step 5: Demonstrate the Interactive "What-If" Sensitivity Simulator (45 sec)
1. Click the **"What-If Simulator"** tab.
2. Click **"Stress Test (Bear Case)"** (cuts revenue and margins by 10%).
3. Click **"Re-run Analysts with Edited Figures"**.
4. The 4 agents will recalculate their formulas in milliseconds and update the stance in real time!
5. Click **"Reset to Original Facts"** to restore.

---

### Step 6: Grounded Q&A ("Ask the Desk") (30 sec)
1. Click the **"Ask the Desk"** tab.
2. Click one of the suggestion chips or ask:
   - *"What was the total revenue and growth?"*
   - *"What are the main risk factors?"*
   - *"What is the forward guidance for next quarter?"*
3. Show that the answer returns the exact figures with verified provenance citations.

---

### Step 7: Show the SQLite Embedded Database (30 sec)
1. Click **"Database"** in the top header.
2. Show the teacher:
   - Native SQLite database engine (`node:sqlite`).
   - All reports, what-if scenarios, agent traces, and Q&A logs are persistently stored in `server/earnings_desk.db`.

---

## 💡 Anticipated Teacher Questions & Best Answers

**Q1: "Why use multi-agent architecture instead of just asking ChatGPT or Claude to summarize the report?"**
> **Answer**: *"General LLMs frequently hallucinate numbers, miscalculate percentage growth, and cannot guarantee mathematical consistency. Earnings Desk separates concerns: specialist agents use deterministic code and regular expressions for numbers, and only use LLM for phrasing polish. Every number is audited by the Grounding Gate."*

**Q2: "How does the system resolve disagreements between agents?"**
> **Answer**: *"The Editor Manager uses weighted composite scoring. For Acme Technologies, the Revenue score (+1.0) and Risk score (-1.0) conflicted. The Editor flags this disagreement explicitly in Section 5 of the note and assigns a Balanced stance rather than ignoring the risk."*

**Q3: "Where are the files stored and can it run offline?"**
> **Answer**: *"Yes! The platform is 100% self-contained. It uses an embedded SQLite database (`earnings_desk.db`), and includes a native JavaScript fallback engine so it runs completely offline without any paid API keys or cloud dependencies."*

---

## 📁 Test Files Location
All test reports are saved in the project directory:
- `test_reports/01_Acme_Technologies_Q3_2026.txt` (and prior `01_Acme_Technologies_Q2_2026_Prior.txt`)
- `test_reports/02_CloudScale_AI_Q3_2026.txt` (and prior `02_CloudScale_AI_Q2_2026_Prior.txt`)
- `test_reports/03_NovaRetail_Group_Q3_2026.txt` (and prior `03_NovaRetail_Group_Q2_2026_Prior.txt`)
