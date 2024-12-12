# Nama Project Kamu

Repositori ini berisi kumpulan layanan backend dan deployment model machine learning yang digunakan untuk service dari aplikasi ArteFActo. Setiap folder di dalam repositori merepresentasikan layanan atau deployment tertentu.

---

## Daftar Isi
 [Struktur Folder](#struktur-folder)
<br> [Cara Menjalankan Proyek](#cara-menjalankan-proyek)
<br> [Konfigurasi](#konfigurasi)

---

## Struktur Folder
Repositori ini terdiri dari beberapa folder utama:

- [backend-service-1](backend-service-1)  
  - Tech Stack: Hapi.js
  - Layanan backend pertama yang digunakan untuk autentikasi, ticketing, user data management.

- [backend-service-2](backend-service-2)  
  - Tech Stack: Hapi.js
  - Layanan backend kedua yang digunakan untuk mendapatkan data terkait artifacts dan temples yang ada.

- [ml-model-deployment-1](ml-model-deployment-1)  
  - Tech Stack: Flask, Tensorflow
  - Deployment model machine learning pertama, digunakan untuk melakukan klasifikasi gambar artifact dibalik fitur scan artifact.

- [ml-model-deployment-2](ml-model-deployment-2) 
  - Tech Stack: Flask, Transformer
  - Deployment model machine learning kedua, digunakan untuk melakukan translate dari bahasa inggris ke indonesia sebagai dukungan untuk fitur multilingual.

---

## Cara Menjalankan Proyek
1. **Persiapan**:
   - Pastikan Node.js dan Python sudah diinstal di sistem kamu.
   - Clone repository ini:
     ```bash
     git clone https://github.com/ArteFacto-id/artefacto-cloud-computing.git
     cd artefacto-cloud-computing
     ```

2. **Menjalankan Backend Services**:
   - Masuk ke folder `backend-service-1`:
     ```bash
     cd backend-service-1
     npm install
     npm start
     ```
   - Ulangi langkah di atas untuk `backend-service-2`.

3. **Menjalankan Model Deployment**:
   - Masuk ke folder `ml-model-deployment-1`:
     ```bash
     cd ml-model-deployment-1
     python -m venv venv
     source venv/bin/activate  # Gunakan `venv\Scripts\activate` di Windows
     pip install -r requirements.txt
     python app.py
     ```
   - Ulangi langkah di atas untuk `ml-model-deployment-2`.

---

## Konfigurasi
1. **Variabel Lingkungan**:
   Pastikan untuk melakukan set-env-vars ketika deploy dengan cloudrun atau sediakan file `.env` sudah disiapkan di setiap folder layanan. Berikut contoh isi file `.env`:
   ```env
   PORT=3001
   DATABASE_URL=your_database_url
   API_KEY=your_api_key
   ```

2. **Integrasi dengan Cloud**:
   - Gunakan Google Cloud Storage untuk penyimpanan file.
   - Sangat direkomendasika untuk menggunakan Google Cloud SQL untuk database

---
