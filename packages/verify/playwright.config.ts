import { defineConfig, devices } from '@playwright/test';
import { VERSIONS } from './manifest.ts';

/**
 * The verify harness runs against the local dev servers of all three versions.
 *
 * Run a single version: pnpm --filter v1-editorial dev &
 * Then: pnpm verify (auto-detects which servers are up via baseURL probes)
 *
 * Or: pnpm preview:showcase (builds + serves) and run verify against the
 * served paths.
 */
const FAST_TESTS = ['**/sections.spec.ts', '**/layout.spec.ts', '**/smoke.spec.ts'];
const VISUAL_TESTS = ['**/visual.spec.ts'];
const FULL_TESTS = [
  '**/sections.spec.ts',
  '**/layout.spec.ts',
  '**/a11y.spec.ts',
  '**/smoke.spec.ts',
  '**/visual.spec.ts',
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    },
  },
  snapshotPathTemplate: './snapshots/{testFilePath}/{arg}{ext}',
  projects: [
    {
      name: 'fast',
      testMatch: FAST_TESTS,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'visual',
      testMatch: VISUAL_TESTS,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'full',
      testMatch: FULL_TESTS,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  metadata: {
    versions: VERSIONS.map((v) => `${v.name}:${v.devPort}`).join(', '),
  },
});
