#!/bin/bash

# Open the latest Lighthouse HTML report
# Usage: ./view-latest.sh [mobile|desktop]
# Default: Opens both mobile and desktop

DEVICE=${1:-both}

LATEST_MOBILE="./lighthouse/.latest-mobile-report"
LATEST_DESKTOP="./lighthouse/.latest-desktop-report"

open_report() {
  local JSON_PATH=$1
  local DEVICE_NAME=$2

  if [ ! -f "$JSON_PATH" ]; then
    echo "❌ No $DEVICE_NAME report found."
    return 1
  fi

  local JSON_CONTENT=$(cat "$JSON_PATH")
  local HTML_PATH="${JSON_CONTENT%.report.json}.report.html"

  if [ ! -f "$HTML_PATH" ]; then
    echo "❌ $DEVICE_NAME HTML report not found at: $HTML_PATH"
    return 1
  fi

  echo "📊 Opening $DEVICE_NAME report..."
  open "$HTML_PATH"
}

case $DEVICE in
  mobile)
    open_report "$LATEST_MOBILE" "mobile"
    ;;
  desktop)
    open_report "$LATEST_DESKTOP" "desktop"
    ;;
  both|*)
    echo "📱 Opening mobile and desktop reports..."
    open_report "$LATEST_MOBILE" "mobile"
    open_report "$LATEST_DESKTOP" "desktop"
    ;;
esac
