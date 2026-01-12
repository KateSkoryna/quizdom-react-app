# Lighthouse Tracking

Simple Lighthouse auditing with comprehensive reports showing scores, issues, and recommendations for both mobile and desktop.

## Quick Start

### Run an audit
```bash
npm run lighthouse:audit
```

**This will:**
1. Build production app
2. Run Lighthouse for **MOBILE**
3. Run Lighthouse for **DESKTOP**
4. Generate human-readable report in terminal (always displayed)
5. Save report to `lighthouse/reports/report_YYYY-MM-DD.txt`
6. Save scores to `lighthouse/history.json`

**Smart report management:**
- ✅ Multiple runs per day = 1 report per device (overwrites previous)
- 📁 Reports organized by year/date: `reports/YYYY/MM-DD/`
- 📁 Reports kept for 1 year, auto-deleted after (ignored in git)
- 📊 Terminal always shows full report
- 📊 History.json keeps only latest score per day per device

**Output includes:**
- ✅ Scores comparison (Mobile vs Desktop)
- ⚡ Key performance metrics
- 📁 Problem files with paths
- 💡 Specific recommendations for each issue

### Compare results over time
```bash
npm run lighthouse:compare
```

Shows historical trends and changes from previous audits.

## File Structure

```
lighthouse/
├── README.md
├── history.json              # Tracked scores over time (1 per day per device)
├── reports/                  # Generated reports (ignored in git)
│   └── YYYY/                 # Year folder
│       └── MM-DD/            # Date folder
│           ├── mobile.json   # Raw mobile audit data
│           ├── desktop.json  # Raw desktop audit data
│           └── report.txt    # Human-readable report
└── scripts/
    ├── audit.sh              # Main audit script
    ├── generate-report.js    # Creates readable reports
    ├── tracker.js            # Saves to history (deduplicates same day)
    └── compare.js            # Shows trends
```

## Example Report

```
╔════════════════════════════════════════════════════════════════════╗
║               LIGHTHOUSE AUDIT REPORT                              ║
╚════════════════════════════════════════════════════════════════════╝

📊 SCORES COMPARISON

                        📱 MOBILE    💻 DESKTOP
  ─────────────────────────────────────────────
  Performance            77 🟠        99 🟢
  Accessibility          71 🟠        77 🟠
  Best Practices        100 🟢       100 🟢
  SEO                    82 🟠        82 🟠

═══════════════════════════════════════════════════════════════════════

♿ ACCESSIBILITY ISSUES

  1. Buttons do not have an accessible name [mobile & desktop]
     Buttons must have discernible text that clearly describes...

     📁 Affected files:
        • assets/user-D0hG5wGE.js
        • assets/index-Clsb4kBT.js

     💡 Recommendation:
        Add aria-label to icon-only buttons
```

## What's Tracked

### Scores (0-100)
- 🟢 90-100: Good
- 🟠 50-89: Needs improvement
- 🔴 0-49: Poor

### Categories
- **Performance** - Loading speed and responsiveness
- **Accessibility** - Usability for people with disabilities
- **Best Practices** - Code quality and security
- **SEO** - Search engine optimization

### Metrics
- **FCP** - First Contentful Paint
- **LCP** - Largest Contentful Paint
- **TBT** - Total Blocking Time
- **CLS** - Cumulative Layout Shift
- **Speed Index** - How quickly content is displayed

## Workflow

```bash
# Week 1: Initial audit
npm run lighthouse:audit
# Check the report in terminal

# Fix issues based on recommendations

# Week 2: Re-audit to verify improvements
npm run lighthouse:audit
npm run lighthouse:compare  # See the improvements!
```

## Report Management

**Reports are kept for 1 year:**
- Small file size (~1MB per day = ~365MB per year)
- Git ignores them (won't bloat repository)
- Useful for monthly/yearly comparisons
- Auto-deleted after 365 days

**Manual cleanup (if needed):**
```bash
# Delete reports older than 90 days
find lighthouse/reports -type f -mtime +90 -delete
find lighthouse/reports -type d -empty -delete

# Delete specific year
rm -rf lighthouse/reports/2025

# Keep only last 3 months
find lighthouse/reports -type f -mtime +90 -delete && find lighthouse/reports -type d -empty -delete
```

**Note:** `history.json` keeps only the LATEST score per day per device (deduplicates automatically).

## Tips

- Run audits regularly (weekly/monthly) to track progress
- Fix accessibility issues first (impacts real users)
- Desktop scores are usually higher than mobile
- Focus on issues marked 🔴 (red) first
- Each report shows specific file paths to fix
- Check `lighthouse/reports/2026/01-08/report.txt` to review past audits
- Reports organized by year/date for easy browsing
