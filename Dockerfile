# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy only the source code AFTER installing dependencies
COPY . .

# Build the NestJS application
RUN npm run build

# Ensure the dist directory is present (debugging step)
RUN ls dist

# Expose the port the app runs on
EXPOSE 4004

# Command to run your application
CMD ["node", "dist/server.js"]
