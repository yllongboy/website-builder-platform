import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { dashboardStats, chartData, mockActivities } from '../mock-data';
import { LayoutComponent } from '../ui.component';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LayoutComponent, IconComponent],
  template: `
    <app-layout>
      <div class="flex flex-col gap-8">
        <div><h1 class="text-xl font-semibold text-foreground tracking-tight">Dashboard</h1><p class="text-[13px] text-muted-foreground mt-0.5">Overview of your platform performance</p></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div *ngFor="let stat of statCards" class="bg-background border border-border/70 rounded-lg p-5">
            <div class="flex items-start justify-between">
              <div><p class="text-[13px] font-medium text-muted-foreground">{{ stat.title }}</p><p class="text-2xl font-semibold text-foreground mt-1 tracking-tight">{{ stat.value }}</p><p class="text-xs mt-3 flex items-center gap-1 text-success"><span class="font-medium">+{{ stat.change }}%</span><span class="text-muted-foreground">vs last month</span></p></div>
              <div [ngClass]="stat.color" class="p-2.5 rounded-lg"><app-icon [name]="stat.icon" [size]="24"></app-icon></div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section class="bg-background border border-border/70 rounded-lg p-5">
            <div class="flex items-center justify-between mb-5"><div><h3 class="text-sm font-medium text-foreground">User Growth</h3><p class="text-xs text-muted-foreground mt-0.5">Last 6 months</p></div><span class="text-xs font-medium text-success">+{{ stats.userGrowth }}%</span></div>
            <div class="h-40 flex items-end justify-between gap-3">
              <div *ngFor="let point of userBars" class="flex-1 flex flex-col items-center gap-1.5 h-full">
                <div class="w-full flex flex-col items-center justify-end flex-1"><div class="w-full rounded bg-primary opacity-85 min-h-1" [style.height.%]="point.height"></div></div>
                <span class="text-[10px] text-muted-foreground">{{ point.label }}</span>
              </div>
            </div>
          </section>
          <section class="bg-background border border-border/70 rounded-lg p-5">
            <div class="flex items-center justify-between mb-5"><div><h3 class="text-sm font-medium text-foreground">Revenue</h3><p class="text-xs text-muted-foreground mt-0.5">Last 6 months</p></div><span class="text-xs font-medium text-success">+{{ stats.revenueGrowth }}%</span></div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-40">
              <line *ngFor="let y of [25,50,75]" x1="0" [attr.y1]="y" x2="100" [attr.y2]="y" stroke="#f1f5f9" stroke-width="0.5"></line>
              <path [attr.d]="revenuePath + ' L 100 100 L 0 100 Z'" fill="#059669" opacity="0.08"></path>
              <path [attr.d]="revenuePath" fill="none" stroke="#059669" stroke-width="1.5" vector-effect="non-scaling-stroke"></path>
            </svg>
            <div class="flex justify-between mt-1.5"><span *ngFor="let point of chartData.revenue" class="text-[10px] text-muted-foreground">{{ point.month }}</span></div>
          </section>
        </div>
        <section class="bg-background border border-border/70 rounded-lg p-5">
          <div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-foreground">Recent Activity</h3><button class="text-xs text-primary font-medium hover:underline">View all</button></div>
          <div class="flex flex-col gap-3">
            <div *ngFor="let activity of activities" class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-full bg-muted/70 flex items-center justify-center flex-shrink-0"><app-icon [name]="activityIcon(activity.type)" [size]="16"></app-icon></div>
              <div class="flex-1 min-w-0"><p class="text-[13px] text-foreground truncate">{{ activity.description }} <span *ngIf="activity.userName" class="text-muted-foreground">- {{ activity.userName }}</span></p></div>
              <span class="text-[11px] text-muted-foreground flex-shrink-0">{{ formatTime(activity.timestamp) }}</span>
            </div>
          </div>
        </section>
      </div>
    </app-layout>
  `
})
export class DashboardComponent {
  stats = dashboardStats;
  chartData = chartData;
  activities = mockActivities;
  statCards = [
    { title: 'Total Users', value: dashboardStats.totalUsers.toLocaleString(), change: dashboardStats.userGrowth, icon: 'users', color: 'bg-primary/10 text-primary' },
    { title: 'Active Subscriptions', value: dashboardStats.activeSubscriptions.toLocaleString(), change: 5.2, icon: 'card', color: 'bg-success/10 text-success' },
    { title: 'Published Websites', value: dashboardStats.publishedWebsites.toLocaleString(), change: 18.7, icon: 'globe', color: 'bg-accent/10 text-accent' },
    { title: 'Monthly Revenue', value: '$' + dashboardStats.monthlyRevenue.toLocaleString(), change: dashboardStats.revenueGrowth, icon: 'dollar', color: 'bg-warning/10 text-warning' }
  ];
  userBars = chartData.userGrowth.map((point) => ({ label: point.month, height: point.users / Math.max(...chartData.userGrowth.map((d) => d.users)) * 100 }));
  revenuePath = this.buildRevenuePath();
  buildRevenuePath(): string {
    const values = chartData.revenue.map((point) => point.revenue);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    return chartData.revenue.map((point, index) => {
      const x = index / (chartData.revenue.length - 1) * 100;
      const y = 100 - ((point.revenue - min) / range) * 80 - 10;
      return (index === 0 ? 'M ' : 'L ') + x + ' ' + y;
    }).join(' ');
  }
  activityIcon(type: string): string {
    return ({ user_signup: 'users', website_published: 'globe', subscription_created: 'card', template_created: 'file', user_suspended: 'alert' } as Record<string, string>)[type] ?? 'alert';
  }
  formatTime(timestamp: string): string {
    const diffMinutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (diffMinutes < 60) return diffMinutes + 'm ago';
    const hours = Math.floor(diffMinutes / 60);
    if (hours < 24) return hours + 'h ago';
    return Math.floor(hours / 24) + 'd ago';
  }
}
