import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription, switchMap } from 'rxjs';
import { GrapesEditorComponent, GrapesContent } from '@platform/editor';
import { EditorLayoutComponent, ToastComponent, ModalComponent, ButtonComponent } from '@platform/ui';
import { EditorApiService } from '../data-access/editor-api.service';
import { WebsiteApiService } from '../../websites/data-access/website-api.service';
import { EditorStateResponse, WebsiteStatus, PublishLogResponse } from '@platform/shared-models';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [CommonModule, GrapesEditorComponent, EditorLayoutComponent, ToastComponent, ModalComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-editor-layout
      [websiteName]="websiteName"
      [isSaving]="isSaving"
      [isPublishing]="isPublishing"
      [lastSaved]="lastSaved"
      [canUndo]="canUndo"
      [canRedo]="canRedo"
      [isDirty]="isDirty"
      [activeDevice]="activeDevice"
      [websiteStatus]="websiteStatus"
      [isRepublishing]="isRepublishing"
      [isUnpublishing]="isUnpublishing"
      (saveClick)="manualSave()"
      (publishClick)="publish()"
      (republishClick)="republish()"
      (unpublishClick)="showUnpublishModal = true"
      (viewLiveClick)="openViewLive()"
      (publishHistoryClick)="openPublishHistory()"
      (undoClick)="undo()"
      (redoClick)="redo()"
      (backClick)="goBack()"
      (previewClick)="openPreview()"
      (deviceChange)="onDeviceChange($event)"
      (nameChange)="onNameChange($event)">

      <app-grapes-editor *ngIf="!loading && initialContent"
        [initialContent]="initialContent!"
        (contentChange)="onContentChange($event)"
        (ready)="onEditorReady($event)"
        class="h-full w-full">
      </app-grapes-editor>

      <div *ngIf="loading" class="flex-1 flex items-center justify-center h-full">
        <p class="text-muted-foreground">Loading editor...</p>
      </div>
      <div *ngIf="loadError" class="flex-1 flex items-center justify-center h-full">
        <p class="text-destructive">{{ loadError }}</p>
      </div>
    </ui-editor-layout>

    <ui-modal
      [isOpen]="showUnpublishModal"
      (close)="showUnpublishModal = false"
      title="Unpublish Website"
      description="This will take your website offline. Visitors will no longer be able to see it. Are you sure?">
      <div class="flex justify-end gap-3 mt-4">
        <ui-button variant="outline" (click)="showUnpublishModal = false" [disabled]="isUnpublishing">
          Cancel
        </ui-button>
        <ui-button variant="destructive" [isLoading]="isUnpublishing" (click)="unpublish()">
          Unpublish
        </ui-button>
      </div>
    </ui-modal>

    <ui-modal
      [isOpen]="showPublishHistory"
      (close)="showPublishHistory = false"
      title="Publish History">
      <div class="space-y-4 max-h-[60vh] overflow-y-auto">
        <div *ngIf="isLoadingLogs" class="flex items-center justify-center p-4">
          <p class="text-muted-foreground">Loading history...</p>
        </div>
        <div *ngIf="!isLoadingLogs && publishLogs.length === 0" class="flex items-center justify-center p-4">
          <p class="text-muted-foreground">No publish history found.</p>
        </div>
        <div *ngIf="!isLoadingLogs && publishLogs.length > 0" class="flex flex-col gap-3">
          <div *ngFor="let log of publishLogs" class="p-3 border border-border rounded-lg bg-surface">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">Version {{ log.version }}</p>
                <p class="text-sm text-muted-foreground">{{ log.timestamp | date:'medium' }}</p>
                <p class="text-sm mt-1" [class.text-green-500]="log.status === 'SUCCESS'" [class.text-red-500]="log.status === 'FAILED'">
                  Status: {{ log.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <ui-button (click)="showPublishHistory = false">Close</ui-button>
      </div>
    </ui-modal>

    <ui-toast 
      [visible]="toastVisible" 
      [message]="toastMessage" 
      [type]="toastType" 
      (dismiss)="toastVisible = false">
    </ui-toast>
  `,
})
export class EditorPage implements OnInit, OnDestroy {
  @ViewChild(GrapesEditorComponent) private editorComponent?: GrapesEditorComponent;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly editorApi = inject(EditorApiService);
  private readonly websiteApi = inject(WebsiteApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  websiteId!: string;
  websiteName = 'Untitled Website';
  initialContent: GrapesContent | null = null;
  loading = true;
  loadError: string | null = null;

  isDirty = false;
  isSaving = false;
  isPublishing = false;
  lastSaved: string | null = null;
  
  websiteStatus: WebsiteStatus | null = null;
  publishedUrl: string | null = null;
  isRepublishing = false;
  isUnpublishing = false;
  showUnpublishModal = false;
  showPublishHistory = false;
  isLoadingLogs = false;
  publishLogs: PublishLogResponse[] = [];

  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  private autosaveSubscription?: Subscription;
  private currentContent: GrapesContent | null = null;

  private grapesEditor: any = null;
  canUndo = false;
  canRedo = false;
  activeDevice: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop';

  ngOnInit(): void {
    this.websiteId = this.route.snapshot.paramMap.get('websiteId') ?? '';

    if (this.websiteId && this.websiteId !== 'new') {
      this.editorApi.loadEditorState(this.websiteId).subscribe({
        next: (state: EditorStateResponse) => {
          this.initialContent = {
            html: state.htmlContent,
            css: state.cssContent ?? '',
            editorState: state.editorState as Record<string, unknown> | null,
          };
          this.websiteName = state.name || 'Untitled Website';
          this.websiteStatus = state.websiteStatus ?? null;
          const url = state.publishedUrl ?? null;
          this.publishedUrl = url && /^https?:\/\//i.test(url) ? url : null;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.loadError = err?.status === 403
            ? 'You do not have permission to edit this website.'
            : 'Failed to load editor. Please try again.';
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
    } else {
      this.initialContent = { html: '', css: '', editorState: null };
      this.loading = false;
      this.cdr.markForCheck();
    }

    this.autosaveSubscription = interval(30000).subscribe(() => {
      if (this.isDirty && !this.isSaving) {
        this.save();
      }
    });
  }

  ngOnDestroy(): void {
    this.autosaveSubscription?.unsubscribe();
  }

  onContentChange(content: GrapesContent): void {
    this.currentContent = content;
    this.isDirty = true;
    this.updateUndoRedoState();
    this.cdr.markForCheck();
  }

  onEditorReady(editor: any): void {
    this.grapesEditor = editor;
    if (!this.currentContent && this.initialContent) {
      this.currentContent = structuredClone(this.initialContent);
    }
    this.updateUndoRedoState();
    this.cdr.markForCheck();
  }

  async manualSave(): Promise<void> {
    await this.editorComponent?.flushCurrentContent();
    this.save();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  openPreview(): void {
    if (this.websiteId === 'new') {
      this.toastMessage = 'Please save your website first before previewing.';
      this.toastType = 'info';
      this.toastVisible = true;
      this.cdr.markForCheck();
      return;
    }
    this.router.navigate(['/preview', this.websiteId]);
  }

  onDeviceChange(device: 'Desktop' | 'Tablet' | 'Mobile'): void {
    this.activeDevice = device;
    if (this.grapesEditor) {
      const deviceMap: Record<string, string> = {
        Desktop: 'Desktop',
        Tablet: 'Tablet',
        Mobile: 'Mobile portrait',
      };
      this.grapesEditor.setDevice(deviceMap[device]);
    }
    this.cdr.markForCheck();
  }

  onNameChange(name: string): void {
    const previous = this.websiteName;
    this.websiteName = name;
    this.cdr.markForCheck();
    if (this.websiteId && this.websiteId !== 'new') {
      this.editorApi.updateWebsiteName(this.websiteId, name).subscribe({
        error: () => {
          this.websiteName = previous;
          this.cdr.markForCheck();
        },
      });
    }
  }

  private save(): void {
    if (!this.currentContent || !this.websiteId) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this.cdr.markForCheck();

    const doSave = (id: string) =>
      this.editorApi.saveEditorState(id, {
        htmlContent: this.currentContent!.html,
        cssContent: this.currentContent!.css,
        editorState: this.currentContent!.editorState,
      });

    const save$ = this.websiteId === 'new'
      ? this.websiteApi.createBlankWebsite(this.websiteName).pipe(
          switchMap((created) => {
            this.websiteId = created.id;
            this.router.navigate(['/editor', created.id], { replaceUrl: true });
            return doSave(created.id);
          })
        )
      : doSave(this.websiteId);

    save$.subscribe({
      next: (response) => {
        this.isDirty = false;
        this.isSaving = false;
        this.lastSaved = new Date(response.savedAt).toLocaleTimeString();
        this.cdr.markForCheck();
      },
      error: () => {
        this.isSaving = false;
        this.cdr.markForCheck();
      },
    });
  }

  publish(): void {
    if (!this.websiteId || this.websiteId === 'new') return;
    this.isPublishing = true;
    this.cdr.markForCheck();

    this.websiteApi.publish(this.websiteId).subscribe({
      next: (response) => {
        this.isPublishing = false;
        this.websiteStatus = 'PUBLISHED';
        if (response.publishedUrl) {
          const url = response.publishedUrl;
          this.publishedUrl = url && /^https?:\/\//i.test(url) ? url : null;
        }
        this.toastMessage = 'Website published successfully!';
        this.toastType = 'success';
        this.toastVisible = true;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isPublishing = false;
        if (err?.status === 402 || err?.error?.code === 'SUBSCRIPTION_REQUIRED') {
          this.toastMessage = 'An active subscription is required to publish. Upgrade your plan.';
          this.toastType = 'error';
          this.toastVisible = true;
          this.cdr.markForCheck();
          
          setTimeout(() => {
            this.router.navigate(['/billing']);
          }, 2000);
        } else {
          this.toastMessage = 'Failed to publish website. Please try again.';
          this.toastType = 'error';
          this.toastVisible = true;
          this.cdr.markForCheck();
        }
      }
    });
  }

  republish(): void {
    if (!this.websiteId || this.websiteId === 'new') return;
    this.isRepublishing = true;
    this.cdr.markForCheck();

    this.websiteApi.republish(this.websiteId).subscribe({
      next: (response) => {
        this.isRepublishing = false;
        this.websiteStatus = 'PUBLISHED';
        if (response.publishedUrl) {
          const url = response.publishedUrl;
          this.publishedUrl = url && /^https?:\/\//i.test(url) ? url : null;
        }
        this.toastMessage = 'Website republished successfully!';
        this.toastType = 'success';
        this.toastVisible = true;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isRepublishing = false;
        if (err?.status === 402 || err?.error?.code === 'SUBSCRIPTION_REQUIRED') {
          this.toastMessage = 'An active subscription is required to publish. Upgrade your plan.';
          this.toastType = 'error';
          this.toastVisible = true;
          this.cdr.markForCheck();
          
          setTimeout(() => {
            this.router.navigate(['/billing']);
          }, 2000);
        } else {
          this.toastMessage = 'Failed to republish website. Please try again.';
          this.toastType = 'error';
          this.toastVisible = true;
          this.cdr.markForCheck();
        }
      }
    });
  }

  unpublish(): void {
    if (!this.websiteId || this.websiteId === 'new') return;
    this.isUnpublishing = true;
    this.cdr.markForCheck();

    this.websiteApi.unpublish(this.websiteId).subscribe({
      next: () => {
        this.isUnpublishing = false;
        this.showUnpublishModal = false;
        this.websiteStatus = 'DRAFT';
        this.publishedUrl = null;
        this.toastMessage = 'Website unpublished successfully!';
        this.toastType = 'success';
        this.toastVisible = true;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isUnpublishing = false;
        this.showUnpublishModal = false;
        this.toastMessage = 'Failed to unpublish website. Please try again.';
        this.toastType = 'error';
        this.toastVisible = true;
        this.cdr.markForCheck();
      }
    });
  }

  openViewLive(): void {
    if (this.publishedUrl && /^https?:\/\//i.test(this.publishedUrl)) {
      window.open(this.publishedUrl, '_blank', 'noopener,noreferrer');
    }
  }

  openPublishHistory(): void {
    if (!this.websiteId || this.websiteId === 'new') return;
    this.showPublishHistory = true;
    this.isLoadingLogs = true;
    this.publishLogs = [];
    this.cdr.markForCheck();

    this.websiteApi.getPublishLogs(this.websiteId).subscribe({
      next: (logs) => {
        this.publishLogs = logs;
        this.isLoadingLogs = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoadingLogs = false;
        this.toastMessage = 'Failed to load publish history.';
        this.toastType = 'error';
        this.toastVisible = true;
        this.cdr.markForCheck();
      }
    });
  }

  undo(): void {
    if (this.grapesEditor) {
      this.grapesEditor.UndoManager?.undo();
      this.updateUndoRedoState();
      this.cdr.markForCheck();
    }
  }

  redo(): void {
    if (this.grapesEditor) {
      this.grapesEditor.UndoManager?.redo();
      this.updateUndoRedoState();
      this.cdr.markForCheck();
    }
  }

  private updateUndoRedoState(): void {
    if (this.grapesEditor?.UndoManager) {
      this.canUndo = this.grapesEditor.UndoManager.hasUndo();
      this.canRedo = this.grapesEditor.UndoManager.hasRedo();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.isDirty) {
      event.preventDefault();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        this.undo();
      } else if (event.key === 'y' || (event.key === 'z' && event.shiftKey)) {
        event.preventDefault();
        this.redo();
      } else if (event.key === 's') {
        event.preventDefault();
        this.manualSave();
      }
    }
  }
}
