
# Documentation for Flask Image Prediction App

## Description
This application is a Flask-based API for image prediction using a TensorFlow model. Uploaded images are processed, classified, and stored in Google Cloud Storage (GCS). The application also uses JWT for authentication.

## Prerequisites
Before running the application, ensure you have configured the following environment variables:

- `MODEL_BUCKET_NAME`: Name of the GCS bucket where the model is stored.
- `MODEL_FILENAME`: Name of the model file in the GCS bucket.
- `LOCAL_MODEL_PATH`: Path to store the model locally.
- `JWT_SECRET`: Secret key for JWT validation.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ArteFacto-id/artefacto-cloud-computing.git
   cd artefacto-cloud-computing
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set environment variables**:
   Configure a `.env` file or set them directly in your environment.

4. **Run the application**:
   ```bash
   python app.py
   ```

## API Endpoints

### 1. `/predict`
#### Method
`POST`

#### Description
This endpoint accepts an image file for processing and classification using the TensorFlow model.

#### Headers
- **Authorization**: `Bearer <JWT_TOKEN>`

#### Body
**Form Data**:
- `file`: The image to be classified.

#### Response
- **200 OK**:
  ```json
  {
    "prediction": "class_name",
    "confidence": 0.95
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "error": "No file uploaded!"
  }
  ```
- **401 Unauthorized**:
  ```json
  {
    "error": "Missing or invalid Authorization header"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "error": "Error description"
  }
  ```

---

## Features

### **1. Model Download**
The model is downloaded from Google Cloud Storage during app initialization.
```python
def download_model_from_gcs(bucket_name, source_blob_name, destination_file_name):
    ...
```

### **2. JWT Authentication**
Middleware is used to validate JWT tokens for every request.
```python
def validate_jwt(func):
    ...
```

### **3. Image Preprocessing**
The image is resized to `(224, 224)` and normalized.
```python
def preprocess_image(image):
    ...
```

### **4. Prediction**
Predictions are made using the TensorFlow model, returning the class name and confidence score.

### **5. Upload to GCS**
Processed images are stored in the GCS bucket.
```python
def upload_to_gcs(file_stream, bucket_name, destination_blob_name, content_type):
    ...
```

---

## File Structure
- `app.py`: Main application file.
- `requirements.txt`: Python dependencies list.
- `model/`: Local model storage directory.

---

## Dependencies
The following libraries are used in the application:
- **Flask**: Web framework.
- **TensorFlow**: Machine learning framework for model loading and prediction.
- **Pillow**: Image processing.
- **Google Cloud Storage SDK**: Integration with Google Cloud Storage.
- **PyJWT**: JSON Web Token validation.
- **ShortUUID**: Generation of short unique IDs.
- **NumPy**: Array operations and numerical data manipulation.

## How It Works
1. An image is uploaded through the `/predict` endpoint.
2. The JWT token is validated.
3. The image is processed and classified by the TensorFlow model.
4. Successfully processed images are uploaded to Google Cloud Storage.
5. The response is returned with the prediction results.

## Notes
- Ensure that Google Cloud Storage is properly configured.
- The model must be compatible with TensorFlow and accept input of shape `(224, 224, 3)`.

---

## License
This application is licensed under the [License](LICENSE).
