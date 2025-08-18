# Stage 1: Build Vite app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Nginx to serve static + proxy API
FROM nginx:alpine AS production

# Copy Vite build
COPY --from=builder /app/dist /usr/share/nginx/html

# Install curl for healthcheck
RUN apk add --no-cache curl

# Nginx config for static + proxy
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
