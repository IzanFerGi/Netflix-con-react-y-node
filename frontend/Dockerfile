# --- Etapa 1: Build del proyecto React ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Generar el build de producción de React (Vite, CRA, etc.)
RUN npm run build

# --- Etapa 2: Servir el build con NGINX ---
FROM nginx:stable-alpine

# Eliminar configuración default
RUN rm /etc/nginx/conf.d/default.conf

# Copiar el build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Agregar configuración personalizada de nginx (SPA + API proxy)
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
