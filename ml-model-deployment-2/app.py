from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from google.cloud import storage
from google.cloud.sql.connector import Connector
from dotenv import load_dotenv
import os
import jwt
import pymysql  # Tetap digunakan sebagai driver di Python Connector

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# GCS bucket and model folder
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
MODEL_PATH_IN_BUCKET = os.getenv("MODEL_PATH")
MODEL_DIR = "./model"
MODEL_PATH = MODEL_DIR
JWT_SECRET = os.getenv("JWT_SECRET")

# Cloud SQL configurations
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
INSTANCE_CONNECTION_NAME = os.getenv("INSTANCE_CONNECTION_NAME")

# Initialize Cloud SQL Python Connector
connector = Connector()

# Function to connect to the Cloud SQL database
def get_db_connection():
    conn = connector.connect(
        INSTANCE_CONNECTION_NAME,
        "pymysql",
        user=DB_USER,
        password=DB_PASSWORD,
        db=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor,
    )
    return conn

# Download model from GCS
if not os.path.exists(MODEL_PATH):
    def download_model_from_gcs():
        client = storage.Client()
        bucket = client.bucket(BUCKET_NAME)
        blobs = bucket.list_blobs(prefix=MODEL_PATH_IN_BUCKET)

        os.makedirs(MODEL_PATH, exist_ok=True)
        for blob in blobs:
            if blob.name.endswith("/"):
                continue
            local_file_path = os.path.join(MODEL_DIR, os.path.relpath(blob.name, MODEL_PATH_IN_BUCKET))
            os.makedirs(os.path.dirname(local_file_path), exist_ok=True)
            print(f"Downloading {blob.name} to {local_file_path}")
            blob.download_to_filename(local_file_path)

    download_model_from_gcs()

# Load model and tokenizer
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
            request.user = decoded
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

    wrapper.__name__ = func.__name__
    return wrapper

# Translate text function
def translate_text(input_text):
    inputs = tokenizer(input_text, return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

@app.route('/temples/<int:templeId>', methods=['GET'])
@validate_jwt
def get_temple(templeId):
    connection = None  # Inisialisasi connection di awal
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            query = """
            SELECT 
                t.description AS temple_description,
                t.funfact_title AS funfact_title,
                t.funfact_description AS funfact_description
            FROM 
                Temple t
            WHERE 
                t.templeID = %s;
            """
            cursor.execute(query, (templeId,))
            result = cursor.fetchone()

        if not result:
            return jsonify({"error": "Temple not found"}), 404

        translated_data = {
            "temple_description": translate_text(result['temple_description']),
            "funfact_title": translate_text(result['funfact_title']),
            "funfact_description": translate_text(result['funfact_description'])
        }
        return jsonify(translated_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection:  # Periksa apakah connection telah diinisialisasi
            connection.close()

@app.route('/artifacts/<int:artifactId>', methods=['GET'])
@validate_jwt
def get_artifact(artifactId):
    connection = None  # Inisialisasi connection di awal
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            query = """
            SELECT 
                a.description AS artifact_description,
                a.funfact_title AS artifact_funfact_title,
                a.funfact_description AS artifact_funfact_description
            FROM 
                Artifact a
            WHERE 
                a.artifactID = %s;
            """
            cursor.execute(query, (artifactId,))
            result = cursor.fetchone()

        if not result:
            return jsonify({"error": "Artifact not found"}), 404

        translated_data = {
            "artifact_description": translate_text(result['artifact_description']),
            "artifact_funfact_title": translate_text(result['artifact_funfact_title']),
            "artifact_funfact_description": translate_text(result['artifact_funfact_description'])
        }
        return jsonify(translated_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection:  # Periksa apakah connection telah diinisialisasi
            connection.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))