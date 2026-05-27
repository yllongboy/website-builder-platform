/// <reference lib="dom" />

import { chromium } from 'playwright';
import type { Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:4200';
const API_URL = 'http://localhost:8080/api';
const EMAIL = 'admin@example.com';
const PASSWORD = 'password';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'scripts', 'screenshots');
const SAVING_SHOT = path.join(SCREENSHOT_DIR, 'save-state-saving.png');
const SAVED_SHOT = path.join(SCREENSHOT_DIR, 'save-state-saved.png');

function ensureScreenshotDir(): void {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function loginViaApi(page: Page): Promise<string | null> {
  try {
    const response = await page.request.post(`${API_URL}/auth/login`, {
      data: {
        email: EMAIL,
        password: PASSWORD,
      },
    });

    if (!response.ok()) {
      return null;
    }

    const data = (await response.json()) as { accessToken?: string };
    if (typeof data.accessToken !== 'string' || data.accessToken.trim().length === 0) {
      return null;
    }

    return data.accessToken;
  } catch {
    return null;
  }
}

async function setAccessTokenInBrowser(page: Page, accessToken: string): Promise<void> {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.evaluate((token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('accessToken', token);
  }, accessToken);
}

async function getFirstWebsiteId(page: Page, accessToken: string): Promise<string | null> {
  try {
    const response = await page.request.get(`${API_URL}/websites/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok()) {
      return null;
    }

    const data = (await response.json()) as Array<{ id?: string }>;
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const first = data.find((item) => typeof item.id === 'string' && item.id.trim().length > 0);
    return first?.id ?? null;
  } catch {
    return null;
  }
}

async function getToolbarStatusText(page: Page): Promise<string> {
  const statusLocator = page.locator('header div.min-w-0 p.text-xs').first();
  const raw = await statusLocator.textContent({ timeout: 5000 });
  return (raw ?? '').trim();
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (primaryError) {
    console.warn('Primary Chromium launch failed, retrying with msedge channel.');
    console.warn(String(primaryError));
    return chromium.launch({ headless: true, channel: 'msedge' });
  }
}

async function main(): Promise<void> {
  ensureScreenshotDir();

  const browser = await launchBrowser();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();

  try {
    console.log('Step 1/9: Login with admin@example.com / password');
    const accessToken = await loginViaApi(page);
    if (!accessToken) {
      throw new Error('Login failed: no access token returned from /api/auth/login');
    }

    await setAccessTokenInBrowser(page, accessToken);

    console.log('Step 2/9: Get first website from GET /api/websites/my');
    const websiteId = await getFirstWebsiteId(page, accessToken);
    if (!websiteId) {
      throw new Error('No website found in GET /api/websites/my');
    }
    console.log(`Using websiteId: ${websiteId}`);

    console.log('Step 3/9: Navigate to /editor/{websiteId} and wait 10 seconds for GrapesJS');
    await page.goto(`${BASE_URL}/editor/${encodeURIComponent(websiteId)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(10000);

    console.log('Step 4/9: Intercept PUT /api/websites/*/editor and add 2 second delay');
    await page.route('**/api/websites/*/editor', async (route) => {
      if (route.request().method() === 'PUT') {
        await new Promise((r) => setTimeout(r, 2000));
        await route.continue();
      } else {
        await route.continue();
      }
    });

    console.log('Step 5/9: Click toolbar Save button');
    const saveButton = page.getByRole('button', { name: /save/i }).first();
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveButton.click();

    console.log('Step 6/9: Immediately capture Saving state screenshot');
    await page.locator('header div.min-w-0 p.text-xs', { hasText: 'Saving...' }).first().waitFor({ timeout: 2000 });
    const statusDuringSave = await getToolbarStatusText(page);
    await page.screenshot({ path: SAVING_SHOT, fullPage: true });

    console.log('Step 7/9: Wait 3 seconds for save completion');
    await page.waitForTimeout(3000);

    console.log('Step 8/9: Capture Saved state screenshot');
    const statusAfterSave = await getToolbarStatusText(page);
    await page.screenshot({ path: SAVED_SHOT, fullPage: true });

    console.log('Step 9/9: Report toolbar text under website name');
    console.log('--- save-ui-report start ---');
    console.log(`screenshotSaving=${SAVING_SHOT}`);
    console.log(`screenshotSaved=${SAVED_SHOT}`);
    console.log(`toolbarDuringSave=${statusDuringSave}`);
    console.log(`toolbarAfterSave=${statusAfterSave}`);
    console.log('--- save-ui-report end ---');
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  console.error('check-save-ui failed:', message);
  process.exitCode = 1;
});
