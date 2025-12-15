#!/bin/bash

# Build all workspaces: shared, functions, frontend
# Usage: ./build-all-workspaces.sh

set -e  # Exit on error

echo "🚀 Building all workspaces..."
echo ""

# Build shared package first (others depend on it)
echo "📦 [1/3] Building shared..."
cd shared
npm run build
cd ..
echo "✅ Shared built successfully"
echo ""

# Build backend functions
echo "⚙️  [2/3] Building functions..."
cd functions
npm run build
cd ..
echo "✅ Functions built successfully"
echo ""

# Build frontend (root)
echo "🎨 [3/3] Building frontend..."
npm run build
echo "✅ Frontend built successfully"
echo ""

echo "🎉 All workspaces built successfully!"
echo ""
echo "Build outputs:"
echo "  - shared/lib/"
echo "  - functions/lib/"
echo "  - dist/"
