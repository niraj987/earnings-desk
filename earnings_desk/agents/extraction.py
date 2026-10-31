"""EXTRACTION AGENT - structured extraction of key figures from the earnings text.
Every figure keeps the exact sentence it came from (its provenance)."""
import re
from dataclasses import dataclass
from typing import List
from core.models import Figure

MONEY = re.compile(r"\$\s?([\d,]+(?:\.\d+)?)\s*(billion|million|bn|mn|b|m)?\b", re.I)
PCT = re.compile(r"(-?\d+(?:\.\d+)?)\s?%")
EPS = re.compile(r"\$\s?(-?\d+(?:\.\d+)?)\s+per\s+(?:diluted\s+|basic\s+)?share", re.I)
GUID = re.compile(r"\b(expects?|expected|guidance|outlook|forecast|projects?|anticipates?)\b", re.I)
NEG = re.compile(r"down|declin|decreas|fell|lower|drop", re.I)
PERIOD = re.compile(r"\bQ[1-4]\s*(?:FY)?\s*\d{4}", re.I)

SPECS = [  # key, label, kind, keyword regex, exclusion regex
    ("revenue", "Total revenue", "money", r"\b(?:total |net )?(?:revenues?|net sales)\b", r"accounted for|of (?:total |net )?revenue"),
    ("gross_margin", "Gross margin", "pct", r"gross margin", None),
    ("operating_margin", "Operating margin", "pct", r"operating margin", None),
    ("net_income", "Net income", "money", r"net (?:income|profit|earnings)", None),
    ("fcf", "Free cash flow", "money", r"free cash flow", None),
    ("cash", "Cash & equivalents", "money", r"cash and cash equivalents", None),
    ("debt", "Total debt", "money", r"total debt|long-term debt", None),
]


@dataclass
class Extraction:
    company: str
    period: str
    sentences: List[str]
    figures: List[Figure]


def money_to_m(m) -> float:
    v = float(m.group(1).replace(",", ""))
    u = (m.group(2) or "m").lower()
    return v * 1000 if u.startswith("b") else v


def split_sentences(text: str) -> List[str]:
    out = []
    for line in text.splitlines():
        line = line.strip(" \t•-*")
        if line:
            out += [s.strip() for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"$])', line) if s.strip()]
    return out


def run(text: str, prefix: str = "F") -> Extraction:
    sentences = split_sentences(text)
    figs: List[Figure] = []
    found = set()

    def add(key, label, value, unit, src):
        if key in found:
            return
        found.add(key)
        figs.append(Figure(f"{prefix}{len(figs)+1}", key, label, value, unit, src))

    head = sentences[0] if sentences else ""
    pm = PERIOD.search(head)
    company = re.split(r"\s+Q[1-4]\b", head)[0].strip() or "Company"
    period = pm.group(0).upper() if pm else "Unknown period"

    for s in sentences:
        if GUID.search(s):
            if re.search(r"revenue|sales", s, re.I):
                vals = [money_to_m(m) for m in MONEY.finditer(s)]
                if vals:
                    lo, hi = (min(vals[:2]), max(vals[:2]))
                    add("guidance_rev_low", "Guidance revenue (low)", lo, "USD_M", s)
                    add("guidance_rev_high", "Guidance revenue (high)", hi, "USD_M", s)
            gm = re.search(r"margin[^%]*?(-?\d+(?:\.\d+)?)\s?%", s, re.I)
            if gm:
                add("guidance_margin", "Guidance operating margin", float(gm.group(1)), "%", s)
            continue
        c = re.search(r"accounted for\s+(\d+(?:\.\d+)?)\s?%", s, re.I)
        if c:
            add("customer_concentration", "Top-customer concentration", float(c.group(1)), "%", s)
        for key, label, kind, kw, excl in SPECS:
            if key in found or (excl and re.search(excl, s, re.I)):
                continue
            m = re.search(kw, s, re.I)
            if not m:
                continue
            tail = s[m.end():]
            if kind == "money":
                mm = MONEY.search(tail)
                if mm:
                    add(key, label, money_to_m(mm), "USD_M", s)
                    if key == "revenue":
                        after = tail[mm.end():]
                        pc = PCT.search(after)
                        if pc:
                            v = float(pc.group(1))
                            if NEG.search(after[:pc.start()]):
                                v = -abs(v)
                            add("revenue_growth", "Revenue growth (YoY)", v, "%", s)
            else:
                pc = PCT.search(tail)
                if pc:
                    add(key, label, float(pc.group(1)), "%", s)
        e = EPS.search(s)
        if e:
            add("eps", "Diluted EPS", float(e.group(1)), "USD/sh", s)
    return Extraction(company, period, sentences, figs)
