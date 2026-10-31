"""Shared data models + the evidence registry used for grounding."""
from dataclasses import dataclass, field
from typing import List, Dict


@dataclass
class Figure:
    id: str
    key: str
    label: str
    value: float
    unit: str            # USD_M | % | USD/sh | x | pp
    source: str = ""     # the sentence (or formula) the number came from
    period: str = "current"

    @property
    def display(self) -> str:
        if self.key == "sentence":
            return "quote"
        if self.unit == "USD_M":
            return f"${self.value/1000:,.2f}B" if abs(self.value) >= 1000 else f"${self.value:,.0f}M"
        if self.unit == "%":
            return f"{self.value:.1f}%"
        if self.unit == "pp":
            return f"{self.value:+.1f}pp"
        if self.unit == "USD/sh":
            return f"${self.value:.2f}"
        if self.unit == "x":
            return f"{self.value:.2f}x"
        return f"{self.value:g}"


@dataclass
class Claim:
    text: str
    refs: List[str]

    def render(self) -> str:
        return f"{self.text} [{', '.join(self.refs)}]" if self.refs else self.text


@dataclass
class AnalystView:
    agent: str
    section: str
    stance: str                      # positive | neutral | negative
    score: float
    headline: str
    claims: List[Claim] = field(default_factory=list)
    derived: List[Figure] = field(default_factory=list)
    table: list = field(default_factory=list)


class Deriver:
    """Creates derived figures (ratios, implied growth...) with their own IDs + formula as source."""
    def __init__(self, prefix: str):
        self.prefix, self.items = prefix, []

    def add(self, key, label, value, unit, formula) -> Figure:
        f = Figure(f"{self.prefix}{len(self.items)+1}", key, label, value, unit, f"derived: {formula}")
        self.items.append(f)
        return f


def stance_from(score: float) -> str:
    return "positive" if score >= 1 else "negative" if score <= -0.5 else "neutral"


def by_key(figs) -> Dict[str, Figure]:
    return {f.key: f for f in figs}


def build_registry(figures, prior, sentences, views) -> Dict[str, Figure]:
    reg = {}
    for f in list(figures) + list(prior) + [d for v in views for d in v.derived]:
        reg[f.id] = f
    for i, s in enumerate(sentences):
        reg[f"S{i+1}"] = Figure(f"S{i+1}", "sentence", "Report text", 0, "", s)
    return reg
