# Gunakan base image Node.js
FROM node:20

# Atur working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Salin semua file ke dalam container
COPY . .

# Ekspos port aplikasi
EXPOSE 3000

# Tentukan command untuk menjalankan aplikasi
CMD ["npm", "start"]