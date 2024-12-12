# Gunakan base image Python 3.10 atau yang lebih baru
FROM python:3.10-slim

# Set environment variable untuk memastikan output langsung ditampilkan di console
ENV PYTHONUNBUFFERED=1

# Tentukan working directory dalam container
WORKDIR /app

# Salin file requirements ke dalam container
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

# Expose port untuk Flask
EXPOSE 8080

# Perintah untuk menjalankan aplikasi menggunakan Gunicorn
CMD ["gunicorn", "app:app", "--workers=1", "--threads=8", "--bind=0.0.0.0:8080"]