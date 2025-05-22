#!/bin/bash

# Start BreatheTrack development server
echo "Starting BreatheTrack development server..."
cd "$(dirname "$0")"

# Check Node.js version
NODE_VERSION=$(node -v)
echo "Detected Node.js version: $NODE_VERSION"

# Set Node options to bypass version check and warnings
export NODE_OPTIONS="--no-warnings"
echo "Setting NODE_OPTIONS to bypass warnings"

# Start the development server
echo "Starting development server..."
npm run dev -- --port 3000 --host 0.0.0.0
