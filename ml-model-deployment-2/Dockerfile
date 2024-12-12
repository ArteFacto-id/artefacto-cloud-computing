FROM python:3.9-slim

WORKDIR /app

# Salin file requirements.txt dan instal dependensi
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh aplikasi, termasuk folder model
COPY . .

# Expose port 8080 untuk Cloud Run
EXPOSE 8080

# Jalankan aplikasi menggunakan Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
