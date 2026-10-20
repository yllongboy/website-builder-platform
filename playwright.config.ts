import { defineConfig, devices } from '@playwright/test';

if (process.env.E2E_USE_DISPOSABLE_ENV !== 'true') {
  throw new Error(
    'Set E2E_USE_DISPOSABLE_ENV=true only after starting the isolated E2E database. The suite will start the guarded E2E API profile and its own frontend servers.',
  );
}

const builderUrl = 'http://127.0.0.1:4200';
const adminUrl = 'http://127.0.0.1:4201';
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
      command: 'SPRING_PROFILES_ACTIVE=e2e mvn -f services/pom.xml spring-boot:run -Dspring-boot.run.profiles=e2e',
      url: 'http://127.0.0.1:8081/api/templates',
      reuseExistingServer: false,
      timeout: 180_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'E2E_API_TARGET=http://127.0.0.1:8081 corepack pnpm exec nx serve builder-app --configuration=e2e --host 127.0.0.1 --port 4200',
      url: builderUrl,
      reuseExistingServer: false,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'E2E_API_TARGET=http://127.0.0.1:8081 corepack pnpm exec nx serve admin-app --configuration=e2e --host 127.0.0.1 --port 4201',
      url: adminUrl,
      reuseExistingServer: false,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
