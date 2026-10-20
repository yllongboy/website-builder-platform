import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const ticketTestFiles = {
  'SCRUM-125': [
    'services/api/src/test/java/com/websitebuilder/platform/security/jwt/TokenBlocklistPostgresIntegrationTest.java',
    'services/api/src/test/java/com/websitebuilder/platform/auth/controller/JwtRevocationIntegrationTest.java',
  ],
  'SCRUM-126': ['apps/builder-app/src/app/features/auth/auth.service.spec.ts'],
  'SCRUM-127': ['services/api/src/test/java/com/websitebuilder/platform/auth/controller/AuthControllerTest.java'],
  'SCRUM-97': [
    'services/api/src/test/java/com/websitebuilder/platform/auth/service/AuthServiceTest.java',
    'apps/builder-app/src/app/features/auth/pages/register.page.spec.ts',
    'apps/admin-app/src/app/features/users/pages/user-admin-list.page.spec.ts',
  ],
  'SCRUM-99': [
    'services/api/src/test/java/com/websitebuilder/platform/websites/mapper/WebsiteMapperAdminTest.java',
    'apps/admin-app/src/app/features/websites/pages/website-admin-list.page.spec.ts',
  ],
  'SCRUM-101': [
    'services/api/src/test/java/com/websitebuilder/platform/templates/mapper/TemplateMapperAdminTest.java',
    'services/api/src/test/java/com/websitebuilder/platform/templates/service/TemplateServiceAdminTest.java',
    'apps/admin-app/src/app/features/templates/pages/template-admin-list.page.spec.ts',
  ],
  'SCRUM-103': [
    'services/api/src/test/java/com/websitebuilder/platform/categories/service/CategoryServiceAdminTest.java',
    'apps/admin-app/src/app/features/categories/pages/category-list.page.spec.ts',
  ],
  'SCRUM-105': [
    'services/api/src/test/java/com/websitebuilder/platform/admin/billing/service/AdminBillingServiceTest.java',
    'services/api/src/test/java/com/websitebuilder/platform/admin/billing/controller/AdminSubscriptionControllerTest.java',
  ],
  'SCRUM-107': [
    'services/api/src/test/java/com/websitebuilder/platform/admin/settings/controller/AdminSettingsControllerTest.java',
    'apps/admin-app/src/app/features/settings/pages/admin-settings.page.spec.ts',
  ],
  'SCRUM-108': ['services/api/src/test/java/com/websitebuilder/platform/admin/service/AdminMetricsServiceTest.java'],
  'SCRUM-109': ['services/api/src/test/java/com/websitebuilder/platform/admin/service/AdminMetricsServiceTest.java'],
  'SCRUM-110': ['services/api/src/test/java/com/websitebuilder/platform/admin/service/AdminMetricsServiceTest.java'],
  'SCRUM-111': ['services/api/src/test/java/com/websitebuilder/platform/admin/service/AdminMetricsTimeSeriesServiceTest.java'],
  'SCRUM-112': ['services/api/src/test/java/com/websitebuilder/platform/admin/activity/AdminActivityPostgresIntegrationTest.java'],
};

test('SCRUM-136 - CI runs the documented admin command and discovers all Sprint 12 ticket cases', () => {
  const workflow = read('.github/workflows/ci.yml');
  const docs = read('docs/testing/sprint-12-uat-automation.md');

  assert.ok(workflow.includes('pnpm exec nx run admin-app:test --runInBand'));
  assert.ok(workflow.includes('pnpm exec nx run builder-app:test --runInBand'));
  assert.ok(workflow.includes('mvn -f services/pom.xml verify --no-transfer-progress'));
  assert.ok(workflow.includes('pnpm run test:sprint12-uat'));
  assert.ok(read('apps/admin-app/jest.config.ts').includes("'<rootDir>/src/test-setup.ts'"));
  assert.ok(read('apps/builder-app/jest.config.ts').includes("'<rootDir>/src/test-setup.ts'"));

  for (const [ticket, paths] of Object.entries(ticketTestFiles)) {
    const matchingFiles = paths.filter((path) => read(path).includes(`${ticket} - `));
    assert.ok(matchingFiles.length > 0, `${ticket} must have at least one named automated case`);
    assert.ok(docs.includes(ticket), `${ticket} must be documented in the coverage map`);

    for (const path of paths) {
      const contents = read(path);
      const testTitles = [...contents.matchAll(/@DisplayName\("([^"]+)"\)|\b(?:it|test)\(['"]([^'"]+)['"]/g)]
        .map((match) => match[1] ?? match[2]);
      for (const title of testTitles.filter((value) => /SCRUM-\d+/.test(value))) {
        assert.match(title, /^SCRUM-\d{2,3} - .+$/, `${path} has an invalid ticket test title: ${title}`);
      }
    }
  }
});
