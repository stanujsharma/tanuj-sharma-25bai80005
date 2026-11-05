
# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start frontend development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
