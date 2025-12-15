#!/bin/bash

# TypeScript compilation check for all workspaces: shared, functions, frontend
# Usage: ./build-ts-srcises.sh

set -e  # Exit on error

echo "🔍 Running TypeScript compiler for all workspaces..."
echo ""

# Check shared
echo "📦 [1/3] TypeScript check: shared..."
cd shared
tsc
cd ..
echo "✅ Shared TypeScript check passed"
echo ""

# Check functions
echo "⚙️  [2/3] TypeScript check: functions..."
cd functions
tsc
cd ..
echo "✅ Functions TypeScript check passed"
echo ""

# Check frontend (root)
echo "🎨 [3/3] TypeScript check: frontend..."
tsc
echo "✅ Frontend TypeScript check passed"
echo ""

echo "🎉 All TypeScript checks passed!"
