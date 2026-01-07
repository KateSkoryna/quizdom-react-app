/**
 * Lighthouse Tracker
 * Saves Lighthouse audit results to history file
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HISTORY_FILE = join(__dirname, '../history.json');
const LATEST_MOBILE_REPORT = join(__dirname, '../.latest-mobile-report');
const LATEST_DESKTOP_REPORT = join(__dirname, '../.latest-desktop-report');

// Function to extract data from a report
function extractData(reportPath, device) {
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ No ${device} report found at:`, reportPath);
    return null;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

  return {
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    device: device,
    scores: {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories['best-practices'].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
    },
    metrics: {
      fcp: report.audits['first-contentful-paint'].displayValue,
      lcp: report.audits['largest-contentful-paint'].displayValue,
      tbt: report.audits['total-blocking-time'].displayValue,
      cls: report.audits['cumulative-layout-shift'].displayValue,
      speedIndex: report.audits['speed-index'].displayValue,
    }
  };
}

// Load existing history or create new
let history = [];
if (fs.existsSync(HISTORY_FILE)) {
  history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
}

// Process mobile report
let mobileEntry = null;
if (fs.existsSync(LATEST_MOBILE_REPORT)) {
  const mobilePath = fs.readFileSync(LATEST_MOBILE_REPORT, 'utf8').trim();
  mobileEntry = extractData(mobilePath, 'mobile');
  if (mobileEntry) {
    history.push(mobileEntry);
  }
}

// Process desktop report
let desktopEntry = null;
if (fs.existsSync(LATEST_DESKTOP_REPORT)) {
  const desktopPath = fs.readFileSync(LATEST_DESKTOP_REPORT, 'utf8').trim();
  desktopEntry = extractData(desktopPath, 'desktop');
  if (desktopEntry) {
    history.push(desktopEntry);
  }
}

// Save updated history
fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

console.log('\n✅ Lighthouse scores saved to history!\n');

if (mobileEntry) {
  console.log('📱 MOBILE Scores:');
  console.log(`   Performance:    ${mobileEntry.scores.performance}/100`);
  console.log(`   Accessibility:  ${mobileEntry.scores.accessibility}/100`);
  console.log(`   Best Practices: ${mobileEntry.scores.bestPractices}/100`);
  console.log(`   SEO:            ${mobileEntry.scores.seo}/100`);
  console.log(`\n   Key Metrics:`);
  console.log(`   FCP: ${mobileEntry.metrics.fcp} | LCP: ${mobileEntry.metrics.lcp} | TBT: ${mobileEntry.metrics.tbt}`);
}

if (desktopEntry) {
  console.log('\n💻 DESKTOP Scores:');
  console.log(`   Performance:    ${desktopEntry.scores.performance}/100`);
  console.log(`   Accessibility:  ${desktopEntry.scores.accessibility}/100`);
  console.log(`   Best Practices: ${desktopEntry.scores.bestPractices}/100`);
  console.log(`   SEO:            ${desktopEntry.scores.seo}/100`);
  console.log(`\n   Key Metrics:`);
  console.log(`   FCP: ${desktopEntry.metrics.fcp} | LCP: ${desktopEntry.metrics.lcp} | TBT: ${desktopEntry.metrics.tbt}`);
}

console.log(`\n📈 Total audits in history: ${history.length}`);
console.log(`📁 History file: lighthouse/history.json\n`);
