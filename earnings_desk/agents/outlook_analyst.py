"""OUTLOOK ANALYST - assesses forward guidance vs. current run-rate and management tone."""
import re
from core.models import AnalystView, Claim, Deriver, by_key, stance_from

GUID = re.compile(r"\b(expects?|guidance|outlook|forecast|anticipates?)\b", re.I)
POS = re.compile(r"confident|momentum|strong|accelerat|robust|record|raise[ds]?|optimis", re.I)
NEGW = re.compile(r"cautio|uncertain|visibility|conservative|softness|headwind|macro", re.I)


def run(figures, sentences) -> AnalystView:
    f, d = by_key(figures), Deriver("O")
    lo, hi, rev = f.get("guidance_rev_low"), f.get("guidance_rev_high"), f.get("revenue")
    claims, score = [], 0.0
    if lo and hi and rev:
        mid = d.add("guid_mid", "Guidance midpoint", (lo.value + hi.value) / 2, "USD_M", f"avg({lo.id}, {hi.id})")
        imp = d.add("implied_qoq", "Implied sequential growth", (mid.value / rev.value - 1) * 100, "%", f"{mid.id} / {rev.id} - 1")
        claims.append(Claim(f"Guidance of {lo.display}-{hi.display} (midpoint {mid.display}) implies {imp.value:+.1f}% sequential growth vs {rev.display}.",
                            [lo.id, hi.id, rev.id, mid.id, imp.id]))
        score += 1 if imp.value >= 4 else 0.5 if imp.value >= 0 else -1
        gmar, om = f.get("guidance_margin"), f.get("operating_margin")
        if gmar and om:
            dm = d.add("margin_delta", "Guided margin vs current", gmar.value - om.value, "pp", f"{gmar.id} - {om.id}")
            claims.append(Claim(f"Guided operating margin {gmar.display} vs {om.display} today ({dm.display}).", [gmar.id, om.id, dm.id]))
            score += 0.5 if dm.value >= 0.5 else -0.5 if dm.value <= -0.5 else 0
    else:
        claims.append(Claim("No quantitative revenue guidance found; outlook cannot be sized.", []))
    pos = neg = 0
    refs = []
    for i, s in enumerate(sentences):
        if GUID.search(s):
            p, n = len(POS.findall(s)), len(NEGW.findall(s))
            if p or n:
                pos, neg, refs = pos + p, neg + n, refs + [f"S{i+1}"]
    if refs:
        tone = "confident" if pos > neg else "cautious" if neg > pos else "balanced"
        claims.append(Claim(f"Management tone is {tone} ({pos} confident vs {neg} cautious cue words in guidance text).", refs))
        score += 0.5 if pos - neg >= 1 else -0.5 if neg - pos >= 1 else 0
    stance = stance_from(score)
    return AnalystView("Outlook Analyst", "Outlook", stance, score, f"Forward guidance assessed as {stance}.", claims, d.items)
