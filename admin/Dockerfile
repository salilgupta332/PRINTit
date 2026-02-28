# -------------------- Build Stage --------------------
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# -------------------- Production Stage --------------------
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

# Copy only the built files (inside dist/admin)
COPY --from=frontend-builder  /app/dist ./dist

EXPOSE 5174

# Serve from ./dist on port 80, with /admin base path support
CMD ["serve", "-s", "dist", "-l", "5174"]




