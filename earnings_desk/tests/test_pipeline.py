import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from core.graph import run_pipeline
from core.loader import load_text
from core.models import by_key

R = load_text("sample_data/acme_q3_2026.txt"); P = load_text("sample_data/acme_q2_2026.txt")


def test_extraction():
    f = by_key(run_pipeline(R, P)["figures"])
    assert f["revenue"].value == 4820 and f["revenue_growth"].value == 12
    assert f["net_income"].value == 612 and f["eps"].value == 2.45
    assert f["guidance_rev_low"].value == 5000 and f["guidance_rev_high"].value == 5200
    assert f["customer_concentration"].value == 38


def test_grounding_full():
    n = run_pipeline(R, P)["note"]
    assert n["coverage"] == 100 and not n["ungrounded"]
    for r in n["used_ids"]:
        assert r in n["registry"]


def test_comparison_direction():
    rows = {r["metric"]: r for r in run_pipeline(R, P)["comparison"].table}
    assert rows["Total revenue"]["direction"] == "▲"
    assert rows["Gross margin"]["direction"] == "▼"
    assert rows["Total debt"]["direction"] == "▬"


def test_disagreement_flagged():
    assert run_pipeline(R, P)["note"]["disagreements"]


def test_no_prior_still_works():
    st = run_pipeline(R, "")
    assert "Quarter-over-quarter" not in st["note"]["markdown"]
