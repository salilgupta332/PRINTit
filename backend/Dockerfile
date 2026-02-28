FROM node:18-alpine

WORKDIR /app

# Copy only backend package files
COPY package*.json ./
RUN npm install

# Copy backend source ONLY
COPY . .


EXPOSE 5000

# 🚨 Run server directly (NOT npm start)
CMD ["node", "server.js"]
