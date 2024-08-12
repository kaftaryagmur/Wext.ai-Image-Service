# Node.js imajını kullanarak bir aşamalı build oluştur
FROM node:18-alpine

# Çalışma dizini oluştur
WORKDIR /app

# Uygulama bağımlılıklarını yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala ve build et
COPY . .
RUN npm run dev

# Uygulamayı bir web sunucusu ile çalıştır
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Uygulama 3000 portunda çalışacak
EXPOSE 3000