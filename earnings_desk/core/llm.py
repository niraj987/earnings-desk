"""Optional LLM layer (LangChain). The LLM may only rephrase the executive summary and every output is
validated: tags must exist and every number must come from the supplied facts. Otherwise we fall back."""
import os, re


def get_llm():
    try:
        if os.getenv("ANTHROPIC_API_KEY"):
            from langchain_anthropic import ChatAnthropic
            return ChatAnthropic(model=os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6"), temperature=0.2, max_tokens=400)
        if os.getenv("OPENAI_API_KEY"):
            from langchain_openai import ChatOpenAI
            return ChatOpenAI(model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"), temperature=0.2, max_tokens=400)
    except Exception:
        return None
    return None


def llm_available() -> bool:
    return get_llm() is not None


def polish_summary(facts: str, valid_ids: set):
    llm = get_llm()
    if llm is None:
        return None
    prompt = ("You are a sell-side editor. Write a 3-sentence executive summary for an analyst note using ONLY the facts "
              "below. After every figure, keep its tag like [F1]. Do not invent numbers.\n\nFACTS:\n" + facts)
    try:
        out = llm.invoke(prompt).content
        out = out if isinstance(out, str) else " ".join(b.get("text", "") for b in out if isinstance(b, dict))
    except Exception:
        return None
    tags = re.findall(r"\[([A-Z]\d+(?:,\s*[A-Z]\d+)*)\]", out)
    if not tags or any(t.strip() not in valid_ids for grp in tags for t in grp.split(",")):
        return None
    nums = re.findall(r"\d+(?:\.\d+)?", re.sub(r"\[[^\]]*\]", "", out))
    if any(n not in facts for n in nums):
        return None
    return out.strip()
