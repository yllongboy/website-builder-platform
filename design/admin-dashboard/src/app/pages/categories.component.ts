import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mockCategories } from '../mock-data';
import type { Category } from '../models';
import { BadgeComponent, ConfirmModalComponent, LayoutComponent, ModalComponent, ToggleComponent } from '../ui.component';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent, BadgeComponent, ModalComponent, ConfirmModalComponent, ToggleComponent, IconComponent],
  template: `
    <app-layout><div class="flex flex-col gap-6"><div class="flex items-center justify-between"><div><h1 class="text-xl font-semibold text-foreground tracking-tight">Categories</h1><p class="text-[13px] text-muted-foreground mt-0.5">Organize templates into categories</p></div><button (click)="showAddModal=true" class="inline-flex items-center gap-1.5 bg-primary text-white rounded-md px-3.5 py-1.5 text-[13px] font-medium"><app-icon name="plus" [size]="16"></app-icon>Add Category</button></div>
      <section class="bg-background border border-border/70 rounded-lg overflow-hidden"><div class="divide-y divide-border"><div *ngFor="let category of categories" draggable="true" (dragstart)="draggedId = category.id" (dragover)="dragOver($event, category.id)" (dragend)="draggedId = null" [ngClass]="draggedId === category.id ? 'opacity-50' : ''" class="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-grab"><app-icon name="grip" [size]="20" className="text-muted-foreground flex-shrink-0"></app-icon><div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><app-icon name="folder" [size]="20" className="text-primary"></app-icon></div><div class="flex-1 min-w-0"><h3 class="font-semibold text-foreground">{{ category.name }}</h3><p class="text-sm text-muted-foreground">/{{ category.slug }} - {{ category.templatesCount }} templates</p></div><app-badge [variant]="category.status === 'active' ? 'success' : 'secondary'">{{ category.status }}</app-badge><button (click)="toggleStatus(category.id)" class="px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg">{{ category.status === 'active' ? 'Deactivate' : 'Activate' }}</button><button (click)="edit(category)" class="p-2 rounded hover:bg-muted"><app-icon name="edit" [size]="16"></app-icon></button><button (click)="requestDelete(category)" class="p-2 rounded hover:bg-muted"><app-icon name="trash" [size]="16" className="text-destructive"></app-icon></button></div></div></section><p class="text-sm text-muted-foreground text-center">Drag and drop categories to reorder them</p></div>
      <app-modal [open]="showAddModal" [title]="selectedCategory ? 'Edit Category' : 'Add Category'" [footer]="true" size="sm" (close)="resetForm()"><div class="flex flex-col gap-4"><label class="flex flex-col gap-1.5 text-sm font-medium">Category Name<input [(ngModel)]="formName" (ngModelChange)="syncSlug($event)" placeholder="e.g., Business" class="px-3 py-2 text-sm bg-background border border-border rounded-lg"></label><label class="flex flex-col gap-1.5 text-sm font-medium">Slug<input [(ngModel)]="formSlug" placeholder="e.g., business" class="px-3 py-2 text-sm bg-background border border-border rounded-lg"><span class="text-xs text-muted-foreground">Used in URLs</span></label><app-toggle label="Active" description="Inactive categories are hidden from users" [(enabled)]="formIsActive"></app-toggle></div><button modal-footer (click)="resetForm()" class="border border-border/80 rounded-md px-3.5 py-1.5 text-[13px]">Cancel</button><button modal-footer (click)="save()" class="bg-primary text-white rounded-md px-3.5 py-1.5 text-[13px]">{{ selectedCategory ? 'Save Changes' : 'Add Category' }}</button></app-modal>
      <app-confirm-modal [open]="showDeleteModal" title="Delete Category" [message]="'Are you sure you want to delete &quot;' + (selectedCategory?.name || 'this category') + '&quot;? Templates in this category will become uncategorized.'" confirmText="Delete Category" (close)="showDeleteModal=false" (confirm)="confirmDelete()"></app-confirm-modal>
    </app-layout>
  `
})
export class CategoriesComponent {
  categories: Category[] = [...mockCategories];
  showAddModal = false;
  showDeleteModal = false;
  selectedCategory: Category | null = null;
  draggedId: string | null = null;
  formName = '';
  formSlug = '';
  formIsActive = true;
  edit(category: Category): void { this.selectedCategory = category; this.formName = category.name; this.formSlug = category.slug; this.formIsActive = category.status === 'active'; this.showAddModal = true; }
  requestDelete(category: Category): void { this.selectedCategory = category; this.showDeleteModal = true; }
  confirmDelete(): void { if (this.selectedCategory) this.categories = this.categories.filter((c) => c.id !== this.selectedCategory?.id); }
  save(): void { if (this.selectedCategory) { this.categories = this.categories.map((c) => c.id === this.selectedCategory?.id ? { ...c, name: this.formName, slug: this.formSlug, status: this.formIsActive ? 'active' : 'inactive' } : c); } else { this.categories = [...this.categories, { id: String(this.categories.length + 1), name: this.formName, slug: this.formSlug, templatesCount: 0, order: this.categories.length + 1, status: this.formIsActive ? 'active' : 'inactive' }]; } this.resetForm(); }
  toggleStatus(id: string): void { this.categories = this.categories.map((c) => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c); }
  dragOver(event: DragEvent, targetId: string): void { event.preventDefault(); if (!this.draggedId || this.draggedId === targetId) return; const from = this.categories.findIndex((c) => c.id === this.draggedId); const to = this.categories.findIndex((c) => c.id === targetId); const next = [...this.categories]; const [item] = next.splice(from, 1); next.splice(to, 0, item); this.categories = next.map((c, index) => ({ ...c, order: index + 1 })); }
  syncSlug(value: string): void { if (!this.selectedCategory) this.formSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  resetForm(): void { this.showAddModal = false; this.selectedCategory = null; this.formName = ''; this.formSlug = ''; this.formIsActive = true; }
}
