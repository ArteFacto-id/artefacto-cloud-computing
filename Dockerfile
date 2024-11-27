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

# Salin seluruh isi folder proyek ke dalam container
COPY . .

# Expose port untuk Flask
EXPOSE 5000

# Perintah untuk menjalankan aplikasi menggunakan Gunicorn
CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:5000", "app:app", "--reload"]