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

# Create a small Node.js script to handle the redirect
RUN echo "http.createServer((req, res) => { if (req.url === '/') { res.writeHead(301, { Location: '/api-docs' }); res.end(); } else { require('./src/index.js')(req, res); } }).listen(3000);" > redirect.js

# Run the command to start the application when the container is launched
CMD ["node", "redirect.js"]