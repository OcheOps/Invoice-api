# Use an official Node.js image as the base
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port that the application will listen on
EXPOSE 3000

# Set the default URL to /api-docs
ENV URL_PREFIX=/api-docs

# Run the command to start the application when the container is launched
CMD ["node", "src/index.js"]