/**
 * Generate human-readable Lighthouse report
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LIGHTHOUSE_JSON = process.argv[2];

if (!LIGHTHOUSE_JSON || !fs.existsSync(LIGHTHOUSE_JSON)) {
  console.error('❌ Lighthouse JSON file not found');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(LIGHTHOUSE_JSON, 'utf8'));
const timestamp = new Date().toLocaleString();
const device = report.configSettings.formFactor || 'unknown';

// Extract data
const scores = {
  performance: Math.round(report.categories.performance.score * 100),
  accessibility: Math.round(report.categories.accessibility.score * 100),
  bestPractices: Math.round(report.categories['best-practices'].score * 100),
  seo: Math.round(report.categories.seo.score * 100),
};

const metrics = {
  fcp: report.audits['first-contentful-paint'].displayValue,
  lcp: report.audits['largest-contentful-paint'].displayValue,
  tbt: report.audits['total-blocking-time'].displayValue,
  cls: report.audits['cumulative-layout-shift'].displayValue,
  speedIndex: report.audits['speed-index'].displayValue,
};

// Get failing audits with recommendations
const failingAudits = Object.entries(report.audits)
  .filter(([_, audit]) => audit.score !== null && audit.score < 1 && audit.title)
  .map(([id, audit]) => ({
    category: getCategoryForAudit(id, report),
    title: audit.title,
    description: audit.description,
    score: audit.score,
  }))
  .filter(audit => audit.category);

// Group by category
const issuesByCategory = {
  performance: [],
  accessibility: [],
  bestPractices: [],
  seo: [],
};

failingAudits.forEach(audit => {
  if (issuesByCategory[audit.category]) {
    issuesByCategory[audit.category].push(audit);
  }
});

// Generate report
let output = `
╔════════════════════════════════════════════════════════════════════╗
║                    LIGHTHOUSE AUDIT REPORT                         ║
╚════════════════════════════════════════════════════════════════════╝

📅 Date: ${timestamp}
📱 Device: ${device.toUpperCase()}

═══════════════════════════════════════════════════════════════════════

📊 SCORES

  Performance:     ${scores.performance}/100  ${getScoreEmoji(scores.performance)}
  Accessibility:   ${scores.accessibility}/100  ${getScoreEmoji(scores.accessibility)}
  Best Practices:  ${scores.bestPractices}/100  ${getScoreEmoji(scores.bestPractices)}
  SEO:             ${scores.seo}/100  ${getScoreEmoji(scores.seo)}

═══════════════════════════════════════════════════════════════════════

⚡ KEY METRICS

  First Contentful Paint:   ${metrics.fcp}
  Largest Contentful Paint: ${metrics.lcp}
  Total Blocking Time:      ${metrics.tbt}
  Cumulative Layout Shift:  ${metrics.cls}
  Speed Index:              ${metrics.speedIndex}

═══════════════════════════════════════════════════════════════════════
`;

// Add issues and recommendations
const categories = [
  { key: 'performance', name: '⚡ PERFORMANCE', score: scores.performance },
  { key: 'accessibility', name: '♿ ACCESSIBILITY', score: scores.accessibility },
  { key: 'bestPractices', name: '✅ BEST PRACTICES', score: scores.bestPractices },
  { key: 'seo', name: '🔍 SEO', score: scores.seo },
];

categories.forEach(({ key, name, score }) => {
  const issues = issuesByCategory[key];

  if (issues.length > 0) {
    output += `\n${name} ISSUES (${issues.length} found)\n\n`;
    issues.forEach((issue, idx) => {
      output += `  ${idx + 1}. ${issue.title}\n`;
      output += `     ${issue.description}\n\n`;
    });
    output += `═══════════════════════════════════════════════════════════════════════\n`;
  } else if (score === 100) {
    output += `\n${name}\n\n  ✅ Perfect score! No issues found.\n\n`;
    output += `═══════════════════════════════════════════════════════════════════════\n`;
  }
});

output += `\n📄 Full HTML report: lighthouse-report.html\n\n`;

console.log(output);

// Helper functions
function getScoreEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟠';
  return '🔴';
}

function getCategoryForAudit(auditId, report) {
  for (const [catKey, category] of Object.entries(report.categories)) {
    if (category.auditRefs.some(ref => ref.id === auditId)) {
      const keyMap = {
        'performance': 'performance',
        'accessibility': 'accessibility',
        'best-practices': 'bestPractices',
        'seo': 'seo',
      };
      return keyMap[catKey];
    }
  }
  return null;
}
