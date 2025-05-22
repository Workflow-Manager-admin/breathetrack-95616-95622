#!/bin/bash

# Start BreatheTrack development server
echo "Starting BreatheTrack development server..."
cd "$(dirname "$0")"
npm run dev -- --port 3000 --host 0.0.0.0
