import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, of } from 'rxjs';
import { CategoryApiService } from '../data-access/category-api.service';
import { TemplateApiService } from '../data-access/template-api.service';
import { CategoryResponse, TemplateSummary } from '@platform/shared-models';
import { AppLayoutComponent, CardComponent, InputComponent, BadgeComponent, SkeletonComponent, EmptyStateComponent, ButtonComponent } from '@platform/ui';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppLayoutComponent, CardComponent, InputComponent, BadgeComponent, SkeletonComponent, EmptyStateComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-app-layout>
      <div class="max-w-7xl mx-auto flex flex-col gap-6 p-6 animate-fade-in">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-foreground">Templates</h1>
            <p class="text-foreground-secondary mt-1">Choose from our professionally designed templates</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-full lg:w-80">
              <ui-input
                [isSearch]="true"
                placeholder="Search templates..."
                [formControl]="searchControl"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            (click)="selectCategory(undefined)"
            [class.bg-primary]="!currentCategorySlug"
            [class.text-primary-foreground]="!currentCategorySlug"
            [class.bg-muted]="currentCategorySlug"
            [class.text-foreground-secondary]="currentCategorySlug"
            [class.hover:bg-surface-active]="currentCategorySlug"
            [class.hover:text-foreground]="currentCategorySlug"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all"
          >
            All Templates
          </button>
          
          @for (cat of categories; track cat.id) {
            <button
              (click)="selectCategory(cat.slug)"
              [class.bg-primary]="currentCategorySlug === cat.slug"
              [class.text-primary-foreground]="currentCategorySlug === cat.slug"
              [class.bg-muted]="currentCategorySlug !== cat.slug"
              [class.text-foreground-secondary]="currentCategorySlug !== cat.slug"
              [class.hover:bg-surface-active]="currentCategorySlug !== cat.slug"
              [class.hover:text-foreground]="currentCategorySlug !== cat.slug"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all"
            >
              {{ cat.name }}
            </button>
          }
        </div>

        @if (loading) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (i of [1,2,3,4,5,6,7,8]; track i) {
              <ui-skeleton class="h-64 rounded-xl" />
            }
          </div>
        } @else if (templates.length === 0) {
          <ui-empty-state
            title="No templates found"
            description="Try adjusting your search or filter to find what you're looking for."
            actionLabel="Clear Filters"
            (actionClick)="clearFilters()"
          >
            <svg icon xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </ui-empty-state>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (template of templates; track template.id) {
              <ui-card
                hover="true"
                padding="none"
                class="group overflow-hidden cursor-pointer"
                (click)="onTemplateSelected(template)"
              >
                <div class="relative aspect-[4/3] bg-muted overflow-hidden">
                  @if (template.thumbnailUrl) {
                    <img [src]="template.thumbnailUrl" [alt]="template.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  } @else {
                    <div class="w-full h-full flex items-center justify-center bg-surface-active text-muted-foreground">No Thumbnail</div>
                  }
                  
                  @if (template.isPremium) {
                    <div class="absolute top-3 left-3">
                      <ui-badge variant="warning" class="bg-amber-500 text-white border-0 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 lucide lucide-crown"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.518l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
                        Premium
                      </ui-badge>
                    </div>
                  }
                  
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <ui-button size="sm" (click)="onTemplateSelected(template); $event.stopPropagation()">
                      View Details
                    </ui-button>
                  </div>
                </div>

                <div class="p-4">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <h3 class="font-semibold text-foreground">{{ template.name }}</h3>
                      @if (template.description) {
                        <p class="text-sm text-muted-foreground mt-0.5 line-clamp-1">{{ template.description }}</p>
                      }
                    </div>
                  </div>
                  @if (getCategoryName(template.categoryId)) {
                    <div class="flex items-center gap-2 mt-3">
                      <ui-badge variant="secondary" size="sm" class="capitalize">
                        {{ getCategoryName(template.categoryId) }}
                      </ui-badge>
                    </div>
                  }
                </div>
              </ui-card>
            }
          </div>
        }
      </div>
    </ui-app-layout>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class TemplateListPage implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly categoryApi = inject(CategoryApiService);
  private readonly templateApi = inject(TemplateApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  categories: CategoryResponse[] = [];
  templates: TemplateSummary[] = [];
  loading = false;
  
  searchControl = new FormControl<string>('');
  currentCategorySlug?: string;

  ngOnInit() {
    this.categoryApi.getCategories().subscribe(res => {
      this.categories = res;
      this.cdr.markForCheck();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => {
      this.updateQueryParams({ search: search || undefined });
    });

    this.route.queryParams.pipe(
      tap(params => {
        this.currentCategorySlug = params['categorySlug'];
        if (this.searchControl.value !== (params['search'] || '')) {
          this.searchControl.setValue(params['search'] || '', { emitEvent: false });
        }
        this.loading = true;
        this.cdr.markForCheck();
      }),
      switchMap(params => this.templateApi.getTemplates({
        categorySlug: params['categorySlug'],
        search: params['search']
      }).pipe(
        catchError(() => of([]))
      ))
    ).subscribe(templates => {
      this.templates = templates;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  selectCategory(slug?: string) {
    this.updateQueryParams({ categorySlug: slug });
  }

  clearFilters() {
    this.searchControl.setValue('');
    this.updateQueryParams({ search: undefined, categorySlug: undefined });
  }

  getCategoryName(categoryId: string): string | undefined {
    return this.categories.find(c => c.id === categoryId)?.name;
  }

  private updateQueryParams(params: Record<string, string | undefined>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  onTemplateSelected(template: TemplateSummary) {
    this.router.navigate(['/templates', template.id]);
  }
}
