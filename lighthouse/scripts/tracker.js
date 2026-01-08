/**
 * Lighthouse Tracker
 * Saves mobile and desktop audit results to history
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HISTORY_FILE = join(__dirname, '../history.json');
const [mobileJsonPath, desktopJsonPath] = process.argv.slice(2);

if (!mobileJsonPath || !desktopJsonPath) {
  console.error('❌ Usage: node tracker.js <mobile.json> <desktop.json>');
  process.exit(1);
}

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

// Process reports
const mobileEntry = extractData(mobileJsonPath, 'mobile');
const desktopEntry = extractData(desktopJsonPath, 'desktop');

if (mobileEntry) history.push(mobileEntry);
if (desktopEntry) history.push(desktopEntry);

// Save updated history
fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

console.log('💾 Results saved to lighthouse/history.json');
