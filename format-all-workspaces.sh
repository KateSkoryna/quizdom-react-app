#!/bin/bash

# Format all workspaces with Prettier
# Usage: ./format-all-workspaces.sh

set -e  # Exit on error

echo "🎨 Formatting all workspaces with Prettier..."
echo ""

# Format shared
echo "📦 [1/3] Formatting shared..."
npx prettier --write "shared/src/**/*.{ts,tsx,js,jsx,json}"
echo "✅ Shared formatted"
echo ""

# Format functions
echo "⚙️  [2/3] Formatting functions..."
npx prettier --write "functions/src/**/*.{ts,tsx,js,jsx,json}"
echo "✅ Functions formatted"
echo ""

# Format frontend (root src)
echo "🎨 [3/3] Formatting frontend..."
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,scss}"
echo "✅ Frontend formatted"
echo ""

echo "🎉 All workspaces formatted successfully!"
