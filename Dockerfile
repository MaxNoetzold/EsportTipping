# Start from a Node.js base image
FROM node

# Create app directory
WORKDIR /app

# Create a new user "appuser"
RUN adduser --disabled-password --gecos '' appuser
RUN usermod -a -G audio,video appuser

# Change to the new user
USER appuser

# Copy the package.json files
COPY --chown=appuser frontend/package.json frontend/package-lock.json ./frontend/
COPY --chown=appuser backend/package.json backend/package-lock.json ./backend/

# Install dependencies
WORKDIR /app/frontend
RUN npm ci && npm cache clean --force
WORKDIR /app/backend
RUN npm ci && npm cache clean --force

# Switch back to root to install Puppeteer and its dependencies
USER root

# Install Puppeteer:
# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chrome that Puppeteer
# installs, work.
RUN apt-get update \
        && apt-get install -y wget gnupg \
        && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
        && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
        && apt-get update \
        && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
            --no-install-recommends \
        && service dbus start \
        && rm -rf /var/lib/apt/lists/* 

# Switch back to the appuser
USER appuser

# Copy the frontend & backend directories
WORKDIR /app
COPY --chown=appuser frontend ./frontend
COPY --chown=appuser backend ./backend

# Build the frontend
WORKDIR /app/frontend
RUN npm run build

# Copy the dist folder to backend/frontend
RUN rm -rf ../backend/frontend
RUN cp -r dist ../backend/frontend

# Delete the frontend directory
USER root
RUN rm -rf /app/frontend
USER appuser

# Set the working directory to backend
WORKDIR /app/backend

# Delete the .env file and rename .env.production to .env
RUN rm -rf .env
RUN mv .env.production .env

# Expose the port your app runs on
EXPOSE 3000

# Set the NODE_ENV to production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Use tsx as loader for node so we get typescript support but also receive SIGINT commands
CMD [ "node", "--import", "tsx", "src/index.ts" ]