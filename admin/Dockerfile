# -------------------- Build Stage --------------------
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./

# Faster & more reliable than npm install
RUN npm ci --legacy-peer-deps

COPY . .

# Build Vite app
RUN npm run build

# -------------------- Production Stage --------------------
FROM node:20-alpine

WORKDIR /app

# Install a tiny static server
RUN npm install -g serve

# Copy only build output
COPY --from=frontend-builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
