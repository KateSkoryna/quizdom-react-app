#!/bin/bash

# Lighthouse Audit Script
# Builds the app, runs Lighthouse audits for both mobile and desktop

set -e  # Exit on error

# Generate timestamp for report filename
TIMESTAMP=$(date +"%d-%m-%Y")
MOBILE_REPORT_PATH="./lighthouse/reports/mobile/report_${TIMESTAMP}"
DESKTOP_REPORT_PATH="./lighthouse/reports/desktop/report_${TIMESTAMP}"

# Create report directories if they don't exist
mkdir -p ./lighthouse/reports/mobile
mkdir -p ./lighthouse/reports/desktop

echo "🏗️  Building production app..."
npm run build

echo ""
echo "🚀 Starting preview server..."
npm run preview > /dev/null 2>&1 &
PREVIEW_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 4

# Run Lighthouse for MOBILE
echo "📱 Running Lighthouse audit (MOBILE)..."
npx lighthouse http://localhost:4173/quizdom-react-app/ \
  --output=json \
  --output=html \
  --output-path="${MOBILE_REPORT_PATH}" \
  --chrome-flags="--headless" \
  --quiet

# Run Lighthouse for DESKTOP
echo "💻 Running Lighthouse audit (DESKTOP)..."
npx lighthouse http://localhost:4173/quizdom-react-app/ \
  --output=json \
  --output=html \
  --output-path="${DESKTOP_REPORT_PATH}" \
  --preset=desktop \
  --chrome-flags="--headless" \
  --quiet

# Store the report paths for tracker to use
echo "${MOBILE_REPORT_PATH}.report.json" > ./lighthouse/.latest-mobile-report
echo "${DESKTOP_REPORT_PATH}.report.json" > ./lighthouse/.latest-desktop-report

echo ""
echo "💾 Saving results to history..."
node lighthouse/scripts/tracker.js

# Cleanup: Kill the preview server
echo "🧹 Cleaning up..."
kill $PREVIEW_PID 2>/dev/null || true

# Wait a moment and kill any remaining processes on port 4173
sleep 1
lsof -ti:4173 | xargs kill -9 2>/dev/null || true

echo "✅ Audit complete!"
echo ""
echo "📊 To compare results: npm run lighthouse:compare"
echo "👀 To view HTML report: npm run lighthouse:view"
echo ""
