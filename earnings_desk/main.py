"""CLI:  python main.py --report sample_data/acme_q3_2026.txt --prior sample_data/acme_q2_2026.txt"""
import argparse, json, sys

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from core.graph import run_pipeline
from core.loader import load_text


def main():
    ap = argparse.ArgumentParser(description="Financial Earnings Report Analysis Desk")
    ap.add_argument("--report", default="sample_data/acme_q3_2026.txt")
    ap.add_argument("--prior", default="sample_data/acme_q2_2026.txt")
    ap.add_argument("--llm", action="store_true", help="LLM-polish the executive summary (needs API key)")
    ap.add_argument("--out", default="analyst_note.md")
    a = ap.parse_args()
    st = run_pipeline(load_text(a.report), load_text(a.prior) if a.prior else "", use_llm=a.llm)
    print("\n".join(f"[{t['agent']:<10}] {t['seconds']:.4f}s  {t['info']}" for t in st["trace"]), "\n")
    print(st["note"]["markdown"])
    open(a.out, "w", encoding="utf-8").write(st["note"]["markdown"])
    json.dump([{"id": f.id, "key": f.key, "value": f.value, "unit": f.unit, "source": f.source} for f in st["figures"]],
              open("figures.json", "w"), indent=2)
    print(f"\nSaved -> {a.out}, figures.json")


if __name__ == "__main__":
    main()
