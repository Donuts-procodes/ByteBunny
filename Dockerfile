# Stage 1: Build the web application (Frontend)
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the web assets using Vite
RUN npm run build

# Stage 2: Serve the web application with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Configure Nginx for a Single Page Application (SPA)
# This ensures that deep links and client-side routing work correctly
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
