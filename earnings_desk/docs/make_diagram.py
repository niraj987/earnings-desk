"""Generates docs/workflow.png (run: python docs/make_diagram.py)"""
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

fig, ax = plt.subplots(figsize=(13, 6.5)); ax.set_xlim(0, 13); ax.set_ylim(0, 6.5); ax.axis("off")

def box(x, y, w, h, t, c, fs=10):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.05,rounding_size=0.15", fc=c, ec="#333", lw=1.4))
    ax.text(x + w / 2, y + h / 2, t, ha="center", va="center", fontsize=fs, weight="bold")

def arrow(a, b, c="#333"):
    ax.annotate("", xy=b, xytext=a, arrowprops=dict(arrowstyle="-|>", color=c, lw=1.6))

box(0.2, 2.75, 1.8, 1.0, "Earnings report\n(PDF / TXT)\n+ prior quarter", "#dbe9ff")
box(2.5, 2.7, 2.1, 1.1, "EXTRACTION AGENT\nregex → figures\n+ source sentence", "#ffe9a8")
ys = [5.0, 3.6, 2.2, 0.8]
names = [("REVENUE ANALYST\ngrowth · margins · cash", "#c8f7c5"), ("RISK ANALYST\nlexicon + numeric flags", "#ffc9c9"),
         ("OUTLOOK ANALYST\nguidance · tone", "#d9c8f7"), ("COMPARISON AGENT\nQoQ direction ▲▼", "#c8eef7")]
for y, (t, c) in zip(ys, names):
    box(5.7, y - 0.4, 2.7, 0.9, t, c, 9); arrow((4.65, 3.25), (5.65, y + 0.05)); arrow((8.45, y + 0.05), (9.15, 3.25))
box(9.2, 2.65, 2.0, 1.2, "EDITOR MANAGER\nfan-in · grounding\ngate · disagreement\ncheck", "#ffd8a8", 9)
box(11.6, 2.75, 1.3, 1.0, "One-page\nanalyst note\n[F1] sourced", "#fff3bf", 9)
arrow((2.05, 3.25), (2.55, 3.25)); arrow((11.25, 3.25), (11.55, 3.25))
ax.text(5.1, 6.1, "FAN-OUT (parallel)", color="#555", fontsize=9, ha="center"); ax.text(8.8, 6.1, "FAN-IN (manager)", color="#555", fontsize=9, ha="center")
ax.text(6.5, 0.1, "Shared state: figures (F#/P#) · derived (R#/K#/O#) · report sentences (S#)  —  orchestrated with LangGraph", ha="center", fontsize=9, style="italic")
plt.savefig("docs/workflow.png", dpi=160, bbox_inches="tight")
