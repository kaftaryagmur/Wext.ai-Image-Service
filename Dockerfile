# Aşama 1: Build aşaması
FROM node:18-alpine AS builder

# Çalışma dizini oluştur
WORKDIR /app

# Uygulama bağımlılıklarını yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala ve build et
COPY . .
RUN npm run build

# Aşama 2: Çalıştırma aşaması
FROM node:18-alpine

# Globalde serve yükle (sadece React için)
RUN npm install -g serve

# Çalışma dizini oluştur
WORKDIR /app

# Build edilen dosyaları kopyala
COPY --from=builder /app/build /app/build

#  Next.js projesinde, serve komutunu kullanmak yerine next start
CMD ["npm", "run", "start"]

# Uygulama 3000 portunda çalışacak
EXPOSE 3000
