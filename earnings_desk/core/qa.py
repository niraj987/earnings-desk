"""Tiny grounded Q&A ('ask the note'): token-overlap retrieval over figures + claims. Always returns evidence IDs."""
import re

STOP = {"the", "a", "of", "is", "what", "was", "how", "much", "did", "do", "and", "to", "in", "for", "on", "are", "were", "its", "it"}


def _tok(s):
    return {w for w in re.findall(r"[a-z]+", s.lower()) if w not in STOP and len(w) > 2}


def ask(question: str, registry: dict, views: list, k: int = 4):
    q = _tok(question)
    scored = []
    for i, f in registry.items():
        if f.key == "sentence":
            continue
        s = len(q & _tok(f"{f.label} {f.key.replace('_', ' ')} {f.source}"))
        if s:
            scored.append((s + 0.5, f"**{f.label}** = {f.display}  \n<sub>{i}: {f.source}</sub>"))
    for v in views:
        for c in v.claims:
            s = len(q & _tok(c.text))
            if s:
                scored.append((s, f"{c.render()}  \n<sub>from {v.agent}</sub>"))
    scored.sort(key=lambda x: -x[0])
    return [t for _, t in scored[:k]] or ["No grounded evidence found for that question in this report."]
