
# ArteFacto Services 

Member of Cloud Computing
| Member | Student ID | University |
|:------:|:----------:|:----------:|
| Afif Wahyu Adhitya | C183B4KY0154 | Universitas Amikom Yogyakarta |
| Muhammad Askar Habibulloh | C548B4NY2750 | UIN Sunan Kalijaga Yogyakarta |

This repository contains a collection of backend services and machine learning model deployments used for the ArteFActo application services. Each folder in the repository represents a specific service or deployment.

---

## Table of Contents
 [Folder Structure](#folder-structure)
<br> [How to Run the Project](#how-to-run-the-project)
<br> [Configuration](#configuration)

---

## Folder Structure
This repository consists of several main folders:

- [backend-service-1](backend-service-1)  
  - Tech Stack: Hapi.js
  - The first backend service used for authentication, ticketing, and user data management.

- [backend-service-2](backend-service-2)  
  - Tech Stack: Hapi.js
  - The second backend service used for retrieving data related to artifacts and temples.

- [ml-model-deployment-1](ml-model-deployment-1)  
  - Tech Stack: Flask, Tensorflow
  - The first machine learning model deployment, used for artifact image classification behind the artifact scan feature.

- [ml-model-deployment-2](ml-model-deployment-2) 
  - Tech Stack: Flask, Transformer
  - The second machine learning model deployment, used for translating English to Indonesian as support for the multilingual feature.

---

## How to Run the Project
1. **Preparation**:
   - Make sure Node.js and Python are installed on your system.
   - Clone this repository:
     ```bash
     git clone https://github.com/ArteFacto-id/artefacto-cloud-computing.git
     cd artefacto-cloud-computing
     ```

2. **Running Backend Services**:
   - Navigate to the `backend-service-1` folder:
     ```bash
     cd backend-service-1
     npm install
     npm start
     ```
   - Repeat the above steps for `backend-service-2`.

3. **Running Model Deployments**:
   - Navigate to the `ml-model-deployment-1` folder:
     ```bash
     cd ml-model-deployment-1
     python -m venv venv
     source venv/bin/activate  # Use `venv\Scriptsctivate` on Windows
     pip install -r requirements.txt
     python app.py
     ```
   - Repeat the above steps for `ml-model-deployment-2`.

---

## Configuration
1. **Environment Variables**:
   Make sure to set environment variables when deploying with Cloud Run or provide a `.env` file in each service folder. Below is an example of a `.env` file content:
   ```env
   PORT=3001
   DATABASE_URL=your_database_url
   API_KEY=your_api_key
   ```

2. **Cloud Integration**:
   - Use Google Cloud Storage for file storage.
   - It is highly recommended to use Google Cloud SQL for the database.

---
