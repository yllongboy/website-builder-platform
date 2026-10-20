import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminCategoryResponse } from '@platform/shared-models';
import { CategoryAdminApiService } from '../data-access/category-admin-api.service';
import { CategoryListPage } from './category-list.page';

describe('SCRUM-103 - Admin category template counts', () => {
  let fixture: ComponentFixture<CategoryListPage>;
  let api: jest.Mocked<Pick<CategoryAdminApiService, 'getCategories'>>;

  beforeEach(async () => {
    const categories: AdminCategoryResponse[] = [
      { id: 'cat-one', name: 'One', slug: 'one', sortOrder: 1, isActive: true, templatesCount: 1 },
      { id: 'cat-none', name: 'None', slug: 'none', sortOrder: 2, isActive: true, templatesCount: 0 },
      { id: 'cat-many', name: 'Many', slug: 'many', sortOrder: 3, isActive: false, templatesCount: 4 },
    ];
    api = { getCategories: jest.fn().mockReturnValue(of(categories)) };

    await TestBed.configureTestingModule({
      imports: [CategoryListPage],
      providers: [{ provide: CategoryAdminApiService, useValue: api }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListPage);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('SCRUM-103 - displays each category template count with correct singular and plural labels', () => {
    const rows = Array.from(fixture.nativeElement.querySelectorAll('.divide-y > div')) as HTMLElement[];
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('1 template'),
      expect.stringContaining('0 templates'),
      expect.stringContaining('4 templates'),
    ]);
  });

  it('SCRUM-103 - shows an empty state when categories have no templates to count', () => {
    api.getCategories.mockReturnValue(of([]));
    fixture.componentInstance.loadCategories();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No categories found.');
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
  });
});
