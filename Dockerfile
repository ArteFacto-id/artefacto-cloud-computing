# Gunakan Node.js sebagai base image
FROM node:20

# Atur working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code aplikasi ke dalam container
COPY . .

# Expose port aplikasi (sesuai dengan port pada .env)
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
