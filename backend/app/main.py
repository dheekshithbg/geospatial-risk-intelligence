from fastapi import FastAPI
from app.nlp.extractor import extract_entities
from app.risk.classifier import classify_risk

app = FastAPI(
    title="PuviIntel",
    description="Unstructured Text to Geospatial Intelligence API",
    version="0.2.0"
)

@app.get("/")
def health_check():
    return {"message": "FastAPI Running"}

@app.post("/nlp/extract")
def extract(payload: dict):
    text = payload.get("text", "")
    return extract_entities(text)

@app.post("/analyze")
def analyze(payload: dict):
    text = payload.get("text", "")

    entities = extract_entities(text)
    risk = classify_risk(text)

    return {
        "entities": entities,
        "risk_analysis": risk
    }
