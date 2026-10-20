import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminCategoryResponse, AdminTemplateResponse } from '@platform/shared-models';
import { TemplateAdminApiService } from '../data-access/template-admin-api.service';
import { TemplateAdminListPage } from './template-admin-list.page';

describe('SCRUM-101 - Admin template usage and creation metadata', () => {
  let fixture: ComponentFixture<TemplateAdminListPage>;
  let api: jest.Mocked<Pick<TemplateAdminApiService, 'getCategories' | 'getTemplates'>>;

  const categories: AdminCategoryResponse[] = [
    { id: 'cat-1', name: 'Portfolio', slug: 'portfolio', sortOrder: 1, isActive: true, templatesCount: 1 },
  ];
  const templates: AdminTemplateResponse[] = [
    {
      id: 'template-1', categoryId: 'cat-1', name: 'Personal Site', slug: 'personal-site',
      isPremium: false, isActive: true, htmlContent: '<main />', usageCount: 3,
      createdAt: '2026-01-01T12:00:00Z',
    },
  ];

  beforeEach(async () => {
    api = {
      getCategories: jest.fn().mockReturnValue(of(categories)),
      getTemplates: jest.fn().mockReturnValue(of(templates)),
    };

    await TestBed.configureTestingModule({
      imports: [TemplateAdminListPage],
      providers: [{ provide: TemplateAdminApiService, useValue: api }],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateAdminListPage);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('SCRUM-101 - shows website usage count and creation date in grid and list views', () => {
    const card = fixture.nativeElement.querySelector('article') as HTMLElement;
    expect(card.textContent).toContain('3 uses');
    expect(card.textContent).toContain('Created Jan 1, 2026');

    fixture.componentInstance.viewMode = 'list';
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;
    expect(row.textContent).toContain('Personal Site');
    expect(row.textContent).toContain('3');
    expect(row.textContent).toContain('Jan 1, 2026');
  });

  it('SCRUM-101 - displays zero uses for a template with no website references', () => {
    api.getTemplates.mockReturnValue(of([{ ...templates[0], usageCount: 0 }]));
    fixture.componentInstance.loadTemplates();
    fixture.detectChanges();

    expect((fixture.nativeElement.querySelector('article') as HTMLElement).textContent).toContain('0 uses');
  });
});
