# Aşama 1: Build aşaması
FROM node:18-alpine AS builder

# Çalışma dizini oluştur
WORKDIR /app

# Yalnızca package.json ve package-lock.json (veya yarn.lock) dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak dosyalarını kopyala
COPY . .

# Next.js projesini build et
RUN npm run build

# Aşama 2: Çalıştırma aşaması
FROM node:18-alpine

# Çalışma dizini oluştur
WORKDIR /app

# Sadece production bağımlılıklarını yükle
COPY package*.json ./
RUN npm install --production

# Build edilen dosyaları kopyala
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/next.config.js /app/next.config.js
COPY --from=builder /app/package.json /app/package.json

# Uygulamayı başlat
CMD ["npm", "start"]

# Uygulama 3000 portunda çalışacak
EXPOSE 3000
