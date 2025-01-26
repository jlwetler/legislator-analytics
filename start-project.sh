#!/bin/bash

# Set environment variables
export RUNNING_ENV=local
BACKEND_PORT=3001
FRONTEND_PORT=3000

# Navigate to the project directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define paths to backend and frontend directories
BACKEND_DIR="$DIR/back"
FRONTEND_DIR="$DIR/front"

# Navigate to the backend directory, install dependencies, and start the backend
echo "Installing backend dependencies..."
cd "$BACKEND_DIR" || exit 1
yarn install

echo "Running tests..."
yarn test &  # Run the tests before start 

echo "Starting backend..."
yarn start &  # Run the backend in the background

# Wait for the backend to be up
until curl -s "http://localhost:$BACKEND_PORT" > /dev/null; do
  echo "Waiting for backend to start..."
  sleep 2
done

# Navigate to the frontend directory, install dependencies, and start the frontend
echo "Installing frontend dependencies..."
cd "$FRONTEND_DIR" || exit 1
yarn install

echo "Starting frontend..."
yarn dev &

until curl -s "http://localhost:$FRONTEND_PORT" > /dev/null; do
  echo "Waiting for frontend to start..."
  sleep 2
done

# Inform the user that the process is complete
echo "Backend and frontend are now running. Please open http://localhost:3000 on browser"

