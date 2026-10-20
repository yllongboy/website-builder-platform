import { defineConfig, devices } from '@playwright/test';

const builderUrl = process.env.E2E_BUILDER_URL ?? 'http://127.0.0.1:4200';
const adminUrl = process.env.E2E_ADMIN_URL ?? 'http://127.0.0.1:4201';
const ci = Boolean(process.env.CI);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: ci ? 1 : 0,
  reporter: ci ? [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]] : 'list',
  outputDir: 'test-results',
  use: {
    ...devices['Desktop Chrome'],
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'corepack pnpm exec nx serve builder-app --host 127.0.0.1',
      url: builderUrl,
      reuseExistingServer: !ci,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'corepack pnpm exec nx serve admin-app --host 127.0.0.1',
      url: adminUrl,
      reuseExistingServer: !ci,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
