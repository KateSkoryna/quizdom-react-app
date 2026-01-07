/**
 * Lighthouse Compare
 * Compare Lighthouse audit results over time
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HISTORY_FILE = join(__dirname, '../history.json');

if (!fs.existsSync(HISTORY_FILE)) {
  console.log('❌ No history file found. Run "npm run lighthouse:audit" first.');
  process.exit(1);
}

const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));

if (history.length === 0) {
  console.log('❌ No audit data found.');
  process.exit(1);
}

// Separate mobile and desktop audits
const mobileHistory = history.filter(entry => entry.device === 'mobile');
const desktopHistory = history.filter(entry => entry.device === 'desktop');

console.log('\n📊 LIGHTHOUSE AUDIT HISTORY\n');
console.log(`Total audits: ${history.length} (${mobileHistory.length} mobile, ${desktopHistory.length} desktop)`);
console.log(`First audit: ${history[0].date} at ${history[0].time}`);
console.log(`Latest audit: ${history[history.length - 1].date} at ${history[history.length - 1].time}`);

// Show mobile audits
if (mobileHistory.length > 0) {
  console.log('\n📱 MOBILE SCORE HISTORY:\n');
  console.log('Date          Time          Perf  A11y  BP   SEO');
  console.log('─'.repeat(55));

  mobileHistory.forEach(entry => {
    const s = entry.scores;
    console.log(
      `${entry.date.padEnd(14)} ${entry.time.padEnd(12)} ` +
      `${String(s.performance).padStart(3)}   ` +
      `${String(s.accessibility).padStart(3)}   ` +
      `${String(s.bestPractices).padStart(3)}  ` +
      `${String(s.seo).padStart(3)}`
    );
  });
}

// Show desktop audits
if (desktopHistory.length > 0) {
  console.log('\n💻 DESKTOP SCORE HISTORY:\n');
  console.log('Date          Time          Perf  A11y  BP   SEO');
  console.log('─'.repeat(55));

  desktopHistory.forEach(entry => {
    const s = entry.scores;
    console.log(
      `${entry.date.padEnd(14)} ${entry.time.padEnd(12)} ` +
      `${String(s.performance).padStart(3)}   ` +
      `${String(s.accessibility).padStart(3)}   ` +
      `${String(s.bestPractices).padStart(3)}  ` +
      `${String(s.seo).padStart(3)}`
    );
  });
}

const calcChange = (current, prev) => {
  const diff = current - prev;
  if (diff > 0) return `+${diff} ↑`;
  if (diff < 0) return `${diff} ↓`;
  return '0 →';
};

// Show mobile trends
if (mobileHistory.length > 1) {
  const latestMobile = mobileHistory[mobileHistory.length - 1];
  const previousMobile = mobileHistory[mobileHistory.length - 2];
  const firstMobile = mobileHistory[0];

  console.log('\n📊 MOBILE CHANGE FROM PREVIOUS:\n');
  console.log(`   Performance:    ${latestMobile.scores.performance}/100  (${calcChange(latestMobile.scores.performance, previousMobile.scores.performance)})`);
  console.log(`   Accessibility:  ${latestMobile.scores.accessibility}/100  (${calcChange(latestMobile.scores.accessibility, previousMobile.scores.accessibility)})`);
  console.log(`   Best Practices: ${latestMobile.scores.bestPractices}/100  (${calcChange(latestMobile.scores.bestPractices, previousMobile.scores.bestPractices)})`);
  console.log(`   SEO:            ${latestMobile.scores.seo}/100  (${calcChange(latestMobile.scores.seo, previousMobile.scores.seo)})`);

  console.log('\n📈 MOBILE OVERALL TREND (First → Latest):\n');
  console.log(`   Performance:    ${firstMobile.scores.performance} → ${latestMobile.scores.performance}  (${calcChange(latestMobile.scores.performance, firstMobile.scores.performance)})`);
  console.log(`   Accessibility:  ${firstMobile.scores.accessibility} → ${latestMobile.scores.accessibility}  (${calcChange(latestMobile.scores.accessibility, firstMobile.scores.accessibility)})`);
  console.log(`   Best Practices: ${firstMobile.scores.bestPractices} → ${latestMobile.scores.bestPractices}  (${calcChange(latestMobile.scores.bestPractices, firstMobile.scores.bestPractices)})`);
  console.log(`   SEO:            ${firstMobile.scores.seo} → ${latestMobile.scores.seo}  (${calcChange(latestMobile.scores.seo, firstMobile.scores.seo)})`);
}

// Show desktop trends
if (desktopHistory.length > 1) {
  const latestDesktop = desktopHistory[desktopHistory.length - 1];
  const previousDesktop = desktopHistory[desktopHistory.length - 2];
  const firstDesktop = desktopHistory[0];

  console.log('\n📊 DESKTOP CHANGE FROM PREVIOUS:\n');
  console.log(`   Performance:    ${latestDesktop.scores.performance}/100  (${calcChange(latestDesktop.scores.performance, previousDesktop.scores.performance)})`);
  console.log(`   Accessibility:  ${latestDesktop.scores.accessibility}/100  (${calcChange(latestDesktop.scores.accessibility, previousDesktop.scores.accessibility)})`);
  console.log(`   Best Practices: ${latestDesktop.scores.bestPractices}/100  (${calcChange(latestDesktop.scores.bestPractices, previousDesktop.scores.bestPractices)})`);
  console.log(`   SEO:            ${latestDesktop.scores.seo}/100  (${calcChange(latestDesktop.scores.seo, previousDesktop.scores.seo)})`);

  console.log('\n📈 DESKTOP OVERALL TREND (First → Latest):\n');
  console.log(`   Performance:    ${firstDesktop.scores.performance} → ${latestDesktop.scores.performance}  (${calcChange(latestDesktop.scores.performance, firstDesktop.scores.performance)})`);
  console.log(`   Accessibility:  ${firstDesktop.scores.accessibility} → ${latestDesktop.scores.accessibility}  (${calcChange(latestDesktop.scores.accessibility, firstDesktop.scores.accessibility)})`);
  console.log(`   Best Practices: ${firstDesktop.scores.bestPractices} → ${latestDesktop.scores.bestPractices}  (${calcChange(latestDesktop.scores.bestPractices, firstDesktop.scores.bestPractices)})`);
  console.log(`   SEO:            ${firstDesktop.scores.seo} → ${latestDesktop.scores.seo}  (${calcChange(latestDesktop.scores.seo, firstDesktop.scores.seo)})`);
}

console.log('\n');
