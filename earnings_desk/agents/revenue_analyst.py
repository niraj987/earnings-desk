"""REVENUE ANALYST - revenue, growth, margins, profitability, cash conversion."""
from core.models import AnalystView, Claim, Deriver, by_key, stance_from


def run(figures) -> AnalystView:
    f, d = by_key(figures), Deriver("R")
    claims, score = [], 0.0
    rev, g = f.get("revenue"), f.get("revenue_growth")
    if not rev:
        return AnalystView("Revenue Analyst", "Revenue", "neutral", 0, "Revenue not found in report.",
                           [Claim("Revenue could not be extracted from the report.", [])])
    if g:
        claims.append(Claim(f"Revenue of {rev.display} grew {g.value:+.1f}% year over year.", [rev.id, g.id]))
        score += 1 if g.value >= 8 else 0.5 if g.value >= 3 else -1 if g.value < 0 else 0
    else:
        claims.append(Claim(f"Revenue was {rev.display}; YoY growth not disclosed.", [rev.id]))
    gm, om = f.get("gross_margin"), f.get("operating_margin")
    if gm and om:
        claims.append(Claim(f"Gross margin {gm.display} and operating margin {om.display}.", [gm.id, om.id]))
    elif om:
        claims.append(Claim(f"Operating margin was {om.display}.", [om.id]))
    if om:
        score += 0.5 if om.value >= 15 else -0.5 if om.value < 5 else 0
    ni = f.get("net_income")
    if ni:
        nm = d.add("net_margin", "Net margin", ni.value / rev.value * 100, "%", f"{ni.id} / {rev.id}")
        eps = f.get("eps")
        t = f"Net income of {ni.display} implies a {nm.display} net margin"
        refs = [ni.id, rev.id, nm.id]
        if eps:
            t += f", EPS {eps.display}"; refs.append(eps.id)
        claims.append(Claim(t + ".", refs))
    fcf = f.get("fcf")
    if fcf:
        refs, t = [fcf.id], f"Free cash flow was {fcf.display}"
        if ni and ni.value > 0:
            cv = d.add("fcf_conversion", "FCF conversion", fcf.value / ni.value, "x", f"{fcf.id} / {ni.id}")
            t += f", a {cv.display} conversion of net income"; refs += [ni.id, cv.id]
        claims.append(Claim(t + ".", refs))
        score += 0.5 if fcf.value > 0 else -0.5
    stance = stance_from(score)
    head = f"Revenue {rev.display}" + (f", {g.value:+.1f}% YoY" if g else "") + f" -> {stance}."
    return AnalystView("Revenue Analyst", "Revenue", stance, score, head, claims, d.items)
