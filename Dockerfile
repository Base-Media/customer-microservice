# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Configure Git to use HTTPS instead of SSH
RUN git config --global url."https://github.com/".insteadOf "git@github.com:"
# Copy the source code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run your application
CMD ["node", "dist/server.js"]
