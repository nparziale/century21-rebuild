#!/usr/bin/env node
/**
 * Lighthouse gate runner — spawns Lighthouse against each version's pages for
 * both mobile and desktop form factors and reports pass/fail against the
 * per-version perf budgets.
 *
 * Expects dev servers (or preview:showcase) to be running. Falls back to
 * skipping unreachable ports with a visible warning rather than crashing.
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const VERSIONS = [
  { id: 'v1', name: 'v1-editorial', port: 5173, perfMobileMin: 90 },
  { id: 'v2', name: 'v2-kinetic', port: 5174, perfMobileMin: 85 },
  { id: 'v3', name: 'v3-brutalist', port: 5175, perfMobileMin: 90 },
];

const PAGES = [
  { key: 'home', path: '/' },
  { key: 'listing', path: '/propiedad/286194' },
];

const THRESHOLDS = {
  accessibility: 100,
  'best-practices': 95,
  seo: 95,
  performanceDesktopMin: 95,
};

async function isUp(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.ok || r.status === 405; // some dev servers don't like HEAD
  } catch {
    return false;
  }
}

async function runLighthouse(url, formFactor) {
  // Lazy require because lighthouse is a big dep
  const lighthouse = (await import('lighthouse')).default;
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
  const runnerResult = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    formFactor,
    screenEmulation:
      formFactor === 'mobile'
        ? { mobile: true, width: 360, height: 780, deviceScaleFactor: 2, disabled: false }
        : { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
  });
  await chrome.kill();
  return runnerResult.lhr;
}

function cat(score) {
  return Math.round((score ?? 0) * 100);
}

async function main() {
  const failures = [];
  for (const v of VERSIONS) {
    const base = `http://localhost:${v.port}`;
    if (!(await isUp(base))) {
      console.warn(`⚠ ${v.name} not reachable at ${base} — skipping Lighthouse`);
      continue;
    }
    for (const p of PAGES) {
      const url = `${base}${p.path}`;
      for (const ff of ['mobile', 'desktop']) {
        process.stdout.write(`lighthouse: ${v.name} ${p.key} ${ff}... `);
        try {
          const lhr = await runLighthouse(url, ff);
          const perf = cat(lhr.categories.performance.score);
          const a11y = cat(lhr.categories.accessibility.score);
          const bp = cat(lhr.categories['best-practices'].score);
          const seo = cat(lhr.categories.seo.score);
          console.log(`perf ${perf} / a11y ${a11y} / bp ${bp} / seo ${seo}`);
          const perfMin = ff === 'mobile' ? v.perfMobileMin : THRESHOLDS.performanceDesktopMin;
          if (perf < perfMin) failures.push(`${v.name} ${p.key} ${ff}: perf ${perf} < ${perfMin}`);
          if (a11y < THRESHOLDS.accessibility) failures.push(`${v.name} ${p.key} ${ff}: a11y ${a11y} < ${THRESHOLDS.accessibility}`);
          if (bp < THRESHOLDS['best-practices']) failures.push(`${v.name} ${p.key} ${ff}: bp ${bp} < ${THRESHOLDS['best-practices']}`);
          if (seo < THRESHOLDS.seo) failures.push(`${v.name} ${p.key} ${ff}: seo ${seo} < ${THRESHOLDS.seo}`);
        } catch (err) {
          console.log(`error`);
          failures.push(`${v.name} ${p.key} ${ff}: ${err.message}`);
        }
      }
    }
  }
  if (failures.length) {
    console.error('\n❌ Lighthouse gates failed:');
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log('\n✓ Lighthouse gates green');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
