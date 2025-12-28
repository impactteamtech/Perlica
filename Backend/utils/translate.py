# Import GoogleTranslator from deep_translator for text translation
from deep_translator import GoogleTranslator

# -----------------------------------
# API endpoint for translating text
# -----------------------------------
@app.route("/translate", methods=["POST"])
def translate():
    """
    Receive a POST request containing texts to translate and the target language.
    Returns a JSON response with the translated texts.
    """
    try:
        # Get JSON data from the request body
        # force=True ensures JSON parsing even if Content-Type header is missing
        data = request.get_json(force=True)

        # Extract 'texts' array and 'target' language code from JSON
        texts = data.get("texts", [])
        target = data.get("target")

        # Log the request in the terminal for debugging
        print("Received", len(texts), "texts for", target)

        # Initialize the translator: auto-detect source language, set target
        translator = GoogleTranslator(source="auto", target=target)

        # Translate all texts at once using batch translation
        translated = translator.translate_batch(texts)

        # Return the translated texts as JSON
        return jsonify({"translations": translated})

    except Exception as e:
        # Catch any errors, log them, and return an error response
        print("SERVER ERROR:", e)
        return jsonify({"error": str(e)}), 500



