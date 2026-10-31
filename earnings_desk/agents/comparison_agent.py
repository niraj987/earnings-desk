"""COMPARISON AGENT (group-of-3 add-on) - current quarter vs previous quarter, direction per metric."""
from core.models import AnalystView, Claim, by_key

METRICS = [  # key, higher_is_better
    ("revenue", True), ("revenue_growth", True), ("gross_margin", True), ("operating_margin", True),
    ("net_income", True), ("eps", True), ("fcf", True), ("cash", True), ("debt", False),
]


def run(figures, prior) -> AnalystView:
    if not prior:
        return AnalystView("Comparison Agent", "Quarter-over-quarter", "neutral", 0,
                           "No previous quarter supplied.", [Claim("No prior-quarter report supplied; comparison skipped.", [])])
    cur, prv = by_key(figures), by_key(prior)
    rows, claims, fav, unf = [], [], 0, 0
    for key, up_good in METRICS:
        if key in cur and key in prv:
            c, p = cur[key], prv[key]
            delta = c.value - p.value
            pct = (delta / abs(p.value) * 100) if p.value else 0.0
            arrow = "▲" if delta > 1e-9 else "▼" if delta < -1e-9 else "▬"
            good = None if arrow == "▬" else (delta > 0) == up_good
            fav += good is True
            unf += good is False
            dtxt = f"{delta:+.1f}pp" if c.unit == "%" else f"{pct:+.1f}%"
            verdict = "favorable" if good else "unfavorable" if good is False else "flat"
            rows.append({"metric": c.label, "prior": p.display, "current": c.display, "change": dtxt,
                         "direction": arrow, "favorable": verdict, "refs": [c.id, p.id]})
            claims.append(Claim(f"{c.label}: {p.display} -> {c.display} ({dtxt}) {arrow}, {verdict}.", [c.id, p.id]))
    n = max(fav + unf, 1)
    score = (fav - unf) / n * 2
    stance = "positive" if score >= 1 else "negative" if score <= -0.5 else "neutral"
    return AnalystView("Comparison Agent", "Quarter-over-quarter", stance, score,
                       f"{fav} metrics improved, {unf} deteriorated vs prior quarter.", claims, [], rows)
