# Backend Dockerfile (Node + Express)
FROM node:20-alpine AS build

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del backend (4000)
EXPOSE 4000

# Comando de inicio del servidor
CMD ["node", "src/server.js"]
