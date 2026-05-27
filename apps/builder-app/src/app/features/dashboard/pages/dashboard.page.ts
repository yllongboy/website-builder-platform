import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WebsiteApiService } from '../../websites/data-access/website-api.service';
import { WebsiteSummary } from '@platform/shared-models';
import { AppLayoutComponent, ButtonComponent, CardComponent, BadgeComponent, InputComponent, ModalComponent, EmptyStateComponent, SkeletonComponent } from '@platform/ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, AppLayoutComponent, ButtonComponent, CardComponent, BadgeComponent, InputComponent, ModalComponent, EmptyStateComponent, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-app-layout>
      <div class="max-w-7xl mx-auto flex flex-col gap-6 p-6 animate-fade-in">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-foreground">My Websites</h1>
            <p class="text-foreground-secondary mt-1">Manage and organize all your websites</p>
          </div>
          <ui-button (click)="goToCreateWebsite()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 lucide lucide-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Website
          </ui-button>
        </div>

        @if (loading) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (i of [1,2,3]; track i) {
              <ui-skeleton class="h-64 rounded-xl" />
            }
          </div>
        } @else if (loadError) {
          <div class="p-8 text-center text-destructive bg-destructive/10 rounded-xl">
            {{ loadError }}
          </div>
        } @else if (websites.length === 0) {
          <ui-empty-state
            title="No websites yet"
            description="Create your first website to get started. It only takes a few minutes!"
            actionLabel="Create Website"
            (actionClick)="goToCreateWebsite()"
          >
            <svg icon xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </ui-empty-state>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (site of websites; track site.id) {
              <ui-card hover="true" padding="none" class="group overflow-hidden">
                <div class="relative aspect-video bg-muted overflow-hidden">
                  @if (site.thumbnailUrl) {
                    <img [src]="site.thumbnailUrl" [alt]="site.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  } @else {
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                  }
                  
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div class="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ui-button size="sm" class="flex-1" [disabled]="!!actionInProgress" (click)="goToEdit(site.id)">Edit</ui-button>
                    @if (site.status === 'published' || site.status === 'PUBLISHED') {
                      @if (site.publishedUrl) {
                        @if (site.publishedUrl.startsWith('https://')) {
                          <a [href]="site.publishedUrl" target="_blank" rel="noopener noreferrer" class="flex-1">
                            <ui-button size="sm" class="w-full" variant="outline" [disabled]="!!actionInProgress">
                              View Live
                            </ui-button>
                          </a>
                        } @else {
                          <span class="text-foreground-muted text-[13px]">{{ site.publishedUrl }}</span>
                        }
                      }
                    }
                  </div>
                </div>

                <div class="p-4">
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      @if (editingId === site.id) {
                        <div class="flex items-center gap-2">
                          <ui-input
                            [value]="editingName"
                            (valueChange)="editingName = $event"
                            (keydown.enter)="confirmRename(site.id)"
                            (keydown.escape)="cancelRename()"
                            class="flex-1"
                          />
                          <ui-button size="sm" variant="ghost" (click)="cancelRename()">Cancel</ui-button>
                          <ui-button size="sm" [isLoading]="actionInProgress === site.id" (click)="confirmRename(site.id)">Save</ui-button>
                        </div>
                      } @else {
                        <h3 class="font-semibold text-foreground truncate">{{ site.name }}</h3>
                        <p class="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {{ site.updatedAt | date:'mediumDate' }}
                        </p>
                      }
                    </div>
                    
                    @if (editingId !== site.id) {
                      <div class="flex flex-col items-end gap-2">
                        <ui-badge [variant]="(site.status === 'published' || site.status === 'PUBLISHED') ? 'success' : 'default'">
                          {{ (site.status === 'published' || site.status === 'PUBLISHED') ? 'Live' : 'Draft' }}
                        </ui-badge>
                        
                        <div class="flex items-center gap-1">
                          <ui-button variant="ghost" size="sm" class="h-8 w-8 p-0" title="Rename" (click)="startRename(site)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </ui-button>
                          <ui-button variant="ghost" size="sm" class="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete" (click)="startDelete(site.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                          </ui-button>
                        </div>
                      </div>
                    }
                  </div>
                  @if (actionError[site.id]) {
                    <div class="mt-2 text-sm text-destructive">{{ actionError[site.id] }}</div>
                  }
                </div>
              </ui-card>
            }
          </div>
        }
      </div>

      <ui-modal
        [isOpen]="confirmDeleteId !== null"
        (close)="cancelDelete()"
        title="Delete Website"
        description="This action cannot be undone. Are you sure you want to delete this website?"
      >
        <div class="flex justify-end gap-3 mt-4">
          <ui-button variant="outline" (click)="cancelDelete()" [disabled]="!!actionInProgress">
            Cancel
          </ui-button>
          <ui-button variant="destructive" [isLoading]="!!actionInProgress" (click)="executeDelete(confirmDeleteId!)">
            Delete
          </ui-button>
        </div>
      </ui-modal>
    </ui-app-layout>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class DashboardPage implements OnInit {
  private readonly websiteApi = inject(WebsiteApiService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  websites: WebsiteSummary[] = [];
  loading = true;
  loadError: string | null = null;

  editingId: string | null = null;
  editingName = '';
  confirmDeleteId: string | null = null;
  actionInProgress: string | null = null;
  actionError: Record<string, string> = {};

  ngOnInit(): void {
    this.websiteApi.getMyWebsites().subscribe({
      next: (sites) => {
        this.websites = sites;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadError = 'Failed to load websites. Please refresh.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goToCreateWebsite(): void {
    this.router.navigate(['/templates']);
  }

  goToEdit(siteId: string): void {
    this.router.navigate(['/editor', siteId]);
  }

  startRename(site: WebsiteSummary): void {
    this.editingId = site.id;
    this.editingName = site.name;
    this.confirmDeleteId = null;
    this.cdr.markForCheck();
  }

  cancelRename(): void {
    this.editingId = null;
    this.editingName = '';
    this.cdr.markForCheck();
  }

  confirmRename(siteId: string): void {
    if (this.actionInProgress || !this.editingName.trim()) {
      this.cancelRename();
      return;
    }
    const newName = this.editingName.trim();
    this.actionInProgress = siteId;
    this.actionError = { ...this.actionError, [siteId]: '' };

    this.websiteApi.renameWebsite(siteId, newName).subscribe({
      next: (updated) => {
        this.websites = this.websites.map(s => s.id === siteId ? updated : s);
        this.editingId = null;
        this.editingName = '';
        this.actionInProgress = null;
        this.cdr.markForCheck();
      },
      error: () => {
        this.actionError = { ...this.actionError, [siteId]: 'Rename failed. Please try again.' };
        this.editingId = null;
        this.editingName = '';
        this.actionInProgress = null;
        this.cdr.markForCheck();
      }
    });
  }

  startDelete(siteId: string): void {
    this.confirmDeleteId = siteId;
    this.editingId = null;
    this.cdr.markForCheck();
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
    this.cdr.markForCheck();
  }

  executeDelete(siteId: string): void {
    if (this.actionInProgress) return;
    this.actionInProgress = siteId;
    this.actionError = { ...this.actionError, [siteId]: '' };
    this.cdr.markForCheck();

    this.websiteApi.deleteWebsite(siteId).subscribe({
      next: () => {
        this.websites = this.websites.filter(s => s.id !== siteId);
        this.confirmDeleteId = null;
        this.actionInProgress = null;
        this.cdr.markForCheck();
      },
      error: () => {
        this.actionError = { ...this.actionError, [siteId]: 'Delete failed. Please try again.' };
        this.confirmDeleteId = null;
        this.actionInProgress = null;
        this.cdr.markForCheck();
      }
    });
  }
}
