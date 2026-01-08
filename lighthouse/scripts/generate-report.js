/**
 * Generate comprehensive Lighthouse report for mobile and desktop
 */

import fs from 'fs';

const [mobileJsonPath, desktopJsonPath] = process.argv.slice(2);

if (!mobileJsonPath || !desktopJsonPath) {
  console.error('❌ Usage: node generate-report.js <mobile.json> <desktop.json>');
  process.exit(1);
}

const mobile = JSON.parse(fs.readFileSync(mobileJsonPath, 'utf8'));
const desktop = JSON.parse(fs.readFileSync(desktopJsonPath, 'utf8'));

const timestamp = new Date().toLocaleString();

// Extract scores
const getScores = (report) => ({
  performance: Math.round(report.categories.performance.score * 100),
  accessibility: Math.round(report.categories.accessibility.score * 100),
  bestPractices: Math.round(report.categories['best-practices'].score * 100),
  seo: Math.round(report.categories.seo.score * 100),
});

const mobileScores = getScores(mobile);
const desktopScores = getScores(desktop);

// Get metrics
const getMetrics = (report) => ({
  fcp: report.audits['first-contentful-paint'].displayValue,
  lcp: report.audits['largest-contentful-paint'].displayValue,
  tbt: report.audits['total-blocking-time'].displayValue,
  cls: report.audits['cumulative-layout-shift'].displayValue,
  speedIndex: report.audits['speed-index'].displayValue,
});

const mobileMetrics = getMetrics(mobile);
const desktopMetrics = getMetrics(desktop);

// Get failing audits with file paths
const getIssues = (report) => {
  const issues = {
    performance: [],
    accessibility: [],
    bestPractices: [],
    seo: [],
  };

  Object.entries(report.audits).forEach(([id, audit]) => {
    if (audit.score !== null && audit.score < 1 && audit.title) {
      const category = getCategoryForAudit(id, report);
      if (category && issues[category]) {
        const issue = {
          title: audit.title,
          description: audit.description,
          score: Math.round((audit.score || 0) * 100),
          items: [],
          elements: [],
        };

        // Extract element details from audit
        if (audit.details?.items) {
          audit.details.items.forEach(item => {
            // Add file URLs
            if (item.url) {
              const cleanUrl = item.url.replace('http://localhost:4173/quizdom-react-app/', '');
              if (cleanUrl && !cleanUrl.startsWith('http') && !issue.items.includes(cleanUrl)) {
                issue.items.push(cleanUrl);
              }
            }
            if (item.source?.url) {
              const cleanUrl = item.source.url.replace('http://localhost:4173/quizdom-react-app/', '');
              if (cleanUrl && !cleanUrl.startsWith('http') && !issue.items.includes(cleanUrl)) {
                issue.items.push(cleanUrl);
              }
            }

            // Add element details (selector, snippet, explanation)
            if (item.node) {
              const element = {
                selector: item.node.selector || '',
                snippet: item.node.snippet || '',
                nodeLabel: item.node.nodeLabel || '',
                explanation: item.node.explanation || '',
              };
              issue.elements.push(element);
            }
          });
        }

        issues[category].push(issue);
      }
    }
  });

  return issues;
};

const mobileIssues = getIssues(mobile);
const desktopIssues = getIssues(desktop);

// Generate report
let output = `
╔════════════════════════════════════════════════════════════════════╗
║               LIGHTHOUSE AUDIT REPORT                              ║
╚════════════════════════════════════════════════════════════════════╝

📅 ${timestamp}

═══════════════════════════════════════════════════════════════════════

📊 SCORES COMPARISON

                        📱 MOBILE    💻 DESKTOP
  ─────────────────────────────────────────────
  Performance           ${pad(mobileScores.performance)}${emoji(mobileScores.performance)}       ${pad(desktopScores.performance)}${emoji(desktopScores.performance)}
  Accessibility         ${pad(mobileScores.accessibility)}${emoji(mobileScores.accessibility)}       ${pad(desktopScores.accessibility)}${emoji(desktopScores.accessibility)}
  Best Practices        ${pad(mobileScores.bestPractices)}${emoji(mobileScores.bestPractices)}       ${pad(desktopScores.bestPractices)}${emoji(desktopScores.bestPractices)}
  SEO                   ${pad(mobileScores.seo)}${emoji(mobileScores.seo)}       ${pad(desktopScores.seo)}${emoji(desktopScores.seo)}

═══════════════════════════════════════════════════════════════════════

⚡ KEY METRICS

  📱 MOBILE:
    First Contentful Paint:   ${mobileMetrics.fcp}
    Largest Contentful Paint: ${mobileMetrics.lcp}
    Total Blocking Time:      ${mobileMetrics.tbt}
    Cumulative Layout Shift:  ${mobileMetrics.cls}
    Speed Index:              ${mobileMetrics.speedIndex}

  💻 DESKTOP:
    First Contentful Paint:   ${desktopMetrics.fcp}
    Largest Contentful Paint: ${desktopMetrics.lcp}
    Total Blocking Time:      ${desktopMetrics.tbt}
    Cumulative Layout Shift:  ${desktopMetrics.cls}
    Speed Index:              ${desktopMetrics.speedIndex}

═══════════════════════════════════════════════════════════════════════
`;

// Add issues section
const categories = [
  { key: 'accessibility', name: '♿ ACCESSIBILITY', mScore: mobileScores.accessibility, dScore: desktopScores.accessibility },
  { key: 'performance', name: '⚡ PERFORMANCE', mScore: mobileScores.performance, dScore: desktopScores.performance },
  { key: 'bestPractices', name: '✅ BEST PRACTICES', mScore: mobileScores.bestPractices, dScore: desktopScores.bestPractices },
  { key: 'seo', name: '🔍 SEO', mScore: mobileScores.seo, dScore: desktopScores.seo },
];

categories.forEach(({ key, name, mScore, dScore }) => {
  const mIssues = mobileIssues[key] || [];
  const dIssues = desktopIssues[key] || [];

  if (mScore === 100 && dScore === 100) {
    output += `\n${name}\n\n  ✅ Perfect scores on both mobile and desktop!\n\n`;
    output += `═══════════════════════════════════════════════════════════════════════\n`;
    return;
  }

  if (mIssues.length === 0 && dIssues.length === 0) return;

  output += `\n${name} ISSUES\n\n`;

  // Combine and deduplicate issues
  const allIssues = new Map();

  mIssues.forEach(issue => {
    allIssues.set(issue.title, { ...issue, devices: ['mobile'] });
  });

  dIssues.forEach(issue => {
    if (allIssues.has(issue.title)) {
      allIssues.get(issue.title).devices.push('desktop');
      // Merge items
      issue.items.forEach(item => {
        if (!allIssues.get(issue.title).items.includes(item)) {
          allIssues.get(issue.title).items.push(item);
        }
      });
      // Merge elements
      issue.elements?.forEach(element => {
        const exists = allIssues.get(issue.title).elements?.some(
          el => el.selector === element.selector
        );
        if (!exists) {
          allIssues.get(issue.title).elements.push(element);
        }
      });
    } else {
      allIssues.set(issue.title, { ...issue, devices: ['desktop'] });
    }
  });

  let issueNum = 1;
  allIssues.forEach((issue, title) => {
    const deviceStr = issue.devices.join(' & ');
    output += `  ${issueNum}. ${title} [${deviceStr}]\n`;
    output += `     ${issue.description}\n\n`;

    if (issue.items.length > 0) {
      output += `     📁 Affected files:\n`;
      issue.items.slice(0, 5).forEach(item => {
        output += `        • ${item}\n`;
      });
      if (issue.items.length > 5) {
        output += `        ... and ${issue.items.length - 5} more\n`;
      }
      output += `\n`;
    }

    // Show element details if available
    if (issue.elements && issue.elements.length > 0) {
      output += `     🎯 Elements with issues:\n`;
      issue.elements.slice(0, 3).forEach((el, idx) => {
        if (el.selector) {
          output += `\n        Element ${idx + 1}:\n`;
          output += `        Selector: ${el.selector}\n`;
          if (el.nodeLabel) {
            output += `        Label: "${el.nodeLabel}"\n`;
          }
          if (el.snippet) {
            const shortSnippet = el.snippet.length > 100
              ? el.snippet.substring(0, 100) + '...'
              : el.snippet;
            output += `        HTML: ${shortSnippet}\n`;
          }
          if (el.explanation) {
            output += `        Issue: ${el.explanation}\n`;
          }
        }
      });
      if (issue.elements.length > 3) {
        output += `\n        ... and ${issue.elements.length - 3} more elements\n`;
      }
      output += `\n`;
    }

    output += `     💡 Recommendation:\n`;
    output += `        ${getRecommendation(title)}\n\n`;

    issueNum++;
  });

  output += `═══════════════════════════════════════════════════════════════════════\n`;
});

output += `\n✅ Audit complete!\n\n`;

console.log(output);

// Helper functions
function emoji(score) {
  if (score >= 90) return ' 🟢';
  if (score >= 50) return ' 🟠';
  return ' 🔴';
}

function pad(num) {
  return String(num).padStart(3);
}

function getCategoryForAudit(auditId, report) {
  const keyMap = {
    'performance': 'performance',
    'accessibility': 'accessibility',
    'best-practices': 'bestPractices',
    'seo': 'seo',
  };

  for (const [catKey, category] of Object.entries(report.categories)) {
    if (category.auditRefs.some(ref => ref.id === auditId)) {
      return keyMap[catKey];
    }
  }
  return null;
}

function getRecommendation(title) {
  const recommendations = {
    'Image elements do not have [alt] attributes': 'Add descriptive alt text to all images for screen readers',
    'Buttons do not have an accessible name': 'Add aria-label to icon-only buttons',
    'Links do not have a discernible name': 'Ensure all links have descriptive text or aria-label',
    'Form elements do not have associated labels': 'Add <label> elements or aria-label to all form inputs',
    '`[aria-*]` attributes do not have valid values': 'Fix invalid ARIA attribute values. Common issues: aria-controls referencing non-existent IDs, invalid aria-valuenow values. Verify all aria-* attributes reference valid IDs or use correct value types.',
    'ARIA progressbar elements do not have accessible names': 'Add aria-label to progressbar elements to describe what progress is being shown',
    'Background and foreground colors do not have sufficient contrast': 'Increase color contrast to meet WCAG AA standards (4.5:1 ratio)',
    'Reduce unused JavaScript': 'Use code splitting and tree shaking to remove unused code',
    'Reduce unused CSS': 'Remove unused CSS rules or use tools like PurgeCSS',
    'Serve images in next-gen formats': 'Convert images to WebP or AVIF format for better compression',
    'Properly size images': 'Resize images to match display size to reduce file size',
    'Eliminate render-blocking resources': 'Defer non-critical CSS/JS or inline critical styles',
    'Minimize main-thread work': 'Optimize JavaScript execution and reduce long tasks',
    'Document does not have a meta description': 'Add a meta description tag for better SEO',
  };

  return recommendations[title] || 'Review Lighthouse documentation for specific guidance';
}
