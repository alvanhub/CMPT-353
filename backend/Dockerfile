# Use latest Node.js image for frontend
FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install frontend dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose port 5000 for frontend
EXPOSE 5000


# Command to build and serve the frontend
CMD ["/bin/bash"]
