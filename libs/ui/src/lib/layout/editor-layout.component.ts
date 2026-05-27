import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Monitor, Smartphone, Tablet, Pencil } from 'lucide-angular';
import { ButtonComponent } from '../button.component';
import { WebsiteStatus } from '@platform/shared-models';

@Component({
  selector: 'ui-editor-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-screen overflow-hidden flex flex-col bg-background-secondary">
      <header class="h-14 bg-surface border-b border-border px-4 flex items-center justify-between gap-4 flex-shrink-0">
        <div class="flex items-center gap-3 min-w-0">
          <ui-button variant="ghost" size="icon" (click)="backClick.emit()" aria-label="Back">
            <lucide-icon name="arrow-left" class="w-4 h-4"></lucide-icon>
          </ui-button>
          <div class="h-6 w-px bg-border"></div>
          <div class="min-w-0">
            <div *ngIf="!isEditingName" class="flex items-center gap-1 group cursor-pointer" (click)="startEditName()">
              <p class="text-sm font-medium text-foreground truncate max-w-[200px]">{{ websiteName }}</p>
              <lucide-icon name="pencil" class="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"></lucide-icon>
            </div>
            <input *ngIf="isEditingName"
              [(ngModel)]="editingNameValue"
              (blur)="commitName()"
              (keydown)="onNameKeydown($event)"
              class="text-sm font-medium bg-background border border-primary rounded px-1.5 py-0.5 outline-none w-[200px] text-foreground"
              maxlength="150"
              #nameInput
              autofocus>
            <p class="text-xs text-muted-foreground" *ngIf="isSaving">Saving...</p>
            <p class="text-xs text-muted-foreground" *ngIf="!isSaving && isDirty">Unsaved changes</p>
            <p class="text-xs text-muted-foreground flex items-center gap-1" *ngIf="!isSaving && !isDirty && lastSaved">
              <lucide-icon name="check" class="w-3 h-3 text-green-500"></lucide-icon>Saved {{ lastSaved }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ui-button
            variant="ghost"
            size="icon"
            [disabled]="!canUndo"
            (click)="undoClick.emit()"
            aria-label="Undo">
            <lucide-icon name="undo" class="w-4 h-4"></lucide-icon>
          </ui-button>

          <ui-button
            variant="ghost"
            size="icon"
            [disabled]="!canRedo"
            (click)="redoClick.emit()"
            aria-label="Redo">
            <lucide-icon name="redo" class="w-4 h-4"></lucide-icon>
          </ui-button>

          <div class="h-6 w-px bg-border mx-1"></div>

          <!-- Device switcher -->
          <div class="flex items-center bg-muted rounded-lg p-0.5">
            <button
              class="p-1.5 rounded-md transition-colors"
              [class.bg-surface]="activeDevice === 'Desktop'"
              [class.shadow-sm]="activeDevice === 'Desktop'"
              [class.text-foreground]="activeDevice === 'Desktop'"
              [class.text-muted-foreground]="activeDevice !== 'Desktop'"
              (click)="deviceChange.emit('Desktop')"
              title="Desktop">
              <lucide-icon name="monitor" class="w-4 h-4"></lucide-icon>
            </button>
            <button
              class="p-1.5 rounded-md transition-colors"
              [class.bg-surface]="activeDevice === 'Tablet'"
              [class.shadow-sm]="activeDevice === 'Tablet'"
              [class.text-foreground]="activeDevice === 'Tablet'"
              [class.text-muted-foreground]="activeDevice !== 'Tablet'"
              (click)="deviceChange.emit('Tablet')"
              title="Tablet">
              <lucide-icon name="tablet" class="w-4 h-4"></lucide-icon>
            </button>
            <button
              class="p-1.5 rounded-md transition-colors"
              [class.bg-surface]="activeDevice === 'Mobile'"
              [class.shadow-sm]="activeDevice === 'Mobile'"
              [class.text-foreground]="activeDevice === 'Mobile'"
              [class.text-muted-foreground]="activeDevice !== 'Mobile'"
              (click)="deviceChange.emit('Mobile')"
              title="Mobile">
              <lucide-icon name="smartphone" class="w-4 h-4"></lucide-icon>
            </button>
          </div>

          <div class="h-6 w-px bg-border mx-1"></div>

          <ui-button variant="outline" (click)="previewClick.emit()">
            <lucide-icon name="eye" class="w-4 h-4 mr-2"></lucide-icon>
            Preview
          </ui-button>

          <ui-button variant="outline" [disabled]="isSaving" (click)="saveClick.emit()">
            <lucide-icon name="save" class="w-4 h-4 mr-2"></lucide-icon>
            Save
          </ui-button>

          <ng-container *ngIf="websiteStatus === 'DRAFT' || websiteStatus == null">
            <ui-button [disabled]="isSaving || isPublishing" (click)="publishClick.emit()">
              <lucide-icon *ngIf="isPublishing" name="loader-2" class="w-4 h-4 mr-2 animate-spin"></lucide-icon>
              {{ isPublishing ? 'Publishing...' : 'Publish' }}
            </ui-button>
            <ui-button variant="ghost" size="icon" (click)="publishHistoryClick.emit()" title="Publish History">
              <lucide-icon name="history" class="w-4 h-4"></lucide-icon>
            </ui-button>
          </ng-container>

          <ng-container *ngIf="websiteStatus === 'ARCHIVED'">
            <ui-button variant="ghost" size="icon" (click)="publishHistoryClick.emit()" title="Publish History">
              <lucide-icon name="history" class="w-4 h-4"></lucide-icon>
            </ui-button>
          </ng-container>

          <ng-container *ngIf="websiteStatus === 'PUBLISHED'">
            <ui-button variant="outline" (click)="viewLiveClick.emit()">
              <lucide-icon name="external-link" class="w-4 h-4 mr-2"></lucide-icon>
              View Live
            </ui-button>
            <ui-button [disabled]="isSaving || isRepublishing" (click)="republishClick.emit()">
              <lucide-icon *ngIf="isRepublishing" name="loader-2" class="w-4 h-4 mr-2 animate-spin"></lucide-icon>
              {{ isRepublishing ? 'Republishing...' : 'Republish' }}
            </ui-button>
            <ui-button variant="destructive" [disabled]="isUnpublishing" (click)="unpublishClick.emit()">
              <lucide-icon *ngIf="isUnpublishing" name="loader-2" class="w-4 h-4 mr-2 animate-spin"></lucide-icon>
              {{ isUnpublishing ? 'Unpublishing...' : 'Unpublish' }}
            </ui-button>
            <ui-button variant="ghost" size="icon" (click)="publishHistoryClick.emit()" title="Publish History">
              <lucide-icon name="history" class="w-4 h-4"></lucide-icon>
            </ui-button>
          </ng-container>
        </div>
      </header>

      <div class="flex-1 flex flex-col overflow-hidden">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class EditorLayoutComponent {
  @Input() websiteName: string = 'Untitled Website';
  @Input() isSaving: boolean = false;
  @Input() isPublishing: boolean = false;
  @Input() lastSaved: string | null = null;
  @Input() canUndo: boolean = false;
  @Input() canRedo: boolean = false;
  @Input() isDirty: boolean = false;
  @Input() activeDevice: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop';
  @Input() websiteStatus: WebsiteStatus | null = null;
  @Input() isRepublishing: boolean = false;
  @Input() isUnpublishing: boolean = false;

  @Output() saveClick = new EventEmitter<void>();
  @Output() publishClick = new EventEmitter<void>();
  @Output() undoClick = new EventEmitter<void>();
  @Output() redoClick = new EventEmitter<void>();
  @Output() backClick = new EventEmitter<void>();
  @Output() previewClick = new EventEmitter<void>();
  @Output() deviceChange = new EventEmitter<'Desktop' | 'Tablet' | 'Mobile'>();
  @Output() nameChange = new EventEmitter<string>();
  @Output() republishClick = new EventEmitter<void>();
  @Output() unpublishClick = new EventEmitter<void>();
  @Output() viewLiveClick = new EventEmitter<void>();
  @Output() publishHistoryClick = new EventEmitter<void>();

  isEditingName = false;
  editingNameValue = '';

  startEditName(): void {
    this.editingNameValue = this.websiteName;
    this.isEditingName = true;
  }

  commitName(): void {
    const trimmed = this.editingNameValue.trim();
    if (trimmed && trimmed !== this.websiteName) {
      this.nameChange.emit(trimmed);
    }
    this.isEditingName = false;
  }

  onNameKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.commitName();
    } else if (event.key === 'Escape') {
      this.isEditingName = false;
    }
  }
}