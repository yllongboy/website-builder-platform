import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminMetricsApiService } from '../data-access/admin-metrics-api.service';
import { WebsiteAdminApiService } from '../../websites/data-access/website-admin-api.service';
import { AdminMetricsResponse } from '@platform/shared-models';
import { AdminWebsiteResponse } from '@platform/shared-models';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'wb-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-8">

      <!-- Page Header -->
      <div>
        <h1 class="text-[18px] font-semibold text-foreground tracking-tight leading-7">Dashboard</h1>
        <p class="text-[13px] text-foreground-muted mt-0.5 leading-5">Overview of your platform performance</p>
      </div>

      <!-- Loading State -->
      @if (loading()) {
        <p class="text-[13px] text-foreground-muted">Loading metrics...</p>
      } @else if (error()) {
        <p role="alert" class="text-[13px] text-destructive">{{ error() }}</p>
      } @else {
        <!-- KPI Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Users -->
          <div class="bg-background border border-border/70 border-t-2 border-t-primary/50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium text-foreground-muted">Total Users</p>
                <p class="text-[22px] tabular-nums font-semibold text-foreground mt-1 tracking-tight">{{ metrics()?.totalUsers ?? '—' }}</p>
                <p class="text-xs mt-3 flex items-center gap-1">
                  <span class="font-medium text-foreground-muted">{{ formatGrowth(metrics()?.userGrowthPercent) }}</span>
                  <span class="text-foreground-muted">vs last month</span>
                </p>
              </div>
              <div class="p-2.5 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <wb-icon name="users" [size]="24"></wb-icon>
              </div>
            </div>
          </div>

          <!-- Active Subscriptions -->
          <div class="bg-background border border-border/70 border-t-2 border-t-success/50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium text-foreground-muted">Active Subscriptions</p>
                <p class="text-[22px] tabular-nums font-semibold text-foreground mt-1 tracking-tight">{{ metrics()?.totalActiveSubscriptions ?? '—' }}</p>
                <p class="text-xs mt-3 flex items-center gap-1">
                  <span class="font-medium text-foreground-muted">{{ formatGrowth(metrics()?.subscriptionGrowthPercent) }}</span>
                  <span class="text-foreground-muted">vs last month</span>
                </p>
              </div>
              <div class="p-2.5 rounded-lg bg-success/10 text-success flex-shrink-0">
                <wb-icon name="card" [size]="24"></wb-icon>
              </div>
            </div>
          </div>

          <!-- Total Websites -->
          <div class="bg-background border border-border/70 border-t-2 border-t-accent/50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium text-foreground-muted">Total Websites</p>
                <p class="text-[22px] tabular-nums font-semibold text-foreground mt-1 tracking-tight">{{ metrics()?.totalWebsites ?? '—' }}</p>
                <p class="text-xs mt-3 flex items-center gap-1">
                  <span class="font-medium text-foreground-muted">{{ formatGrowth(metrics()?.websiteGrowthPercent) }}</span>
                  <span class="text-foreground-muted">vs last month</span>
                </p>
              </div>
              <div class="p-2.5 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                <wb-icon name="globe" [size]="24"></wb-icon>
              </div>
            </div>
          </div>

          <!-- Monthly Revenue -->
          <div class="bg-background border border-border/70 border-t-2 border-t-warning/50 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium text-foreground-muted">Monthly Revenue</p>
                <p class="text-[22px] tabular-nums font-semibold text-foreground mt-1 tracking-tight">{{ ((metrics()?.monthlyRevenueCents ?? 0) / 100) | currency:'USD':'symbol':'1.2-2' }}</p>
                <p class="text-xs mt-3 flex items-center gap-1">
                  <span class="font-medium text-foreground-muted">{{ formatGrowth(metrics()?.revenueGrowthPercent) }}</span>
                  <span class="text-foreground-muted">vs last month</span>
                </p>
              </div>
              <div class="p-2.5 rounded-lg bg-warning/10 text-warning flex-shrink-0">
                <wb-icon name="trending" [size]="24"></wb-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- User Growth -->
          <section class="bg-background border border-border/70 rounded-lg p-5">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h3 class="text-[13px] font-medium text-foreground">User Growth</h3>
                <p class="text-xs text-foreground-muted mt-0.5">Last 6 months</p>
              </div>
              <span class="text-xs font-medium text-foreground-muted">—%</span>
            </div>
            <div class="h-40 bg-muted/30 rounded-md flex items-center justify-center">
              <p class="text-[13px] text-foreground-muted">Analytics coming soon</p>
            </div>
          </section>

          <!-- Revenue -->
          <section class="bg-background border border-border/70 rounded-lg p-5">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h3 class="text-[13px] font-medium text-foreground">Revenue</h3>
                <p class="text-xs text-foreground-muted mt-0.5">Last 6 months</p>
              </div>
              <span class="text-xs font-medium text-foreground-muted">—%</span>
            </div>
            <div class="h-40 bg-muted/30 rounded-md flex items-center justify-center">
              <p class="text-[13px] text-foreground-muted">Analytics coming soon</p>
            </div>
          </section>
        </div>

        <!-- Recent Websites Section -->
        <section class="bg-background border border-border/70 rounded-lg p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[13px] font-medium text-foreground">Recent Websites</h3>
            <a routerLink="/websites"
              class="text-xs text-primary font-medium hover:underline">View all</a>
          </div>

          @if (recentWebsites().length === 0) {
            <p class="text-[13px] text-foreground-muted py-4 text-center">No websites yet.</p>
          } @else {
            <div class="flex flex-col gap-0">
              @for (website of recentWebsites(); track website.id) {
                <div class="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-b-0">
                  <!-- Icon tile -->
                  <div class="w-8 h-8 rounded-md bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <wb-icon name="globe" [size]="16"></wb-icon>
                  </div>
                  <!-- Name + owner -->
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] text-foreground truncate font-medium">{{ website.name }}</p>
                    <p class="text-[11px] text-foreground-muted truncate">{{ website.ownerEmail }}</p>
                  </div>
                  <!-- Status badge -->
                  <span [ngClass]="getStatusClass(website.status)"
                    class="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium flex-shrink-0">
                    {{ website.status | titlecase }}
                  </span>
                  <!-- Updated at -->
                  <span class="text-[11px] text-foreground-muted flex-shrink-0">
                    {{ website.updatedAt | date:'mediumDate' }}
                  </span>
                </div>
              }
            </div>
          }
        </section>
      }

    </div>
  `,
})
export class AdminDashboardPage implements OnInit {
  private readonly metricsApi = inject(AdminMetricsApiService);
  private readonly websiteApi = inject(WebsiteAdminApiService);

  metrics = signal<AdminMetricsResponse | null>(null);
  recentWebsites = signal<AdminWebsiteResponse[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  formatGrowth(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) {
      return '—';
    }

    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  }

  ngOnInit(): void {
    forkJoin({
      metrics: this.metricsApi.getMetrics(),
      websites: this.websiteApi.getWebsites(),
    }).subscribe({
      next: ({ metrics, websites }) => {
        this.metrics.set(metrics);
        const sorted = [...websites]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 5);
        this.recentWebsites.set(sorted);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load dashboard data.');
        this.loading.set(false);
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PUBLISHED': return 'bg-success/10 text-success';
      case 'DRAFT':     return 'bg-muted text-foreground-muted';
      case 'ARCHIVED':  return 'bg-border text-foreground-muted';
      default:          return 'bg-muted text-foreground-muted';
    }
  }
}
