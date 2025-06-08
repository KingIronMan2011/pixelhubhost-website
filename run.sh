#!/bin/bash

echo "=========================================="
echo " PixelHub Host - Start Script (Linux/Ubuntu)"
echo "=========================================="

# Install or update Node.js (LTS) and npm to latest
if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js is not installed."
  echo "Attempting to install Node.js (LTS) using apt..."
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - >/dev/null 2>&1
  sudo apt-get install -y nodejs >/dev/null 2>&1
else
  echo "Updating Node.js (LTS) and npm to latest..."
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - >/dev/null 2>&1
  sudo apt-get install -y nodejs >/dev/null 2>&1
fi

NODE_VERSION=$(node -v | sed 's/v//')
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[ERROR] Node.js v18.x or newer is required. Detected: v$NODE_VERSION"
  exit 1
fi
echo "Node.js version v$NODE_VERSION detected. [OK]"

# Update npm to latest
printf "Updating npm to latest version... "
sudo npm install -g npm >/dev/null 2>&1
echo "[DONE]"
NPM_VERSION=$(npm -v)
echo "npm version $NPM_VERSION detected. [OK]"

# Check if .env file exists
printf "Checking for .env file... "
if [ ! -f .env ]; then
  echo "[NOT FOUND]"
  echo ".env not found. Copying from .env.example..."
  cp .env.example .env
  echo "Copied .env.example to .env"
else
  echo "[FOUND]"
fi

# Install dependencies
printf "Installing dependencies... "
npm install --silent >/dev/null 2>&1
echo "[DONE]"

# Start the development server
echo "Starting the development server..."
npm run dev --silent
if [ $? -ne 0 ]; then
  echo "[ERROR] Failed to start the development server."
  exit 1
fi