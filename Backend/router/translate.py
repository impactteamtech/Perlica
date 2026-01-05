import os
import requests
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

router = APIRouter()

RAPID_API_KEY = os.getenv("RAPID_API_KEY")
RAPID_API_URL = "https://google-translate113.p.rapidapi.com/api/v1/translator/json"

HEADERS = {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "google-translate113.p.rapidapi.com",
    "Content-Type": "application/json",
}

@router.post("/translate")
async def translate(request: Request):
    try:
        data = await request.json()
        texts = data.get("texts", [])
        target = data.get("target", "en")
        source = "auto"

        print(f"Translating {len(texts)} texts to {target}")
        
        if not texts:
            return JSONResponse(content={"translations": []})

        payload = {
            "from": source,
            "to": target,
            "json": {
                "text": texts
            }
        }

        res = requests.post(
            RAPID_API_URL,
            headers=HEADERS,
            json=payload,
            timeout=20
        )
        res.raise_for_status()
        result = res.json()
        
        # 🔍 DEBUG: Print the full API response
        print("RAPID API RESPONSE keys:", result.keys() if isinstance(result, dict) else "Not a dict")
        
        # Extract translations based on the actual response structure
        translations = []
        
        # Check the actual structure from your logs
        if isinstance(result, dict):
            if "trans" in result and isinstance(result["trans"], dict):
                # This is the structure we see in your logs
                translations = result["trans"].get("text", [])
            elif "translations" in result:
                # Alternative structure
                translations = result.get("translations", [])
            elif "data" in result and "translations" in result["data"]:
                # Another possible structure
                translations = result["data"].get("translations", [])
        
        # If translations is still a list of objects with 'translatedText', extract it
        if translations and isinstance(translations, list) and len(translations) > 0:
            if isinstance(translations[0], dict):
                translations = [t.get("translatedText", "") for t in translations]
        
        print(f"Extracted {len(translations)} translations")
        if translations:
            print("First 3 translations:", translations[:3])
        
        # Fallback only if no translations found
        if not translations or len(translations) != len(texts):
            print(f"Warning: Got {len(translations) if translations else 0} translations, expected {len(texts)}")
            print("Using fallback - returning original texts")
            translations = texts
        
        return JSONResponse(content={"translations": translations})

    except Exception as e:
        print("TRANSLATION ERROR:", str(e))
        import traceback
        print("Full error trace:", traceback.format_exc())
        return JSONResponse(
            content={"translations": texts, "error": str(e)},
            status_code=200
        )