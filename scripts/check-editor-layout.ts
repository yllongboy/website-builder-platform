/// <reference lib="dom" />

import { chromium } from 'playwright';
import type { ConsoleMessage, Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:4200';
const API_URL = 'http://localhost:8080/api';
const EMAIL = 'admin@example.com';
const PASSWORD = 'password';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'scripts', 'screenshots');
const FULL_PAGE_SHOT = path.join(SCREENSHOT_DIR, 'editor-layout-v5.png');
const CANVAS_SHOT = path.join(SCREENSHOT_DIR, 'editor-canvas-v5.png');
const APP_FALLBACK_SHOT = path.join(SCREENSHOT_DIR, 'app-unreachable.png');

type EditorMetrics = {
  grapesEditorFound: boolean;
  grapesFrameFound: boolean;
  grapesCanvasFound: boolean;
  grapesEditorCanvasFound: boolean;
  grapesEditorExists: boolean;
  grapesEditorClientHeight: number;
  grapesHostClientHeight: number;
  grapesCanvasFramesClientHeight: number;
  grapesFrameWrapperClientHeight: number;
  iframeClientHeight: number;
  grapesEditorCanvasClientHeight: number;
  viewportHeight: number;
};

type RunSummary = {
  appReachable: boolean;
  loginSucceeded: boolean;
  accessTokenPresent: boolean;
  websiteId: string | null;
  websiteCreated: boolean;
  websiteReused: boolean;
  currentUrl: string;
  grapesFrameFound: boolean;
  grapesCanvasFound: boolean;
  grapesEditorExists: boolean;
  grapesEditorClientHeight: number;
  appGrapesEditorClientHeight: number;
  grapesCanvasFramesClientHeight: number;
  grapesFrameWrapperClientHeight: number;
  iframeGjsFrameClientHeight: number;
  grapesEditorCanvasClientHeight: number;
  viewportHeight: number;
  screenshots: string[];
  consoleErrors: string[];
  pageErrors: string[];
};

function ensureScreenshotDir(): void {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function formatConsoleMessage(msg: ConsoleMessage): string {
  const location = msg.location();
  const locationText = location.url
    ? `${location.url}:${location.lineNumber}:${location.columnNumber}`
    : 'unknown-location';
  return `[console.${msg.type()}] ${msg.text()} @ ${locationText}`;
}

async function isOnLoginPage(page: Page): Promise<boolean> {
  const url = page.url();
  if (url.includes('/login')) {
    return true;
  }

  const hasLoginForm = await page
    .locator('form')
    .filter({ has: page.locator('#email') })
    .filter({ has: page.locator('#password') })
    .first()
    .isVisible()
    .catch(() => false);

  return hasLoginForm;
}

async function loginViaApi(page: Page): Promise<string | null> {
  return page.evaluate(async ({ apiUrl, email, password }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { accessToken?: string };
      return typeof data.accessToken === 'string' && data.accessToken.trim().length > 0
        ? data.accessToken
        : null;
    } catch {
      return null;
    }
  }, { apiUrl: API_URL, email: EMAIL, password: PASSWORD });
}

async function setAccessTokenInBrowser(page: Page, accessToken: string): Promise<void> {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.evaluate((token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('accessToken', token);
  }, accessToken);
}

async function getFirstTemplateId(page: Page, accessToken: string): Promise<string | null> {
  return page.evaluate(async ({ apiUrl, token }) => {
    const endpoints = [`${apiUrl}/templates`, `${apiUrl}/templates?page=0&size=10`];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          continue;
        }

        const data = (await response.json()) as
          | Array<{ id?: string }>
          | { content?: Array<{ id?: string }>; items?: Array<{ id?: string }> };

        if (Array.isArray(data)) {
          const found = data.find((item) => typeof item.id === 'string' && item.id.trim().length > 0)?.id;
          if (found) {
            return found;
          }
          continue;
        }

        const list = Array.isArray(data.content)
          ? data.content
          : Array.isArray(data.items)
            ? data.items
            : [];
        const found = list.find((item) => typeof item.id === 'string' && item.id.trim().length > 0)?.id;
        if (found) {
          return found;
        }
      } catch {
        continue;
      }
    }

    return null;
  }, { apiUrl: API_URL, token: accessToken });
}

async function getExistingWebsiteId(page: Page, accessToken: string): Promise<string | null> {
  return page.evaluate(async ({ apiUrl, token }) => {
    try {
      const response = await fetch(`${apiUrl}/websites/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as Array<{ id?: string }>;

      if (!Array.isArray(data)) {
        return null;
      }

      const existing = data.find((item) => typeof item.id === 'string' && item.id.trim().length > 0);
      return existing?.id ?? null;
    } catch {
      return null;
    }
  }, { apiUrl: API_URL, token: accessToken });
}

async function createWebsiteFromTemplate(page: Page, accessToken: string, templateId: string): Promise<string | null> {
  return page.evaluate(async ({ apiUrl, token, templateId: id }) => {
    try {
      const response = await fetch(`${apiUrl}/websites/from-template/${encodeURIComponent(id)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: 'Layout Test Site' }),
      });

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { id?: string; websiteId?: string };
      const websiteId = typeof data.id === 'string' && data.id.trim().length > 0
        ? data.id
        : typeof data.websiteId === 'string' && data.websiteId.trim().length > 0
          ? data.websiteId
          : null;

      return websiteId;
    } catch {
      return null;
    }
  }, { apiUrl: API_URL, token: accessToken, templateId });
}

async function ensureAuthenticated(page: Page): Promise<{ succeeded: boolean; accessToken: string | null }> {
  const accessToken = await loginViaApi(page);

  if (!accessToken) {
    return { succeeded: false, accessToken: null };
  }

  await setAccessTokenInBrowser(page, accessToken);
  await page.goto(`${BASE_URL}/websites`, { waitUntil: 'domcontentloaded', timeout: 15000 });

  const onLogin = await isOnLoginPage(page);
  return { succeeded: !onLogin, accessToken };
}

async function getEditorMetrics(page: Page): Promise<EditorMetrics> {
  return page.evaluate(() => {
    const editorEl = document.querySelector('.gjs-editor') as HTMLElement | null;
    const grapesHostEl = document.querySelector('app-grapes-editor') as HTMLElement | null;
    const framesEl = document.querySelector('.gjs-cv-canvas__frames') as HTMLElement | null;
    const frameWrapperEl = document.querySelector('.gjs-frame-wrapper') as HTMLElement | null;
    const iframeEl = document.querySelector('iframe.gjs-frame') as HTMLIFrameElement | null;
    const canvasEl = document.querySelector('.gjs-cv-canvas') as HTMLElement | null;
    const editorCanvasEl = document.querySelector('.gjs-editor-canvas') as HTMLElement | null;

    return {
      grapesEditorFound: !!editorEl,
      grapesFrameFound: !!iframeEl,
      grapesCanvasFound: !!canvasEl,
      grapesEditorCanvasFound: !!editorCanvasEl,
      grapesEditorExists: !!editorEl,
      grapesEditorClientHeight: editorEl?.clientHeight ?? 0,
      grapesHostClientHeight: grapesHostEl?.clientHeight ?? 0,
      grapesCanvasFramesClientHeight: framesEl?.clientHeight ?? 0,
      grapesFrameWrapperClientHeight: frameWrapperEl?.clientHeight ?? 0,
      iframeClientHeight: iframeEl?.clientHeight ?? 0,
      grapesEditorCanvasClientHeight: editorCanvasEl?.clientHeight ?? 0,
      viewportHeight: window.innerHeight,
    };
  });
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

  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(formatConsoleMessage(msg));
    }
  });

  page.on('pageerror', (error) => {
    pageErrors.push(`[pageerror] ${error.message}`);
  });

  const summary: RunSummary = {
    appReachable: false,
    loginSucceeded: false,
    accessTokenPresent: false,
    websiteId: null,
    websiteCreated: false,
    websiteReused: false,
    currentUrl: '',
    grapesFrameFound: false,
    grapesCanvasFound: false,
    grapesEditorExists: false,
    grapesEditorClientHeight: 0,
    appGrapesEditorClientHeight: 0,
    grapesCanvasFramesClientHeight: 0,
    grapesFrameWrapperClientHeight: 0,
    iframeGjsFrameClientHeight: 0,
    grapesEditorCanvasClientHeight: 0,
    viewportHeight: 0,
    screenshots: [],
    consoleErrors,
    pageErrors,
  };

  try {
    try {
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
      summary.appReachable = true;
    } catch (error) {
      summary.appReachable = false;
      await page.screenshot({ path: APP_FALLBACK_SHOT, fullPage: true });
      summary.screenshots.push(APP_FALLBACK_SHOT);
      summary.currentUrl = page.url();
      console.log(JSON.stringify(summary, null, 2));
      return;
    }

    const authResult = await ensureAuthenticated(page);
    summary.loginSucceeded = authResult.succeeded;
    summary.accessTokenPresent = !!authResult.accessToken;

    if (!authResult.succeeded || !authResult.accessToken) {
      summary.currentUrl = page.url();
      await page.screenshot({ path: FULL_PAGE_SHOT, fullPage: true });
      summary.screenshots.push(FULL_PAGE_SHOT);
      console.log(JSON.stringify(summary, null, 2));
      return;
    }

    const existingWebsiteId = await getExistingWebsiteId(page, authResult.accessToken);

    let websiteId = existingWebsiteId;
    if (!websiteId) {
      const templateId = await getFirstTemplateId(page, authResult.accessToken);
      websiteId = templateId
        ? await createWebsiteFromTemplate(page, authResult.accessToken, templateId)
        : null;
    }

    summary.websiteId = websiteId;
    summary.websiteCreated = !existingWebsiteId && !!websiteId;
    summary.websiteReused = !!existingWebsiteId;

    if (!websiteId) {
      summary.currentUrl = page.url();
      await page.screenshot({ path: FULL_PAGE_SHOT, fullPage: true });
      summary.screenshots.push(FULL_PAGE_SHOT);
      console.log(JSON.stringify(summary, null, 2));
      return;
    }

    await page.goto(`${BASE_URL}/editor/${encodeURIComponent(websiteId)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });

    await page.waitForTimeout(10000);

    const selectorChecks = await Promise.all([
      page.waitForSelector('.gjs-editor', { timeout: 25000 }).then(() => true).catch(() => false),
      page.waitForSelector('iframe.gjs-frame', { timeout: 25000 }).then(() => true).catch(() => false),
      page.waitForSelector('.gjs-cv-canvas', { timeout: 25000 }).then(() => true).catch(() => false),
    ]);

    await page.waitForTimeout(1500);

    const metrics = await getEditorMetrics(page);
    summary.grapesEditorExists = metrics.grapesEditorExists && selectorChecks[0];
    summary.grapesFrameFound = metrics.grapesFrameFound && selectorChecks[1];
    summary.grapesCanvasFound = metrics.grapesCanvasFound && selectorChecks[2];
    summary.grapesEditorClientHeight = metrics.grapesEditorClientHeight;
    summary.appGrapesEditorClientHeight = metrics.grapesHostClientHeight;
    summary.grapesCanvasFramesClientHeight = metrics.grapesCanvasFramesClientHeight;
    summary.grapesFrameWrapperClientHeight = metrics.grapesFrameWrapperClientHeight;
    summary.iframeGjsFrameClientHeight = metrics.iframeClientHeight;
    summary.grapesEditorCanvasClientHeight = metrics.grapesEditorCanvasClientHeight;
    summary.viewportHeight = metrics.viewportHeight;
    summary.currentUrl = page.url();

    await page.screenshot({ path: FULL_PAGE_SHOT, fullPage: true });
    summary.screenshots.push(FULL_PAGE_SHOT);

    const canvasLocator = page.locator('.gjs-editor-canvas, .gjs-cv-canvas').first();
    if (await canvasLocator.isVisible().catch(() => false)) {
      await canvasLocator.screenshot({ path: CANVAS_SHOT });
      summary.screenshots.push(CANVAS_SHOT);
    }

    console.log(`.gjs-editor exists: ${summary.grapesEditorExists}`);
    console.log(`iframe.gjs-frame exists: ${summary.grapesFrameFound}`);
    console.log(`.gjs-cv-canvas exists: ${summary.grapesCanvasFound}`);
    console.log(`.gjs-editor clientHeight: ${summary.grapesEditorClientHeight}`);
    console.log(`app-grapes-editor clientHeight: ${summary.appGrapesEditorClientHeight}`);
    console.log(`.gjs-cv-canvas__frames clientHeight: ${summary.grapesCanvasFramesClientHeight}`);
    console.log(`.gjs-frame-wrapper clientHeight: ${summary.grapesFrameWrapperClientHeight}`);
    console.log(`iframe.gjs-frame clientHeight: ${summary.iframeGjsFrameClientHeight}`);
    console.log(`.gjs-editor-canvas clientHeight: ${summary.grapesEditorCanvasClientHeight}`);
    console.log(`window.innerHeight: ${summary.viewportHeight}`);
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error('check-editor-layout failed:', error);
  process.exitCode = 1;
});
