import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminWebsiteResponse } from '@platform/shared-models';
import { WebsiteAdminApiService } from '../data-access/website-admin-api.service';
import { WebsiteAdminListPage } from './website-admin-list.page';

describe('WebsiteAdminListPage', () => {
  let websiteApi: jest.Mocked<Pick<WebsiteAdminApiService, 'getWebsites'>>;

  const website: AdminWebsiteResponse = {
    id: 'website-1',
    ownerEmail: 'owner@example.com',
    ownerName: 'Ada Lovelace',
    name: 'Analytical Engine',
    status: 'DRAFT',
    templateName: 'Portfolio',
    pageViews: 0,
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  };

  beforeEach(async () => {
    websiteApi = { getWebsites: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [WebsiteAdminListPage],
      providers: [{ provide: WebsiteAdminApiService, useValue: websiteApi }],
    }).compileComponents();
  });

  function render(websites: AdminWebsiteResponse[]): ComponentFixture<WebsiteAdminListPage> {
    websiteApi.getWebsites.mockReturnValue(of(websites));
    const fixture = TestBed.createComponent(WebsiteAdminListPage);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the website owner and template details in the list and details dialog', () => {
    const fixture = render([website]);
    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;

    expect(row.textContent).toContain('Analytical Engine');
    expect(row.textContent).toContain('Portfolio');
    expect(row.textContent).toContain('Ada Lovelace');
    expect(row.textContent).toContain('Not tracked');

    const viewButton = fixture.nativeElement.querySelector(
      'button[aria-label="View details"]'
    ) as HTMLButtonElement;
    viewButton.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog.textContent).toContain('Ada Lovelace');
    expect(dialog.textContent).toContain('Portfolio');
    expect(dialog.textContent).toContain('Not tracked');
  });

  it('falls back to owner email and em dashes for nullable owner and template names', () => {
    const fixture = render([
      {
        ...website,
        ownerName: null,
        templateName: null,
      },
    ]);

    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;
    expect(row.textContent).toContain('owner@example.com');
    expect(row.textContent).toContain('—');
    expect(row.textContent).toContain('Not tracked');

    const viewButton = fixture.nativeElement.querySelector(
      'button[aria-label="View details"]'
    ) as HTMLButtonElement;
    viewButton.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog.textContent).toContain('by owner@example.com');
    expect(dialog.textContent).toContain('—');
    expect(dialog.textContent).toContain('Not tracked');
  });
});
