/// <reference lib="dom" />

import { chromium } from 'playwright';
import type { Page } from 'playwright';

const BASE_URL = 'http://localhost:4200';
const API_URL = 'http://localhost:8080/api';
const EMAIL = 'admin@example.com';
const PASSWORD = 'password';

type CssSnapshot = {
  selector: string;
  found: boolean;
  tagName: string | null;
  className: string | null;
  computed: {
    height: string | null;
    display: string | null;
    position: string | null;
  };
};

type DomReport = {
  appGrapesEditorStructure: unknown;
  cssSnapshots: CssSnapshot[];
  gjsEditorInlineStyleHeight: string | null;
  gjsEditorHasInlineStyleAttribute: boolean;
  gjsEditorHeights: {
    offsetHeight: number | null;
    clientHeight: number | null;
    scrollHeight: number | null;
  };
};

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
      if (typeof data.accessToken !== 'string' || data.accessToken.trim().length === 0) {
        return null;
      }

      return data.accessToken;
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

async function getFirstWebsiteId(page: Page, accessToken: string): Promise<string | null> {
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
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      const first = data.find((item) => typeof item.id === 'string' && item.id.trim().length > 0);
      return first?.id ?? null;
    } catch {
      return null;
    }
  }, { apiUrl: API_URL, token: accessToken });
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
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
  const browser = await launchBrowser();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();

  try {
    console.log('Step 1/7: Logging in with admin credentials...');
    const accessToken = await loginViaApi(page);
    if (!accessToken) {
      throw new Error('Login failed: no access token returned from /api/auth/login');
    }
    console.log('Login success: access token acquired.');

    await setAccessTokenInBrowser(page, accessToken);

    console.log('Step 2/7: Getting first website from GET /api/websites/my...');
    const websiteId = await getFirstWebsiteId(page, accessToken);
    if (!websiteId) {
      throw new Error('No website found in GET /api/websites/my');
    }
    console.log(`Website selected: ${websiteId}`);

    console.log('Step 3/7: Navigating to editor...');
    await page.goto(`${BASE_URL}/editor/${encodeURIComponent(websiteId)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });

    console.log('Step 4/7: Waiting up to 20s for .gjs-editor...');
    await page.waitForSelector('.gjs-editor', { timeout: 20000 });

    console.log('Step 5/7: Collecting DOM and computed style diagnostics via page.evaluate()...');
    const report = await page.evaluate<DomReport>(() => {
      const normalizeClass = (value: string): string | null => {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
      };

      const summarizeElement = (element: Element, currentDepth: number, maxDepth: number): unknown => {
        const children = currentDepth < maxDepth
          ? Array.from(element.children).map((child) => summarizeElement(child, currentDepth + 1, maxDepth))
          : [];

        return {
          tag: element.tagName.toLowerCase(),
          className: normalizeClass((element as HTMLElement).className ?? ''),
          children,
        };
      };

      const cssSnapshot = (selector: string, element: Element | null): CssSnapshot => {
        if (!element) {
          return {
            selector,
            found: false,
            tagName: null,
            className: null,
            computed: {
              height: null,
              display: null,
              position: null,
            },
          };
        }

        const computed = window.getComputedStyle(element as HTMLElement);
        return {
          selector,
          found: true,
          tagName: element.tagName.toLowerCase(),
          className: normalizeClass((element as HTMLElement).className ?? ''),
          computed: {
            height: computed.height,
            display: computed.display,
            position: computed.position,
          },
        };
      };

      const grapesHost = document.querySelector('app-grapes-editor');
      const grapesContainer = grapesHost?.querySelector('#grapesContainer')
        ?? grapesHost?.firstElementChild
        ?? null;
      const gjsEditor = document.querySelector('.gjs-editor') as HTMLElement | null;
      const gjsEditorCanvas = document.querySelector('.gjs-editor-canvas');
      const gjsFrame = document.querySelector('iframe.gjs-frame');

      const structure = grapesHost
        ? summarizeElement(grapesHost, 0, 2)
        : null;

      return {
        appGrapesEditorStructure: structure,
        cssSnapshots: [
          cssSnapshot('app-grapes-editor', grapesHost),
          cssSnapshot('#grapesContainer (or first child of app-grapes-editor)', grapesContainer),
          cssSnapshot('.gjs-editor', gjsEditor),
          cssSnapshot('.gjs-editor-canvas', gjsEditorCanvas),
          cssSnapshot('iframe.gjs-frame', gjsFrame),
        ],
        gjsEditorInlineStyleHeight: gjsEditor ? gjsEditor.style.height || null : null,
        gjsEditorHasInlineStyleAttribute: !!gjsEditor && gjsEditor.hasAttribute('style'),
        gjsEditorHeights: {
          offsetHeight: gjsEditor ? gjsEditor.offsetHeight : null,
          clientHeight: gjsEditor ? gjsEditor.clientHeight : null,
          scrollHeight: gjsEditor ? gjsEditor.scrollHeight : null,
        },
      };
    });

    console.log('Step 6/7: Printing inspection report...');
    console.log('--- inspect-editor-dom report start ---');
    console.log(JSON.stringify(report, null, 2));
    console.log('--- inspect-editor-dom report end ---');
    console.log('Step 7/7: Complete.');
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error('inspect-editor-dom failed:', formatError(error));
  process.exitCode = 1;
});
