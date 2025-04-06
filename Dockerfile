# Stage 1: build de Angular
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Stage 2: nginx
FROM nginx:alpine
# Borra los archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*
# Copia los archivos build de Angular (ajusta la ruta según corresponda, en este caso apuntamos a 'browser')
COPY --from=builder /app/dist/miangularapp/browser /usr/share/nginx/html
# Copia tu configuración personalizada
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
