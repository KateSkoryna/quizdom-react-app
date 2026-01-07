# Lighthouse Tracking

Track and compare Lighthouse performance metrics over time for both **mobile** and **desktop**.

## Quick Start

### Run an audit
```bash
npm run lighthouse:audit
```

This will:
1. Build your production app
2. Start a preview server
3. Run Lighthouse audit for **MOBILE** (~30 seconds)
4. Run Lighthouse audit for **DESKTOP** (~30 seconds)
5. Save results to `lighthouse/history.json`
6. Clean up the preview server
7. Show you separate scores for mobile and desktop

### Compare results
```bash
npm run lighthouse:compare
```

Shows:
- Separate tables for mobile and desktop audit history
- Change from previous audit (for each device)
- Overall trend from first to latest audit (for each device)

### View HTML reports
```bash
npm run lighthouse:view          # Opens both mobile & desktop reports
npm run lighthouse:view:mobile   # Opens only mobile report
npm run lighthouse:view:desktop  # Opens only desktop report
```

Opens the detailed Lighthouse HTML report(s) in your browser with:
- Detailed scores breakdown
- Specific recommendations
- Performance metrics
- Screenshots

## Files

- `audit.sh` - Bash script that orchestrates the audit process
- `scripts/tracker.js` - Saves audit results to history
- `scripts/compare.js` - Compares audit results over time
- `scripts/view-latest.sh` - Opens the most recent HTML report(s)
- `history.json` - JSON file storing all audit results (tracked in git)
- `reports/mobile/` - Mobile reports (ignored in git)
- `reports/desktop/` - Desktop reports (ignored in git)
- `.latest-mobile-report` - Pointer to most recent mobile report (ignored in git)
- `.latest-desktop-report` - Pointer to most recent desktop report (ignored in git)

## Tracking Over Time

Run `npm run lighthouse:audit` regularly (weekly, monthly, etc.) to track your app's performance over time.

**Each audit creates:**
- Timestamped mobile HTML and JSON reports in `reports/mobile/` (e.g., `report_2026-01-07_11-43.report.html`)
- Timestamped desktop HTML and JSON reports in `reports/desktop/`
- Two entries in `history.json` - one for mobile, one for desktop
- Updated pointers to the newest reports

Example workflow:
```bash
# Week 1: Initial audit
npm run lighthouse:audit

# Week 2: After some optimizations
npm run lighthouse:audit
npm run lighthouse:compare  # See the improvements!

# View detailed reports anytime
npm run lighthouse:view
```

## What's Tracked

### Scores (0-100)
- Performance
- Accessibility
- Best Practices
- SEO

### Key Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)
- Speed Index

## Why Mobile vs Desktop?

Mobile and desktop have different:
- **Viewport sizes** - Mobile uses smaller screens
- **Network speeds** - Mobile typically has slower connections
- **CPU power** - Mobile devices are less powerful
- **User expectations** - Mobile users expect fast, responsive experiences

Your app should perform well on both! Desktop scores are typically higher than mobile scores.
