from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from google.cloud import storage
from dotenv import load_dotenv
import os
import jwt


# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# GCS bucket and model folder
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")  # Bucket name, e.g., artefactoid
MODEL_PATH_IN_BUCKET = os.getenv("MODEL_PATH")  # Path in bucket, e.g., model2/latest
MODEL_DIR = "./model"  # Local directory for downloaded model
MODEL_PATH = MODEL_DIR  # Local path to the model directory
JWT_SECRET = os.getenv("JWT_SECRET")

def download_model_from_gcs():
    """Download all files from the specified GCS model path to local storage."""
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blobs = bucket.list_blobs(prefix=MODEL_PATH_IN_BUCKET)

    # Ensure local directory exists
    os.makedirs(MODEL_PATH, exist_ok=True)

    for blob in blobs:
        # Skip directories
        if blob.name.endswith("/"):
            continue

        # Construct local file path
        local_file_path = os.path.join(MODEL_DIR, os.path.relpath(blob.name, MODEL_PATH_IN_BUCKET))

        # Create directories for the file if necessary
        os.makedirs(os.path.dirname(local_file_path), exist_ok=True)

        # Download the file
        print(f"Downloading {blob.name} to {local_file_path}")
        blob.download_to_filename(local_file_path)

# Load model and tokenizer
if not os.path.exists(MODEL_PATH):
    download_model_from_gcs()

model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

# Middleware untuk memvalidasi JWT
def validate_jwt(func):
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid Authorization header"}), 401

        token = auth_header.split(" ")[1]
        try:
            decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user = decoded  # Simpan informasi user ke dalam request
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

    wrapper.__name__ = func.__name__
    return wrapper

@app.route('/translate', methods=['POST'])
@validate_jwt
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
