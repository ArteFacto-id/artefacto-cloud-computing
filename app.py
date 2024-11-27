import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image as PILImage

app = Flask(__name__)

# Load the pre-trained model
MODEL_PATH = "model/[NAMA MODEL].keras"
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

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