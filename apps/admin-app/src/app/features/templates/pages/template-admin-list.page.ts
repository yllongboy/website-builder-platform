import { ChangeDetectorRef, Component, OnInit, inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateAdminApiService } from '../data-access/template-admin-api.service';
import { AdminTemplateResponse, TemplateUpsertRequest, AdminCategoryResponse } from '@platform/shared-models';
import { TemplateFormComponent } from '../components/template-form.component';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'app-template-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TemplateFormComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-[18px] font-semibold text-foreground tracking-tight leading-7">Templates</h1>
      <p class="text-[13px] text-foreground-muted mt-0.5 leading-5">Manage website templates</p>
    </div>
    <button *ngIf="!showForm" type="button" (click)="onAdd()"
      class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-colors">
      <wb-icon name="plus" [size]="16"></wb-icon>Add Template
    </button>
  </div>

  <app-template-form
    *ngIf="showForm"
    [template]="selectedTemplate"
    [submitting]="formSubmitting"
    [errorMessage]="formError"
    (saved)="onSaved($event)"
    (cancelled)="onCancelled()">
  </app-template-form>

  <div *ngIf="deleteError" class="bg-destructive/8 text-destructive rounded-md p-4 text-sm">{{ deleteError }}</div>
  <div *ngIf="error" class="bg-destructive/8 text-destructive rounded-md p-4 text-sm" role="alert">{{ error }}</div>
  <div *ngIf="loading" class="py-16 text-center text-foreground-muted">Loading templates...</div>

  <div *ngIf="!showForm" class="flex flex-wrap items-center gap-1.5">
    <div class="relative flex-1 min-w-56">
      <wb-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/60"></wb-icon>
      <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="applyFilters()"
        placeholder="Search templates..."
        class="bg-muted/40 border-0 rounded-md text-[12px] px-3 py-1.5 w-full text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-primary/30 pl-9" />
    </div>
    <select [(ngModel)]="categoryFilter" (ngModelChange)="applyFilters()"
      class="bg-muted/40 border-0 rounded-md text-[12px] px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30">
      <option value="">All Categories</option>
      <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
    </select>
    <button *ngIf="searchQuery || categoryFilter" type="button" (click)="clearFilters()"
      class="inline-flex items-center gap-1.5 text-foreground-muted hover:bg-muted/70 rounded-md px-2.5 py-1 text-xs">
      <wb-icon name="x" [size]="14"></wb-icon>Clear
    </button>
    <!-- Grid/List toggle -->
    <div class="flex items-center gap-1 ml-auto">
      <button type="button" (click)="viewMode='grid'"
        [ngClass]="viewMode === 'grid' ? 'bg-primary text-white' : 'text-foreground-muted hover:bg-muted'"
        class="p-2 rounded-md transition-colors" aria-label="Grid view">
        <wb-icon name="grid" [size]="16"></wb-icon>
      </button>
      <button type="button" (click)="viewMode='list'"
        [ngClass]="viewMode === 'list' ? 'bg-primary text-white' : 'text-foreground-muted hover:bg-muted'"
        class="p-2 rounded-md transition-colors" aria-label="List view">
        <wb-icon name="list" [size]="16"></wb-icon>
      </button>
    </div>
  </div>

  <div *ngIf="!loading && filteredTemplates.length === 0 && !showForm" class="py-16 text-center text-foreground-muted">No templates found.</div>

  <div *ngIf="!loading && filteredTemplates.length > 0 && viewMode === 'grid' && !showForm"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <article *ngFor="let tpl of filteredTemplates"
      class="bg-background border border-border/70 rounded-lg overflow-hidden group">
      <!-- Thumbnail -->
      <div class="relative">
        <img *ngIf="tpl.thumbnailUrl" [src]="tpl.thumbnailUrl" [alt]="tpl.name"
          class="w-full h-40 object-cover" />
        <div *ngIf="!tpl.thumbnailUrl"
          class="w-full h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <wb-icon name="grid" [size]="32" className="text-primary/40"></wb-icon>
        </div>
        <!-- Hover overlay -->
        <div class="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button type="button" (click)="onEdit(tpl)"
            class="p-2 bg-white rounded-md shadow-lg hover:bg-muted" aria-label="Edit template">
            <wb-icon name="edit" [size]="16"></wb-icon>
          </button>
          <button type="button" (click)="openDeleteModal(tpl)"
            class="p-2 bg-white rounded-md shadow-lg hover:bg-muted" aria-label="Delete template">
            <wb-icon name="trash" [size]="16" className="text-destructive"></wb-icon>
          </button>
        </div>
        <!-- Premium badge -->
        <div *ngIf="tpl.isPremium" class="absolute top-3 right-3">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded bg-warning/10 text-warning">
            <wb-icon name="star" [size]="11"></wb-icon>Premium
          </span>
        </div>
      </div>
      <!-- Card body -->
      <div class="p-4">
        <div class="flex items-start justify-between mb-1">
          <h3 class="font-semibold text-[13px] text-foreground">{{ tpl.name }}</h3>
          <span [ngClass]="tpl.isActive ? 'bg-success/10 text-success' : 'bg-foreground/5 text-foreground-muted'"
            class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full">
            {{ tpl.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
        <p class="text-xs text-foreground-muted mb-3">{{ getCategoryName(tpl.categoryId) }}</p>
        <div class="flex items-center justify-between text-xs text-foreground-muted border-t border-border/50 pt-3">
          <span>— uses</span>
          <span [ngClass]="tpl.isPremium ? 'bg-warning/10 text-warning' : 'bg-foreground/5 text-foreground-muted'"
            class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full">
            {{ tpl.isPremium ? 'Premium' : 'Free' }}
          </span>
        </div>
      </div>
    </article>
  </div>

  <section *ngIf="!loading && filteredTemplates.length > 0 && viewMode === 'list' && !showForm"
    class="bg-background border border-border/70 rounded-md overflow-hidden">
    <table class="min-w-full divide-y divide-border/50">
      <thead class="border-b border-border/70">
        <tr>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Template</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Category</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Status</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Type</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Uses</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border/50">
        <tr *ngFor="let tpl of filteredTemplates" class="hover:bg-muted/25 transition-colors duration-100">
          <!-- Template cell: thumbnail + name + slug -->
          <td class="px-4 py-3.5 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded overflow-hidden flex-shrink-0 bg-muted">
                <img *ngIf="tpl.thumbnailUrl" [src]="tpl.thumbnailUrl" [alt]="tpl.name" class="w-full h-full object-cover" />
                <div *ngIf="!tpl.thumbnailUrl" class="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <wb-icon name="grid" [size]="14" className="text-primary/40"></wb-icon>
                </div>
              </div>
              <div>
                <p class="text-[13px] font-medium text-foreground">{{ tpl.name }}</p>
                <p class="text-xs text-foreground-muted">{{ tpl.slug }}</p>
              </div>
            </div>
          </td>
          <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground-muted">{{ getCategoryName(tpl.categoryId) }}</td>
          <td class="px-4 py-3.5 whitespace-nowrap">
            <span [ngClass]="tpl.isActive ? 'bg-success/10 text-success' : 'bg-foreground/5 text-foreground-muted'"
              class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full">
              {{ tpl.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td class="px-4 py-3.5 whitespace-nowrap">
            <span [ngClass]="tpl.isPremium ? 'bg-warning/10 text-warning' : 'bg-foreground/5 text-foreground-muted'"
              class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full">
              {{ tpl.isPremium ? 'Premium' : 'Free' }}
            </span>
          </td>
          <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground-muted">—</td>
          <td class="px-4 py-3.5 whitespace-nowrap">
            <div class="flex items-center gap-1">
              <button type="button" (click)="onEdit(tpl)"
                class="p-1.5 rounded-md hover:bg-muted text-foreground-muted transition-colors" aria-label="Edit template">
                <wb-icon name="edit" [size]="16"></wb-icon>
              </button>
              <button type="button" (click)="openDeleteModal(tpl)"
                class="p-1.5 rounded-md hover:bg-muted text-destructive transition-colors" aria-label="Delete template">
                <wb-icon name="trash" [size]="16"></wb-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</div>

<div *ngIf="showDeleteModal && templateToDelete" class="fixed inset-0 z-50 flex items-center justify-center">
  <div class="absolute inset-0 bg-foreground/50 backdrop-blur-sm" (click)="closeDeleteModal()"></div>
  <div role="dialog" aria-modal="true" class="relative bg-background rounded-xl shadow-2xl w-full max-w-sm mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-border">
      <h2 class="text-base font-semibold text-foreground">Delete Template</h2>
      <button type="button" (click)="closeDeleteModal()" aria-label="Close" class="p-1 rounded-md hover:bg-muted transition-colors text-foreground-muted">
        <wb-icon name="x" [size]="20"></wb-icon>
      </button>
    </div>
    <div class="px-6 py-4">
      <p class="text-[13px] text-foreground">Are you sure you want to delete <strong>{{ templateToDelete?.name }}</strong>? This action cannot be undone.</p>
    </div>
    <div class="px-6 py-4 border-t border-border bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
      <button type="button" (click)="closeDeleteModal()"
        class="inline-flex items-center justify-center font-medium rounded-md transition-all border border-border/80 text-foreground hover:bg-muted/50 px-3.5 py-1.5 text-[13px]">Cancel</button>
      <button type="button" (click)="confirmDelete()"
        class="inline-flex items-center justify-center font-medium rounded-md transition-all bg-destructive text-white hover:bg-destructive/90 px-3.5 py-1.5 text-[13px]">Delete Template</button>
    </div>
  </div>
</div>
  `
})
export class TemplateAdminListPage implements OnInit {
  private api = inject(TemplateAdminApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  templates: AdminTemplateResponse[] = [];
  categories: AdminCategoryResponse[] = [];
  loading = false;
  showForm = false;
  formSubmitting = false;
  formError?: string;
  deleteError?: string;
  error?: string;
  selectedTemplate?: AdminTemplateResponse;
  
  searchQuery = '';
  categoryFilter = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredTemplates: AdminTemplateResponse[] = [];
  showDeleteModal = false;
  templateToDelete: AdminTemplateResponse | undefined;

  ngOnInit() {
    this.api.getCategories().subscribe(cats => {
      this.categories = cats;
      this.cdr.markForCheck();
    });
    this.loadTemplates();
  }

  loadTemplates() {
    this.loading = true;
    this.api.getTemplates().subscribe({
      next: (data) => {
        this.templates = data;
        this.error = undefined;
        this.loading = false;
        this.applyFilters();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to load templates.';
        this.cdr.markForCheck();
      }
    });
  }

  applyFilters(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredTemplates = this.templates.filter(t =>
      (!q || t.name.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)) &&
      (!this.categoryFilter || t.categoryId === this.categoryFilter)
    );
    this.cdr.markForCheck();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.categoryFilter = '';
    this.applyFilters();
  }

  getCategoryName(id: string): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : id;
  }

  onAdd() {
    this.selectedTemplate = undefined;
    this.formError = undefined;
    this.formSubmitting = false;
    this.showForm = true;
  }

  onEdit(template: AdminTemplateResponse) {
    this.selectedTemplate = template;
    this.formError = undefined;
    this.formSubmitting = false;
    this.showForm = true;
  }

  openDeleteModal(template: AdminTemplateResponse): void {
    this.templateToDelete = template;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.templateToDelete = undefined;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showDeleteModal) {
      this.closeDeleteModal();
    }
  }

  onDelete(template: AdminTemplateResponse) {
    this.openDeleteModal(template);
  }

  confirmDelete(): void {
    if (!this.templateToDelete) return;
    const id = this.templateToDelete.id;
    this.deleteError = undefined;
    this.closeDeleteModal();
    this.api.deleteTemplate(id).subscribe({
      next: () => {
        this.loadTemplates();
      },
      error: (err) => {
        this.deleteError = err.error?.message || 'Failed to delete template.';
        this.cdr.markForCheck();
      }
    });
  }

  onSaved(req: TemplateUpsertRequest) {
    this.formSubmitting = true;
    this.formError = undefined;
    const ob$ = this.selectedTemplate
      ? this.api.updateTemplate(this.selectedTemplate.id, req)
      : this.api.createTemplate(req);

    ob$.subscribe({
      next: () => {
        this.formSubmitting = false;
        this.showForm = false;
        this.loadTemplates();
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.formSubmitting = false;
        this.formError = err.error?.message || 'An error occurred. Please try again.';
        this.cdr.markForCheck();
      }
    });
  }

  onCancelled() {
    this.showForm = false;
  }
}
