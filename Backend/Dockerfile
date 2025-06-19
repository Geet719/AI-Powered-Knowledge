# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of backend code
COPY . .

# Set environment port (optional)
ENV PORT=5000

# Expose port and start server
EXPOSE 5000
CMD ["npm", "start"]
