import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image as PILImage
from google.cloud import storage

app = Flask(__name__)


# GCS bucket details
BUCKET_NAME = "artefacto-model"
MODEL_FILENAME = "latest/ArteFacto_model.keras"
LOCAL_MODEL_PATH = "/tmp/ArteFacto_model.keras" 

def download_model_from_gcs(bucket_name, source_blob_name, destination_file_name):
    """
    Downloads a file from GCS bucket.
    """
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)
    print(f"Model downloaded to {destination_file_name}")

# Download and load model
try:
    download_model_from_gcs(BUCKET_NAME, MODEL_FILENAME, LOCAL_MODEL_PATH)
    model = tf.keras.models.load_model(LOCAL_MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

# Define class labels
classes = [
    "agastya", "brahma", "candra", "durga", "ganesa",
    "gupolo", "nandhi", "siwa", "surya", "wisnu"
]

def preprocess_image(image):
    """Preprocess the image for model prediction."""
    image = image.resize((224, 224))  # Resize to model input size
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests."""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded!"}), 400

    file = request.files['file']
    try:
        # Validate and preprocess image
        img = PILImage.open(file.stream).convert("RGB")
        processed_image = preprocess_image(img)

        # Perform prediction
        prediction = model.predict(processed_image, verbose=0)[0]
        prediction_index = np.argmax(prediction)
        if 0 <= prediction_index < len(classes):
            predicted_class = classes[prediction_index]
            confidence = float(prediction[prediction_index])
            return jsonify({
                "prediction": predicted_class,
                "confidence": confidence
            })
        else:
            return jsonify({"error": "Prediction index out of range!"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    app.run()
