import { expect, test } from '@playwright/test';

const builderUrl = 'http://127.0.0.1:4200';
const adminUrl = 'http://127.0.0.1:4201';
const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com';
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'password';

test('SCRUM-137 - register, create a template website, edit and save content, and verify persistence', async ({ page }) => {
  const email = `scrum137-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.test`;
  await page.goto(`${builderUrl}/register`);
  await page.getByLabel('First name (optional)').fill('Browser');
  await page.getByLabel('Last name (optional)').fill('Automation');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password (min 8 characters)').fill('LocalOnly-12345');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByRole('heading', { name: 'My Websites' })).toBeVisible();
  await page.getByRole('button', { name: 'Create Website' }).click();
  await expect(page.getByRole('heading', { name: 'Templates' })).toBeVisible();

  const firstFreeTemplate = page
    .locator('ui-card')
    .filter({ hasNot: page.getByText('Premium', { exact: true }) })
    .first();
  const templateName = (await firstFreeTemplate.getByRole('heading').innerText()).trim();
  await firstFreeTemplate.click();
  await expect(page.getByRole('heading', { name: templateName })).toBeVisible();
  await page.getByRole('button', { name: 'Use This Template' }).click();

  await expect(page.getByRole('heading', { name: 'My Websites' })).toBeVisible();
  const website = page.locator('ui-card').filter({ hasText: templateName }).first();
  await expect(website).toBeVisible();
  await website.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();

  const canvas = page.frameLocator('iframe.gjs-frame');
  const paragraph = canvas.locator('body p').first();
  await expect(paragraph).toBeVisible();
  await paragraph.dblclick();
  const editableText = canvas.locator('[contenteditable="true"]').first();
  const savedText = `SCRUM-137 browser edit ${Date.now()}`;
  await editableText.fill(savedText);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByText(/^Saved /)).toBeVisible();

  const editorUrl = page.url();
  await page.reload();
  await expect(page).toHaveURL(editorUrl);
  await expect(canvas.locator('body')).toContainText(savedText);
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('heading', { name: 'My Websites' })).toBeVisible();

  const websiteAfterEdit = page.locator('ui-card').filter({ hasText: templateName }).first();
  await websiteAfterEdit.getByRole('button', { name: 'Rename' }).click();
  const renamed = `SCRUM-137 ${templateName} ${Date.now()}`;
  await websiteAfterEdit.getByRole('textbox').fill(renamed);
  await websiteAfterEdit.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('heading', { name: renamed })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: renamed })).toBeVisible();
});

test('SCRUM-137 - admin dashboard loads metrics and a saved setting survives reload', async ({ page }) => {
  await page.goto(`${adminUrl}/login`);
  await page.getByLabel('Email').fill(adminEmail);
  await page.getByLabel('Password').fill(adminPassword);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  const totalUsersLabel = page.getByText('Total Users', { exact: true });
  await expect(totalUsersLabel).toBeVisible();
  const totalUsersValue = totalUsersLabel.locator('xpath=..').getByText(/^\d+$/);
  await expect(totalUsersValue).toBeVisible();

  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
  const siteName = page.getByLabel('Site Name');
  const originalSiteName = await siteName.inputValue();
  const updatedSiteName = `SCRUM-137 E2E ${Date.now()}`;

  try {
    await siteName.fill(updatedSiteName);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Settings saved successfully!')).toBeVisible();
    await page.reload();
    await expect(page.getByLabel('Site Name')).toHaveValue(updatedSiteName);
  } finally {
    await page.goto(`${adminUrl}/settings`);
    const restoreInput = page.getByLabel('Site Name');
    await expect(restoreInput).toBeVisible();
    await restoreInput.fill(originalSiteName);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Settings saved successfully!')).toBeVisible();
  }
});
