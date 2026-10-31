"""RISK ANALYST - red flags from report text (lexicon) + numeric red flags (balance sheet / cash)."""
import re
from core.models import AnalystView, Claim, Deriver, by_key

LEXICON = [  # regex, category, weight  (first match per sentence wins)
    (r"going concern|restatement|material weakness|investigation|subpoena", "Governance / accounting", 3),
    (r"litigation|lawsuit|legal proceeding|patent dispute|regulatory action", "Legal / regulatory", 2),
    (r"supply[- ]chain|shortage", "Supply chain", 2),
    (r"foreign exchange|currency|\bfx\b", "FX exposure", 1),
    (r"headwind|slowdown|softness|weak demand|decline in demand", "Demand", 2),
    (r"competition|competitive pressure|pricing pressure", "Competition", 1.5),
    (r"impairment|write[- ]?down|restructuring|layoff", "One-off charges", 2),
    (r"inflation|tariff|cost pressure", "Cost pressure", 1.5),
]


def run(figures, sentences) -> AnalystView:
    f, d = by_key(figures), Deriver("K")
    src2id = {x.source: x.id for x in figures}
    claims, weight, seen = [], 0.0, {}
    for i, s in enumerate(sentences):
        if i == 0:
            continue
        for rx, cat, w in LEXICON:
            if re.search(rx, s, re.I):
                if cat not in seen:
                    seen[cat] = 1
                    refs = [f"S{i+1}"] + ([src2id[s]] if s in src2id else [])
                    claims.append(Claim(f'{cat} (weight {w}): "{s.rstrip(".")}"', refs))
                    weight += w
                break
    conc = f.get("customer_concentration")
    if conc and conc.value >= 25:
        claims.append(Claim(f"Customer concentration: top customers = {conc.display} of revenue (>=25% threshold).", [conc.id]))
        weight += 2
    debt, cash = f.get("debt"), f.get("cash")
    if debt and cash and cash.value > 0:
        r = d.add("debt_cash", "Debt / cash", debt.value / cash.value, "x", f"{debt.id} / {cash.id}")
        if r.value > 1.25:
            claims.append(Claim(f"Leverage: debt {debt.display} vs cash {cash.display} ({r.display}).", [debt.id, cash.id, r.id]))
            weight += 2
    ni, fcf = f.get("net_income"), f.get("fcf")
    if ni and ni.value < 0:
        claims.append(Claim(f"Net loss of {ni.display}.", [ni.id])); weight += 3
    elif ni and fcf and fcf.value < 0.8 * ni.value:
        claims.append(Claim(f"Weak cash conversion: FCF {fcf.display} vs net income {ni.display}.", [fcf.id, ni.id])); weight += 1.5
    om = f.get("operating_margin")
    if om and om.value < 10:
        claims.append(Claim(f"Thin operating margin of {om.display}.", [om.id])); weight += 1.5
    level = "High" if weight >= 6 else "Medium" if weight >= 3 else "Low"
    stance = {"High": "negative", "Medium": "neutral", "Low": "positive"}[level]
    score = {"High": -1.5, "Medium": -0.25, "Low": 0.75}[level]
    if not claims:
        claims = [Claim("No material risk language or numeric red flags detected.", [])]
    return AnalystView("Risk Analyst", "Risk", stance, score,
                       f"Risk level {level} (weighted score {weight:g}) -> {stance}.", claims, d.items)
