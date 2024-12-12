# Temple and Artifact Translation API

## Description
This Flask-based API provides translation services for temple and artifact descriptions. It uses a sequence-to-sequence model for translations and integrates with Google Cloud SQL for data storage. The application implements JWT authentication for secure access.

## Prerequisites
Before running the application, ensure you have configured the following environment variables in your `.env` file:

- `GCS_BUCKET_NAME`: Name of the GCS bucket where the model is stored
- `MODEL_PATH`: Path to the model in the GCS bucket
- `JWT_SECRET`: Secret key for JWT validation
- `DB_USER`: Database user for Cloud SQL
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `INSTANCE_CONNECTION_NAME`: Cloud SQL instance connection name

## Installation
1. **Clone the repository**:
   ```bash
   git clone [your-repository-url]
   cd [repository-name]
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set environment variables**:
   Create a `.env` file with the required environment variables.

4. **Run the application**:
   ```bash
   python app.py
   ```

## API Endpoints

### 1. `/temples/<templeId>`
#### Method
`GET`

#### Description
Retrieves and translates temple information including description and fun facts.

#### Headers
- **Authorization**: `Bearer <JWT_TOKEN>`

#### Response
- **200 OK**:
  ```json
  {
    "temple_description": "translated_description",
    "funfact_title": "translated_title",
    "funfact_description": "translated_funfact"
  }
  ```
- **401 Unauthorized**:
  ```json
  {
    "error": "Missing or invalid Authorization header"
  }
  ```
- **404 Not Found**:
  ```json
  {
    "error": "Temple not found"
  }
  ```
- **500 Internal Server Error**:
  ```json
  {
    "error": "Error description"
  }
  ```

### 2. `/artifacts/<artifactId>`
#### Method
`GET`

#### Description
Retrieves and translates artifact information including description and fun facts.

#### Headers
- **Authorization**: `Bearer <JWT_TOKEN>`

#### Response
Same structure as the temples endpoint, but with artifact-specific data.

## Features

### **1. Model Management**
- Automatic model download from Google Cloud Storage
- Local model caching for improved performance
- Sequence-to-sequence translation capabilities

### **2. Security**
- JWT-based authentication
- Token validation middleware
- Secure database connections

### **3. Database Integration**
- Cloud SQL connection management
- Efficient connection pooling
- Proper connection cleanup

### **4. Translation Service**
- Text translation using pre-trained models
- Support for multiple text fields
- Error handling for translation failures

## Architecture Components

### **1. Database Connection**
```python
def get_db_connection():
    # Establishes connection to Cloud SQL
    ...
```

### **2. JWT Authentication**
```python
def validate_jwt(func):
    # Validates JWT tokens for protected endpoints
    ...
```

### **3. Translation Service**
```python
def translate_text(input_text):
    # Handles text translation using the loaded model
    ...
```

## File Structure
- `app.py`: Main application file containing routes and core logic
- `.env`: Environment variables configuration
- `requirements.txt`: Python dependencies
- `model/`: Directory for storing the downloaded translation model

## Dependencies
- **Flask**: Web framework
- **PyMySQL**: MySQL database driver
- **google-cloud-storage**: Google Cloud Storage client
- **google-cloud-sql-connector**: Cloud SQL connector
- **transformers**: Hugging Face Transformers library
- **PyJWT**: JSON Web Token handling
- **python-dotenv**: Environment variable management

## Error Handling
The application implements comprehensive error handling for:
- Database connection issues
- Invalid JWT tokens
- Missing resources (404 errors)
- Translation failures
- General server errors

## Best Practices
- Connection pooling for database efficiency
- Proper resource cleanup
- Environment variable configuration
- Secure authentication implementation
- Structured error responses

## Deployment
The application is designed to run on Google Cloud Platform and can be deployed using:
```bash
gcloud app deploy
```

## Notes
- Ensure proper GCP credentials are configured
- Monitor model download size and storage requirements
- Keep JWT secret secure and regularly rotated
- Implement proper logging in production

## License
This project is licensed under the [License](LICENSE)