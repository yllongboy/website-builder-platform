import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'wb-admin-billing-overview-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">

      <!-- Page Header -->
      <div>
        <h1 class="text-[15px] font-semibold text-foreground tracking-tight leading-6">Billing</h1>
        <p class="text-[13px] text-foreground-muted mt-1 leading-5">Manage subscriptions and payments</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-background border border-border/70 rounded-lg p-5 flex items-start justify-between">
          <div>
            <p class="text-[13px] font-medium text-foreground-muted">Active Subscriptions</p>
            <p class="text-[22px] font-semibold text-foreground mt-1 tracking-tight tabular-nums">—</p>
          </div>
          <div class="p-2.5 rounded-lg bg-success/10">
            <wb-icon name="card" [size]="22" className="text-success"></wb-icon>
          </div>
        </div>
        <div class="bg-background border border-border/70 rounded-lg p-5 flex items-start justify-between">
          <div>
            <p class="text-[13px] font-medium text-foreground-muted">Monthly Recurring Revenue</p>
            <p class="text-[22px] font-semibold text-foreground mt-1 tracking-tight tabular-nums">—</p>
          </div>
          <div class="p-2.5 rounded-lg bg-primary/10">
            <wb-icon name="trending" [size]="22" className="text-primary"></wb-icon>
          </div>
        </div>
        <div class="bg-background border border-border/70 rounded-lg p-5 flex items-start justify-between">
          <div>
            <p class="text-[13px] font-medium text-foreground-muted">Past Due</p>
            <p class="text-[22px] font-semibold text-foreground mt-1 tracking-tight tabular-nums">—</p>
          </div>
          <div class="p-2.5 rounded-lg bg-warning/10">
            <wb-icon name="alert" [size]="22" className="text-warning"></wb-icon>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative flex-1 min-w-56">
          <wb-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/60"></wb-icon>
          <input type="text" [(ngModel)]="searchQuery" placeholder="Search by customer name or email..."
            class="bg-muted/40 border-0 rounded-md text-[13px] px-4 py-2.5 w-full text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-primary/30 pl-9" />
        </div>
        <select [(ngModel)]="planFilter"
          class="bg-muted/40 border-0 rounded-md text-[13px] px-4 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30">
          <option value="">All Plans</option>
          <option value="FREE">Free</option>
          <option value="STARTER">Starter</option>
          <option value="PRO">Pro</option>
          <option value="ENTERPRISE">Enterprise</option>
        </select>
        <select [(ngModel)]="statusFilter"
          class="bg-muted/40 border-0 rounded-md text-[13px] px-4 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30">
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIALING">Trial</option>
          <option value="PAST_DUE">Past Due</option>
          <option value="CANCELED">Cancelled</option>
        </select>
      </div>

      <!-- Table -->
      <section class="bg-background border border-border/70 rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-border/50">
          <thead class="border-b border-border/70">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Customer</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Plan</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Amount</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Status</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground-muted tracking-normal">Renewal Date</th>
              <th scope="col" class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <!-- Empty state row -->
            <tr>
              <td colspan="6" class="px-4 py-16 text-center text-[13px] text-foreground-muted">
                Billing data will appear here once the subscriptions API is connected.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

    </div>
  `
})
export class AdminBillingOverviewPage {
  searchQuery = '';
  planFilter = '';
  statusFilter = '';
}
