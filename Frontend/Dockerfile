# === Build Stage ===
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Vite builds to `dist/`, not `build/`
RUN npm run build

# === Production Stage ===
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
