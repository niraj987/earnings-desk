import io


def load_text(uploaded) -> str:
    """Accepts a path, a Streamlit UploadedFile or bytes (txt / md / pdf)."""
    name = getattr(uploaded, "name", str(uploaded)).lower()
    data = uploaded.read() if hasattr(uploaded, "read") else (open(uploaded, "rb").read() if isinstance(uploaded, str) else uploaded)
    if name.endswith(".pdf"):
        from pypdf import PdfReader
        return "\n".join((p.extract_text() or "") for p in PdfReader(io.BytesIO(data)).pages)
    return data.decode("utf-8", errors="ignore")
