from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os

# Initialize Flask app
app = Flask(__name__)

# Load model and tokenizer
MODEL_PATH = "./latest"
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

@app.route('/translate', methods=['POST'])
def translate():
    try:
        # Parse input JSON
        data = request.get_json()
        input_text = data.get("text", "")
        if not input_text:
            return jsonify({"error": "Input text is required."}), 400

        # Tokenize input text
        inputs = tokenizer(input_text, return_tensors="pt")

        # Generate translation
        outputs = model.generate(**inputs)
        translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({"translated_text": translated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Start the Flask app (use host=0.0.0.0 for Cloud Run compatibility)
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
