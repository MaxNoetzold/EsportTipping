# Start from a Node.js base image
FROM node

# Dont use the root user but the build-in node user
# WORKDIR /usr/src/app
# RUN chown node:node ./
# USER node

# Set the working directory
WORKDIR /app

# Copy the package.json files
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY backend/package.json backend/package-lock.json ./backend/

# Install dependencies
WORKDIR /app/frontend
RUN npm ci && npm cache clean --force
WORKDIR /app/backend
RUN npm ci && npm cache clean --force

# Copy the frontend & backend directories
WORKDIR /app
COPY frontend ./frontend
COPY backend ./backend

# Build the frontend
WORKDIR /app/frontend
RUN npm run build

# Copy the dist folder to backend/frontend
RUN rm -rf ../backend/frontend
RUN cp -r dist ../backend/frontend

# Delete the frontend directory
RUN rm -rf /app/frontend

# Set the working directory to backend
WORKDIR /app/backend

# Delete the .env file and rename .env.production to .env
RUN rm -rf .env
RUN mv .env.production .env

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "--import", "tsx", "src/index.ts" ]
