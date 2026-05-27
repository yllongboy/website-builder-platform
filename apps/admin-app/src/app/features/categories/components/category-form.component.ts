import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryResponse, CategoryUpsertRequest } from '@platform/shared-models';
// refresh

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-background shadow rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold text-foreground mb-6">{{ category ? 'Edit' : 'Add' }} Category</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-foreground mb-1">Name *</label>
          <input id="name" formControlName="name" type="text" class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div class="text-destructive text-sm mt-1" *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
            Name is required (max 150 chars).
          </div>
        </div>
        
        <div class="mb-4">
          <label for="slug" class="block text-sm font-medium text-foreground mb-1">Slug *</label>
          <input id="slug" formControlName="slug" type="text" class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div class="text-destructive text-sm mt-1" *ngIf="form.get('slug')?.invalid && form.get('slug')?.touched">
            Slug is required (max 180 chars).
          </div>
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-foreground mb-1">Description</label>
          <textarea id="description" formControlName="description" class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"></textarea>
        </div>

        <div class="flex gap-4">
          <div class="mb-4 flex-1">
            <label for="sortOrder" class="block text-sm font-medium text-foreground mb-1">Sort Order</label>
            <input id="sortOrder" formControlName="sortOrder" type="number" class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div class="mb-4 flex items-center mt-6 flex-1">
            <label for="isActive" class="flex items-center gap-2 text-sm text-foreground">
              <input id="isActive" formControlName="isActive" type="checkbox" />
              Is Active
            </label>
          </div>
        </div>

        <div class="flex gap-4 justify-end items-center mt-4">
          <p *ngIf="errorMessage" class="text-destructive text-sm mr-auto">{{ errorMessage }}</p>
          <button type="button" class="border border-border/80 hover:bg-muted/50 text-foreground px-4 py-2 rounded-lg text-sm font-medium" (click)="onCancel()">Cancel</button>
          <button type="submit" class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" [disabled]="form.invalid || submitting">
            {{ submitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() category?: AdminCategoryResponse;
  @Input() submitting = false;
  @Input() errorMessage?: string;
  @Output() saved = new EventEmitter<CategoryUpsertRequest>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && !changes['category'].isFirstChange()) {
      if (this.category) {
        this.form.patchValue(this.category);
      } else {
        this.form.reset({ sortOrder: 0, isActive: true });
      }
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: [this.category?.name || '', [Validators.required, Validators.maxLength(150)]],
      slug: [this.category?.slug || '', [Validators.required, Validators.maxLength(180)]],
      description: [this.category?.description || ''],
      sortOrder: [this.category?.sortOrder || 0],
      isActive: [this.category?.isActive ?? true]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.saved.emit(this.form.value);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
