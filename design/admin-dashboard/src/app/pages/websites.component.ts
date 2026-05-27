import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mockWebsites } from '../mock-data';
import type { Website } from '../models';
import { BadgeComponent, BadgeVariant, ConfirmModalComponent, LayoutComponent, ModalComponent } from '../ui.component';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-websites',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent, BadgeComponent, ModalComponent, ConfirmModalComponent, IconComponent],
  template: `
    <app-layout><div class="flex flex-col gap-6">
      <div><h1 class="text-xl font-semibold text-foreground tracking-tight">Websites</h1><p class="text-[13px] text-muted-foreground mt-0.5">Manage all websites created by users</p></div>
      <section class="bg-background border border-border/70 rounded-lg p-4 flex flex-wrap items-center gap-2.5"><div class="relative flex-1 min-w-56"><app-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"></app-icon><input [(ngModel)]="searchQuery" placeholder="Search websites or owners..." class="w-full pl-9 pr-4 py-1.5 text-[13px] bg-muted/40 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30"></div><select [(ngModel)]="statusFilter" class="px-2.5 py-1.5 text-[13px] bg-muted/40 border-0 rounded-md"><option value="">All Statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="under_review">Under Review</option><option value="suspended">Suspended</option></select><button *ngIf="searchQuery || statusFilter" (click)="searchQuery=''; statusFilter=''" class="text-xs text-foreground-muted hover:bg-muted/70 rounded-md px-2.5 py-1">Clear</button></section>
      <section class="bg-background border border-border/70 rounded-lg overflow-hidden"><table class="w-full"><thead class="border-b border-border/70"><tr><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Website</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Owner</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Status</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Page Views</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Last Published</th><th></th></tr></thead><tbody class="divide-y divide-border/50"><tr *ngFor="let site of filteredWebsites" class="hover:bg-muted/40"><td class="px-4 py-2.5"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"><app-icon name="globe" [size]="20" className="text-primary"></app-icon></div><div><p class="font-medium text-[13px]">{{ site.name }}</p><p class="text-xs text-muted-foreground">{{ site.templateName }}</p></div></div></td><td class="px-4 py-2.5 text-[13px] text-muted-foreground">{{ site.owner }}</td><td class="px-4 py-2.5"><app-badge [variant]="statusVariant(site.status)">{{ statusLabel(site.status) }}</app-badge></td><td class="px-4 py-2.5 text-[13px] text-muted-foreground">{{ site.pageViews | number }}</td><td class="px-4 py-2.5 text-[13px] text-muted-foreground">{{ site.lastPublished ? (site.lastPublished | date) : '-' }}</td><td class="px-4 py-2.5"><button (click)="view(site)" class="p-1.5 rounded hover:bg-muted"><app-icon name="eye" [size]="16"></app-icon></button><button *ngIf="site.status === 'published'" class="p-1.5 rounded hover:bg-muted"><app-icon name="external" [size]="16" className="text-primary"></app-icon></button><button (click)="requestDelete(site)" class="p-1.5 rounded hover:bg-muted"><app-icon name="trash" [size]="16" className="text-destructive"></app-icon></button></td></tr></tbody></table><div *ngIf="!filteredWebsites.length" class="py-12 text-center text-sm text-muted-foreground">No websites found.</div></section>
    </div>
    <app-modal [open]="showViewModal" title="Website Details" size="lg" (close)="showViewModal=false"><div *ngIf="selectedWebsite" class="flex flex-col gap-6"><div class="flex items-center gap-4"><div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"><app-icon name="globe" [size]="32" className="text-primary"></app-icon></div><div><h3 class="text-lg font-semibold">{{ selectedWebsite.name }}</h3><p class="text-muted-foreground">by {{ selectedWebsite.owner }}</p></div></div><div class="grid grid-cols-2 gap-4 pt-4 border-t border-border"><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Status</p><app-badge [variant]="statusVariant(selectedWebsite.status)" extraClass="mt-1">{{ statusLabel(selectedWebsite.status) }}</app-badge></div><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Template</p><p class="font-medium mt-1">{{ selectedWebsite.templateName }}</p></div><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Page Views</p><p class="font-medium mt-1">{{ selectedWebsite.pageViews | number }}</p></div><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Created</p><p class="font-medium mt-1">{{ selectedWebsite.createdAt | date }}</p></div></div></div></app-modal>
    <app-confirm-modal [open]="showDeleteModal" title="Delete Website" [message]="'Are you sure you want to delete &quot;' + (selectedWebsite?.name || 'this website') + '&quot;? This action cannot be undone.'" confirmText="Delete Website" (close)="showDeleteModal=false" (confirm)="confirmDelete()"></app-confirm-modal>
    </app-layout>
  `
})
export class WebsitesComponent {
  websites: Website[] = [...mockWebsites];
  searchQuery = '';
  statusFilter = '';
  selectedWebsite: Website | null = null;
  showViewModal = false;
  showDeleteModal = false;
  get filteredWebsites(): Website[] { const q = this.searchQuery.toLowerCase(); return this.websites.filter((site) => (!q || site.name.toLowerCase().includes(q) || site.owner.toLowerCase().includes(q)) && (!this.statusFilter || site.status === this.statusFilter)); }
  view(site: Website): void { this.selectedWebsite = site; this.showViewModal = true; }
  requestDelete(site: Website): void { this.selectedWebsite = site; this.showDeleteModal = true; }
  confirmDelete(): void { if (this.selectedWebsite) this.websites = this.websites.filter((site) => site.id !== this.selectedWebsite?.id); }
  statusVariant(status: Website['status']): BadgeVariant { return ({ published: 'success', draft: 'secondary', under_review: 'warning', suspended: 'destructive' })[status] as BadgeVariant; }
  statusLabel(status: Website['status']): string { return ({ published: 'Published', draft: 'Draft', under_review: 'Under Review', suspended: 'Suspended' })[status]; }
}
