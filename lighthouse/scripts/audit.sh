#!/bin/bash

# Lighthouse Audit Script
# Runs mobile and desktop audits
# Keeps only 1 report per day (overwrites if run multiple times)

set -e  # Exit on error

# Use only date (no time) - overwrites if run multiple times same day
DATE=$(date +"%Y-%m-%d")
MOBILE_JSON="./lighthouse/reports/mobile_${DATE}.json"
DESKTOP_JSON="./lighthouse/reports/desktop_${DATE}.json"
REPORT_TXT="./lighthouse/reports/report_${DATE}.txt"

mkdir -p ./lighthouse/reports

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

# Clean up reports older than 1 year (365 days)
find ./lighthouse/reports -name "*.json" -mtime +365 -delete 2>/dev/null || true
find ./lighthouse/reports -name "*.txt" -mtime +365 -delete 2>/dev/null || true

echo ""
echo "✅ Audit complete!"
echo "📄 Report saved: ${REPORT_TXT}"
echo ""
