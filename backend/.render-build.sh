#!/usr/bin/env bash
set -e

echo "Starting custom Render build script..."

if [ -f "requirements.txt" ]; then
  echo "Installing Python dependencies from requirements.txt..."
  pip3 install -r requirements.txt
else
  echo "requirements.txt not found!"
  exit 1
fi

echo "Python packages installed successfully."
