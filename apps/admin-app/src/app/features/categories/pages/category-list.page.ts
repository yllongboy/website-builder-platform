import { ChangeDetectorRef, Component, OnInit, inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAdminApiService } from '../data-access/category-admin-api.service';
import { AdminCategoryResponse, CategoryUpsertRequest } from '@platform/shared-models';
import { CategoryFormComponent } from '../components/category-form.component';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-[18px] font-semibold text-foreground tracking-tight leading-7">Categories</h2>
      <p class="text-[13px] text-foreground-muted mt-0.5 leading-5">Organize templates into categories</p>
    </div>
    <button type="button" class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-all" *ngIf="!showForm" (click)="onAdd()">
      <wb-icon name="plus" [size]="16"></wb-icon>Add Category
    </button>
  </div>

  <app-category-form
    *ngIf="showForm"
    [category]="selectedCategory"
    [submitting]="formSubmitting"
    [errorMessage]="formError"
    (saved)="onSaved($event)"
    (cancelled)="onCancelled()">
  </app-category-form>

  <div *ngIf="deleteError" class="text-destructive text-[13px] mb-4 bg-destructive/8 p-3 rounded-md">{{ deleteError }}</div>
  <div *ngIf="error" class="text-destructive text-[13px] mb-4 bg-destructive/8 p-3 rounded-md" role="alert">{{ error }}</div>
  <div *ngIf="loading" class="py-16 text-center text-foreground-muted">Loading categories...</div>

  <div *ngIf="!loading && categories.length === 0 && !showForm" class="py-16 text-center text-foreground-muted">No categories found.</div>

  <section *ngIf="!loading && categories.length > 0 && !showForm" class="bg-background border border-border/70 rounded-lg overflow-hidden">
    <div class="divide-y divide-border/50">
      <div *ngFor="let cat of categories" class="flex items-center gap-4 p-4 hover:bg-muted/25 transition-colors duration-100">
        <!-- Drag handle (visual only — no drag logic needed) -->
        <wb-icon name="grip" [size]="18" className="text-foreground-muted/40 flex-shrink-0 cursor-grab"></wb-icon>
        <!-- Folder icon tile -->
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <wb-icon name="folder" [size]="20" className="text-primary"></wb-icon>
        </div>
        <!-- Name + sub-line -->
        <div class="flex-1 min-w-0">
          <p class="text-[13px] font-semibold text-foreground">{{ cat.name }}</p>
          <p class="text-xs text-foreground-muted">/{{ cat.slug }} · {{ cat.templatesCount }} {{ cat.templatesCount === 1 ? 'template' : 'templates' }}</p>
        </div>
        <!-- Active/Inactive badge -->
        <span [ngClass]="cat.isActive ? 'bg-success/10 text-success' : 'bg-foreground/5 text-foreground-muted'"
          class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full">
          {{ cat.isActive ? 'Active' : 'Inactive' }}
        </span>
        <!-- Order badge -->
        <span class="text-xs text-foreground-muted tabular-nums w-6 text-right">#{{ cat.sortOrder }}</span>
        <!-- Action buttons -->
        <div class="flex items-center gap-1">
          <button type="button" (click)="onEdit(cat)"
            class="p-1.5 rounded-md hover:bg-muted text-foreground-muted transition-colors" aria-label="Edit category">
            <wb-icon name="edit" [size]="16"></wb-icon>
          </button>
          <button type="button" (click)="openDeleteModal(cat)"
            class="p-1.5 rounded-md hover:bg-muted text-destructive transition-colors" aria-label="Delete category">
            <wb-icon name="trash" [size]="16"></wb-icon>
          </button>
        </div>
      </div>
    </div>
    <p class="px-4 py-3 text-xs text-foreground-muted text-center border-t border-border/50">Drag and drop to reorder categories</p>
  </section>

  <div *ngIf="showDeleteModal && categoryToDelete" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-foreground/50 backdrop-blur-sm" (click)="closeDeleteModal()"></div>
    <div role="dialog" aria-modal="true" class="relative bg-background rounded-xl shadow-2xl w-full max-w-sm mx-4">
      <div class="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 class="text-base font-semibold text-foreground">Delete Category</h2>
        <button type="button" (click)="closeDeleteModal()" aria-label="Close" class="p-1 rounded-md hover:bg-muted transition-colors text-foreground-muted">
          <wb-icon name="x" [size]="20"></wb-icon>
        </button>
      </div>
      <div class="px-6 py-4">
        <p class="text-[13px] text-foreground">Are you sure you want to delete <strong>{{ categoryToDelete?.name }}</strong>? Templates in this category will become uncategorized.</p>
      </div>
      <div class="px-6 py-4 border-t border-border bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
        <button type="button" (click)="closeDeleteModal()"
          class="inline-flex items-center justify-center font-medium rounded-md transition-all border border-border/80 text-foreground hover:bg-muted/50 px-3.5 py-1.5 text-[13px]">Cancel</button>
        <button type="button" (click)="confirmDelete()"
          class="inline-flex items-center justify-center font-medium rounded-md transition-all bg-destructive text-white hover:bg-destructive/90 px-3.5 py-1.5 text-[13px]">Delete Category</button>
      </div>
    </div>
  </div>
</div>
  `
})
export class CategoryListPage implements OnInit {
  private categoryApi = inject(CategoryAdminApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  categories: AdminCategoryResponse[] = [];
  loading = false;
  showForm = false;
  formSubmitting = false;
  formError?: string;
  deleteError?: string;
  error?: string;
  selectedCategory?: AdminCategoryResponse;

  showDeleteModal = false;
  categoryToDelete: AdminCategoryResponse | undefined;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryApi.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.error = undefined;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to load categories.';
        this.cdr.markForCheck();
      }
    });
  }

  onAdd() {
    this.selectedCategory = undefined;
    this.formError = undefined;
    this.formSubmitting = false;
    this.showForm = true;
  }

  onEdit(category: AdminCategoryResponse) {
    this.selectedCategory = category;
    this.formError = undefined;
    this.formSubmitting = false;
    this.showForm = true;
  }

  openDeleteModal(category: AdminCategoryResponse): void {
    this.categoryToDelete = category;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.categoryToDelete = undefined;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showDeleteModal) {
      this.closeDeleteModal();
    }
  }

  confirmDelete(): void {
    if (!this.categoryToDelete) return;
    const id = this.categoryToDelete.id;
    this.deleteError = undefined;
    this.closeDeleteModal();
    this.categoryApi.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (err) => {
        this.deleteError = err.error?.message || 'Failed to delete category.';
        this.cdr.markForCheck();
      }
    });
  }

  onSaved(req: CategoryUpsertRequest) {
    this.formSubmitting = true;
    this.formError = undefined;
    const ob$ = this.selectedCategory
      ? this.categoryApi.updateCategory(this.selectedCategory.id, req)
      : this.categoryApi.createCategory(req);

    ob$.subscribe({
      next: () => {
        this.formSubmitting = false;
        this.showForm = false;
        this.loadCategories();
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
