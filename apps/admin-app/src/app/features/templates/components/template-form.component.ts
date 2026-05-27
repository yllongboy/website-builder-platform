import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AdminTemplateResponse, TemplateUpsertRequest, AdminCategoryResponse } from '@platform/shared-models';
import { TemplateAdminApiService } from '../data-access/template-admin-api.service';

function jsonValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null; // optional
  try {
    JSON.parse(control.value);
    return null;
  } catch (e) {
    return { invalidJson: true };
  }
}

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-background border border-border/70 rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold text-foreground mb-6">{{ template ? 'Edit' : 'Add' }} Template</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="flex gap-4">
          <div class="mb-4 flex-1">
            <label for="categoryId" class="block text-sm font-medium text-foreground mb-1">Category *</label>
            <select id="categoryId" formControlName="categoryId" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">Select a category...</option>
              <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
            </select>
            <div class="text-destructive text-sm mt-1" *ngIf="form.get('categoryId')?.invalid && form.get('categoryId')?.touched">
              Category is required.
            </div>
          </div>
          <div class="mb-4 flex-1">
            <label for="name" class="block text-sm font-medium text-foreground mb-1">Name *</label>
            <input id="name" formControlName="name" type="text" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <div class="text-destructive text-sm mt-1" *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
              Name is required.
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="mb-4 flex-1">
            <label for="slug" class="block text-sm font-medium text-foreground mb-1">Slug *</label>
            <input id="slug" formControlName="slug" type="text" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <div class="text-destructive text-sm mt-1" *ngIf="form.get('slug')?.invalid && form.get('slug')?.touched">
              Slug is required.
            </div>
          </div>
          <div class="mb-4 flex-1">
            <label for="thumbnailUrl" class="block text-sm font-medium text-foreground mb-1">Thumbnail URL</label>
            <input id="thumbnailUrl" formControlName="thumbnailUrl" type="text" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-foreground mb-1">Description</label>
          <textarea id="description" formControlName="description" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
        </div>

        <div class="mb-4">
          <label for="htmlContent" class="block text-sm font-medium text-foreground mb-1">HTML Content *</label>
          <textarea id="htmlContent" formControlName="htmlContent" rows="6" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
          <div class="text-destructive text-sm mt-1" *ngIf="form.get('htmlContent')?.invalid && form.get('htmlContent')?.touched">
            HTML Content is required.
          </div>
        </div>

        <div class="mb-4">
          <label for="cssContent" class="block text-sm font-medium text-foreground mb-1">CSS Content</label>
          <textarea id="cssContent" formControlName="cssContent" rows="4" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
        </div>

        <div class="mb-4">
          <label for="editorState" class="block text-sm font-medium text-foreground mb-1">Editor State (JSON)</label>
          <textarea id="editorState" formControlName="editorState" rows="4" class="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
          <div class="text-destructive text-sm mt-1" *ngIf="form.get('editorState')?.hasError('invalidJson') && form.get('editorState')?.touched">
            Must be valid JSON.
          </div>
        </div>

        <div class="flex gap-4 mb-4">
          <div class="flex items-center">
            <label for="isPremium" class="flex items-center gap-2 text-sm text-foreground">
              <input id="isPremium" formControlName="isPremium" type="checkbox" class="border-border text-primary focus:ring-primary/50" />
              Is Premium
            </label>
          </div>
          <div class="flex items-center">
            <label for="isActive" class="flex items-center gap-2 text-sm text-foreground">
              <input id="isActive" formControlName="isActive" type="checkbox" class="border-border text-primary focus:ring-primary/50" />
              Is Active
            </label>
          </div>
        </div>

        <div class="flex gap-4 justify-end items-center mt-6">
          <p *ngIf="errorMessage" class="text-destructive text-sm mr-auto">{{ errorMessage }}</p>
          <button type="button" class="bg-muted/50 hover:bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors" (click)="onCancel()">Cancel</button>
          <button type="submit" class="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors" [disabled]="form.invalid || submitting">
            {{ submitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class TemplateFormComponent implements OnInit, OnChanges {
  @Input() template?: AdminTemplateResponse;
  @Input() submitting = false;
  @Input() errorMessage?: string;
  @Output() saved = new EventEmitter<TemplateUpsertRequest>();
  @Output() cancelled = new EventEmitter<void>();

  private api = inject(TemplateAdminApiService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  categories: AdminCategoryResponse[] = [];

  ngOnInit() {
    this.api.getCategories().subscribe(cats => this.categories = cats);
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['template'] && !changes['template'].isFirstChange()) {
      this.populateForm();
    }
  }

  private initForm() {
    this.form = this.fb.group({
      categoryId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      description: [''],
      thumbnailUrl: [''],
      htmlContent: ['', [Validators.required]],
      cssContent: [''],
      editorState: ['', [jsonValidator]],
      isPremium: [false],
      isActive: [true]
    });
    this.populateForm();
  }

  private populateForm() {
    if (!this.form) return;
    if (this.template) {
      this.form.patchValue({
        ...this.template,
        editorState: this.template.editorState ? JSON.stringify(this.template.editorState, null, 2) : ''
      });
    } else {
      this.form.reset({
        categoryId: '',
        isPremium: false,
        isActive: true
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (value.editorState && typeof value.editorState === 'string') {
      try {
        value.editorState = JSON.parse(value.editorState);
      } catch (e) {
        // ignore
      }
    }
    this.saved.emit(value);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
