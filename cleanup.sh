#!/bin/bash
# Cleanup script for Anna Matrix Lab web application

echo "🧹 Cleaning up..."

# Kill Flask processes
echo "Stopping Flask processes..."
lsof -ti:5000 | xargs kill -9 2>/dev/null || true

# Remove Python cache
echo "Removing Python cache..."
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete 2>/dev/null || true

# Remove backup files
echo "Removing backup files..."
find . -name "*.backup" -delete 2>/dev/null || true
find . -name "*.bak" -delete 2>/dev/null || true
find . -name "*.tmp" -delete 2>/dev/null || true

# Remove system files
echo "Removing system files..."
find . -name ".DS_Store" -delete 2>/dev/null || true

# Remove log files
echo "Removing log files..."
find . -name "*.log" -delete 2>/dev/null || true

echo "✅ Cleanup complete!"

