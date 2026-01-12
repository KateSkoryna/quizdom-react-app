#!/bin/bash

# Lighthouse Audit Script
# Runs mobile and desktop audits
# Keeps only 1 report per day (overwrites if run multiple times)

set -e  # Exit on error

# Use only date (no time) - overwrites if run multiple times same day
YEAR=$(date +"%Y")
DATE=$(date +"%m-%d")
REPORT_DIR="./lighthouse/reports/${YEAR}/${DATE}"
MOBILE_JSON="${REPORT_DIR}/mobile.json"
DESKTOP_JSON="${REPORT_DIR}/desktop.json"
REPORT_TXT="${REPORT_DIR}/report.txt"

mkdir -p "${REPORT_DIR}"

echo "🏗️  Building production app..."
npm run build

echo ""
echo "🚀 Starting preview server..."
npm run preview > /dev/null 2>&1 &
PREVIEW_PID=$!

echo "⏳ Waiting for server to start..."
sleep 4

# Run mobile audit
echo "📱 Running Lighthouse audit (MOBILE)..."
npx lighthouse http://localhost:4173/quizdom-react-app/ \
  --output=json \
  --output-path="${MOBILE_JSON}" \
  --chrome-flags="--headless" \
  --quiet

# Run desktop audit
echo "💻 Running Lighthouse audit (DESKTOP)..."
npx lighthouse http://localhost:4173/quizdom-react-app/ \
  --output=json \
  --output-path="${DESKTOP_JSON}" \
  --preset=desktop \
  --chrome-flags="--headless" \
  --quiet

# Cleanup server
kill $PREVIEW_PID 2>/dev/null || true
sleep 1
lsof -ti:4173 | xargs kill -9 2>/dev/null || true

# Generate report (always shows in terminal)
echo ""
echo "📊 Generating report..."
node lighthouse/scripts/generate-report.js "${MOBILE_JSON}" "${DESKTOP_JSON}" | tee "${REPORT_TXT}"

# Save to history
node lighthouse/scripts/tracker.js "${MOBILE_JSON}" "${DESKTOP_JSON}"

# Clean up year folders older than 1 year
# First, delete old files
find ./lighthouse/reports -type f -mtime +365 -delete 2>/dev/null || true
# Then, remove empty directories
find ./lighthouse/reports -type d -empty -delete 2>/dev/null || true

echo ""
echo "✅ Audit complete!"
echo "📄 Report saved: ${REPORT_TXT}"
echo "📁 Reports organized in: lighthouse/reports/${YEAR}/${DATE}/"
echo ""
