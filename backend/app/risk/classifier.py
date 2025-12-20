from typing import Dict, List

RISK_KEYWORDS = {
    "flood": ["flood", "flooding", "waterlogging", "heavy rain"],
    "fire": ["fire", "blaze", "explosion"],
    "protest": ["protest", "riot", "demonstration", "strike"],
    "health": ["disease", "outbreak", "virus", "infection"],
    "infrastructure": ["power outage", "road collapse", "bridge failure"]
}

def classify_risk(text: str) -> Dict:
    text_lower = text.lower()

    detected_risks: List[str] = []

    for risk, keywords in RISK_KEYWORDS.items():
        if any(keyword in text_lower for keyword in keywords):
            detected_risks.append(risk)

    confidence = round(min(len(detected_risks) * 0.4, 1.0), 2)

    return {
        "risks": detected_risks,
        "confidence": confidence
    }
