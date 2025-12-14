import spacy

nlp = spacy.load("en_core_web_lg")

def extract_entities(text: str) -> dict:
    doc = nlp(text)

    locations = set()
    organizations = set()
    entities = []

    for ent in doc.ents:
        if ent.label_ in ("GPE", "LOC"):
            locations.add(ent.text)
        elif ent.label_ == "ORG":
            organizations.add(ent.text)

        entities.append({
            "text": ent.text,
            "label": ent.label_
        })

    return {
        "locations": list(locations),
        "organizations": list(organizations),
        "entities": entities
    }
