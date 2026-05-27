import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsiteAdminApiService } from '../data-access/website-admin-api.service';
import { AdminWebsiteResponse, WebsiteStatusUpdate } from '@platform/shared-models';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'app-website-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 relative">
      <!-- Page Header -->
      <div>
        <h1 class="text-[18px] font-semibold text-foreground tracking-tight leading-7">Websites</h1>
        <p class="text-[13px] text-foreground-muted mt-0.5 leading-5">Manage all websites created by users</p>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-1.5">
        <div class="relative flex-1 min-w-56">
          <wb-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/60"></wb-icon>
          <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="applyFilters()" placeholder="Search websites or owners..."
            class="bg-muted/40 border-0 rounded-md text-[12px] px-3 py-1.5 w-full text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-primary/30 pl-9" />
        </div>
        <select [(ngModel)]="statusFilter" (ngModelChange)="applyFilters()"
          class="bg-muted/40 border-0 rounded-md text-[12px] px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30">
          <option value="">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <button *ngIf="searchQuery || statusFilter" type="button" (click)="clearFilters()"
          class="inline-flex items-center gap-1.5 text-foreground-muted hover:bg-muted/70 rounded-md px-2.5 py-1 text-xs">
          <wb-icon name="x" [size]="14"></wb-icon>Clear
        </button>
      </div>

      <div *ngIf="loading" class="py-16 text-center text-foreground-muted">Loading websites...</div>
      <div *ngIf="error" class="bg-destructive/10 text-destructive rounded-xl p-4 text-[13px]">{{ error }}</div>

      <div *ngIf="!loading && filteredWebsites.length === 0 && !error" class="py-16 text-center text-foreground-muted">No websites found.</div>

      <section *ngIf="!loading && filteredWebsites.length > 0" class="bg-background border border-border/70 rounded-md overflow-hidden">
        <table class="min-w-full divide-y divide-border">
          <thead class="border-b border-border/70">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Website</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Owner</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Status</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Page Views</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Last Updated</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr *ngFor="let site of filteredWebsites" class="hover:bg-muted/25 transition-colors duration-100">
              <td class="px-4 py-3.5 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <wb-icon name="globe" [size]="20" className="text-primary"></wb-icon>
                  </div>
                  <div>
                    <p class="text-[13px] font-medium text-foreground">{{ site.name }}</p>
                    <p class="text-xs text-foreground-muted">—</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground">{{ site.ownerEmail }}</td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <app-status-badge [status]="site.status" type="website"></app-status-badge>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground">
                <span class="text-foreground-muted">—</span>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground-muted">{{ site.updatedAt | date:'mediumDate' }}</td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <button type="button" (click)="openViewModal(site)" class="p-1.5 rounded-md hover:bg-muted text-foreground-muted transition-colors" aria-label="View details">
                    <wb-icon name="eye" [size]="16"></wb-icon>
                  </button>
                  <a *ngIf="site.status === 'PUBLISHED' && site.publishedUrl?.startsWith('https://')" [href]="site.publishedUrl" target="_blank" rel="noopener noreferrer"
                     class="p-1.5 rounded-md hover:bg-muted text-primary transition-colors" aria-label="Open published site">
                    <wb-icon name="external" [size]="16"></wb-icon>
                  </a>
                  <span *ngIf="site.status === 'PUBLISHED' && !isSafeUrl(site.publishedUrl)" class="text-foreground-muted text-[13px]">{{ site.publishedUrl }}</span>
                  <button type="button" *ngIf="site.status === 'PUBLISHED'" (click)="openUnpublishModal(site)" class="p-1.5 rounded-md hover:bg-muted text-warning transition-colors" aria-label="Unpublish website">
                    <wb-icon name="ban" [size]="16"></wb-icon>
                  </button>
                  <button type="button" *ngIf="site.status !== 'ARCHIVED'" (click)="openArchiveModal(site)" [disabled]="isUpdating(site.id)"
                    class="p-1.5 rounded-md hover:bg-muted text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Archive website">
                    <wb-icon name="trash" [size]="16"></wb-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- View Website Modal -->
      <div *ngIf="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" (click)="closeViewModal()"></div>
        <div class="bg-background border border-border shadow-lg rounded-xl w-full max-w-lg relative flex flex-col" role="dialog" aria-modal="true">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 class="text-lg font-semibold text-foreground">Website Details</h2>
            <button type="button" (click)="closeViewModal()" class="text-foreground-muted hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted" aria-label="Close">
              <wb-icon name="x" [size]="16"></wb-icon>
            </button>
          </div>
          <div class="p-6 flex flex-col gap-6">
            <div class="flex flex-col items-center gap-3 text-center">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <wb-icon name="globe" [size]="28" className="text-primary"></wb-icon>
              </div>
              <div>
                <p class="text-base font-semibold text-foreground">{{ selectedWebsite?.name }}</p>
                <p class="text-sm text-foreground-muted">by {{ selectedWebsite?.ownerEmail }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <p class="text-[11px] font-medium text-foreground-muted uppercase tracking-wider mb-1.5">Status</p>
                <app-status-badge *ngIf="selectedWebsite" [status]="selectedWebsite.status" type="website"></app-status-badge>
              </div>
              <div>
                <p class="text-[11px] font-medium text-foreground-muted uppercase tracking-wider mb-1.5">Template</p>
                <p class="text-[13px] text-foreground">—</p>
              </div>
              <div>
                <p class="text-[11px] font-medium text-foreground-muted uppercase tracking-wider mb-1.5">Page Views</p>
                <p class="text-[13px] text-foreground">—</p>
              </div>
              <div>
                <p class="text-[11px] font-medium text-foreground-muted uppercase tracking-wider mb-1.5">Last Updated</p>
                <p class="text-[13px] text-foreground">{{ selectedWebsite?.updatedAt | date:'mediumDate' }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-[11px] font-medium text-foreground-muted uppercase tracking-wider mb-1.5">Published URL</p>
                <a *ngIf="selectedWebsite?.publishedUrl?.startsWith('https://')" [href]="selectedWebsite?.publishedUrl" target="_blank" rel="noopener noreferrer" class="text-[13px] text-primary hover:underline">
                  {{ selectedWebsite?.publishedUrl }}
                </a>
                <span *ngIf="selectedWebsite?.publishedUrl && !selectedWebsite?.publishedUrl?.startsWith('https://')" class="text-foreground-muted text-[13px]">{{ selectedWebsite?.publishedUrl }}</span>
                <p *ngIf="!selectedWebsite?.publishedUrl" class="text-[13px] text-foreground">—</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Unpublish Confirm Modal -->
      <div *ngIf="showUnpublishModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" (click)="closeUnpublishModal()"></div>
        <div class="bg-background border border-border shadow-lg rounded-xl w-full max-w-sm relative flex flex-col" role="dialog" aria-modal="true">
          <div class="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <h2 class="text-[15px] font-semibold text-foreground tracking-tight">Unpublish Website</h2>
            <button type="button" (click)="closeUnpublishModal()" class="text-foreground-muted hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted" aria-label="Close">
              <wb-icon name="x" [size]="16"></wb-icon>
            </button>
          </div>
          <div class="p-5 text-[13px] text-foreground-muted leading-relaxed">
            Are you sure you want to unpublish "{{ selectedWebsite?.name }}"? This will take the site offline.
          </div>
          <div class="px-5 py-4 flex items-center justify-end gap-3 border-t border-border/50 bg-muted/20 rounded-b-xl">
            <button type="button" (click)="closeUnpublishModal()" class="px-3.5 py-1.5 text-[13px] font-medium text-foreground hover:bg-muted/80 rounded-md transition-colors">
              Cancel
            </button>
            <button type="button" (click)="confirmUnpublish()" class="px-3.5 py-1.5 text-[13px] font-medium bg-warning text-white hover:bg-warning/90 rounded-md transition-colors shadow-sm">
              Unpublish
            </button>
          </div>
        </div>
      </div>

      <!-- Archive Confirm Modal -->
      <div *ngIf="showArchiveModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" (click)="closeArchiveModal()"></div>
        <div class="bg-background border border-border shadow-lg rounded-xl w-full max-w-sm relative flex flex-col" role="dialog" aria-modal="true">
          <div class="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <h2 class="text-[15px] font-semibold text-foreground tracking-tight">Archive Website</h2>
            <button type="button" (click)="closeArchiveModal()" class="text-foreground-muted hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted" aria-label="Close">
              <wb-icon name="x" [size]="16"></wb-icon>
            </button>
          </div>
          <div class="p-5 text-[13px] text-foreground-muted leading-relaxed">
            Are you sure you want to archive "{{ selectedWebsite?.name }}"? This will hide it from the user's dashboard.
          </div>
          <div class="px-5 py-4 flex items-center justify-end gap-3 border-t border-border/50 bg-muted/20 rounded-b-xl">
            <button type="button" (click)="closeArchiveModal()" class="px-3.5 py-1.5 text-[13px] font-medium text-foreground hover:bg-muted/80 rounded-md transition-colors">
              Cancel
            </button>
            <button type="button" (click)="confirmArchive()" class="px-3.5 py-1.5 text-[13px] font-medium bg-destructive text-white hover:bg-destructive/90 rounded-md transition-colors shadow-sm">
              Archive Website
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WebsiteAdminListPage implements OnInit {
  private readonly websiteAdminApi = inject(WebsiteAdminApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  websites: AdminWebsiteResponse[] = [];
  loading = true;
  error: string | null = null;
  updatingIds = new Set<string>();

  searchQuery = '';
  statusFilter = '';
  filteredWebsites: AdminWebsiteResponse[] = [];

  selectedWebsite: AdminWebsiteResponse | null = null;
  showViewModal = false;
  showUnpublishModal = false;
  showArchiveModal = false;

  ngOnInit(): void {
    this.loadWebsites();
  }

  loadWebsites(): void {
    this.loading = true;
    this.error = null;
    this.websiteAdminApi.getWebsites().subscribe({
      next: (sites) => {
        this.websites = sites;
        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load websites.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  applyFilters(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredWebsites = this.websites.filter(site =>
      (!q || site.name.toLowerCase().includes(q) || site.ownerEmail.toLowerCase().includes(q)) &&
      (!this.statusFilter || site.status === this.statusFilter)
    );
    this.cdr.markForCheck();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  isUpdating(id: string): boolean {
    return this.updatingIds.has(id);
  }

  updateStatus(site: AdminWebsiteResponse, status: WebsiteStatusUpdate): void {
    this.updatingIds.add(site.id);
    this.websiteAdminApi.updateStatus(site.id, { status }).subscribe({
      next: () => {
        this.updatingIds.delete(site.id);
        this.loadWebsites();
      },
      error: () => {
        this.updatingIds.delete(site.id);
        this.error = 'Failed to update website status. Please try again.';
        this.cdr.markForCheck();
      }
    });
  }

  openViewModal(site: AdminWebsiteResponse): void {
    this.selectedWebsite = site;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedWebsite = null;
  }

  openUnpublishModal(site: AdminWebsiteResponse): void {
    this.selectedWebsite = site;
    this.showUnpublishModal = true;
  }

  closeUnpublishModal(): void {
    this.showUnpublishModal = false;
    this.selectedWebsite = null;
  }

  openArchiveModal(site: AdminWebsiteResponse): void {
    this.selectedWebsite = site;
    this.showArchiveModal = true;
  }

  closeArchiveModal(): void {
    this.showArchiveModal = false;
    this.selectedWebsite = null;
  }

  confirmUnpublish(): void {
    if (this.selectedWebsite) {
      this.updateStatus(this.selectedWebsite, 'DRAFT');
      this.closeUnpublishModal();
    }
  }

  confirmArchive(): void {
    if (this.selectedWebsite) {
      this.updateStatus(this.selectedWebsite, 'ARCHIVED');
      this.closeArchiveModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.showViewModal = false;
    this.showUnpublishModal = false;
    this.showArchiveModal = false;
    this.selectedWebsite = null;
    this.cdr.markForCheck();
  }

  isSafeUrl(url: string | null | undefined): boolean {
    if (!url) return false;
    return url.startsWith('https://');
  }
}
