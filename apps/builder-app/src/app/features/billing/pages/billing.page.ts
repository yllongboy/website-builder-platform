import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent, CardComponent, CardContentComponent, ButtonComponent, BadgeComponent, SkeletonComponent } from '@platform/ui';
import { LucideAngularModule, CreditCard } from 'lucide-angular';
import { BillingApiService } from '../data-access/billing-api.service';
import { BillingStatusResponse } from '@platform/shared-models';

@Component({
  selector: 'app-billing-page',
  standalone: true,
  imports: [CommonModule, AppLayoutComponent, CardComponent, CardContentComponent, ButtonComponent, BadgeComponent, SkeletonComponent, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-app-layout>
      <div class="p-8 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Billing & Subscription</h1>
        
        @if (loading()) {
          <ui-card>
            <div class="p-6">
              <ui-skeleton class="h-8 w-1/3 mb-4"></ui-skeleton>
              <ui-skeleton class="h-4 w-1/2 mb-6"></ui-skeleton>
              <ui-skeleton class="h-10 w-40"></ui-skeleton>
            </div>
          </ui-card>
        } @else if (error()) {
          <ui-card class="border-destructive">
            <ui-card-content class="p-6 text-center text-destructive">
              <p>{{ error() }}</p>
              <ui-button variant="outline" class="mt-4" (click)="loadStatus()">Try Again</ui-button>
            </ui-card-content>
          </ui-card>
        } @else if (status()) {
          <ui-card>
            <ui-card-content class="p-8">
              <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 class="text-2xl font-bold mb-2">
                    {{ status()!.planCode === 'pro' ? 'Pro Plan' : (status()!.planCode || 'Free Plan') }}
                  </h2>
                  <p class="text-sm font-medium flex items-center gap-2">
                    Status: 
                    <ui-badge [variant]="getBadgeVariant(status()!.status)">
                      {{ status()!.status }}
                    </ui-badge>
                  </p>
                </div>
                <lucide-icon name="credit-card" class="w-12 h-12 text-primary opacity-20"></lucide-icon>
              </div>

              @if (status()!.currentPeriodEnd) {
                <p class="text-sm text-muted-foreground mb-6">
                  Current period ends on {{ status()!.currentPeriodEnd | date:'longDate' }}
                </p>
              } @else {
                <p class="text-sm text-muted-foreground mb-6">Free plans are forever free but cannot publish.</p>
              }
              
              <div class="border-t pt-6">
                @if (!status()!.canPublish) {
                  <ui-button [isLoading]="actionLoading()" (click)="subscribeToPro()">
                    Subscribe to Pro
                  </ui-button>
                } @else {
                  <ui-button variant="outline" [isLoading]="actionLoading()" (click)="manageSubscription()">
                    Manage Subscription
                  </ui-button>
                }
              </div>
            </ui-card-content>
          </ui-card>
        }
      </div>
    </ui-app-layout>
  `,
})
export class BillingPage implements OnInit {
  readonly CreditCard = CreditCard;
  private readonly billingApi = inject(BillingApiService);

  status = signal<BillingStatusResponse | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  actionLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadStatus();
  }

  loadStatus(): void {
    this.loading.set(true);
    this.error.set(null);
    this.billingApi.getStatus().subscribe({
      next: (res) => {
        this.status.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load billing status. Please try again.');
        this.loading.set(false);
      }
    });
  }

  subscribeToPro(): void {
    this.actionLoading.set(true);
    this.billingApi.createCheckoutSession('pro').subscribe({
      next: (res) => {
        window.location.href = res.checkoutUrl;
      },
      error: () => {
        this.error.set('Failed to navigate to checkout.');
        this.actionLoading.set(false);
      }
    });
  }

  manageSubscription(): void {
    this.actionLoading.set(true);
    this.billingApi.createPortalSession().subscribe({
      next: (res) => {
        window.location.href = res.portalUrl;
      },
      error: () => {
        this.error.set('Failed to open customer portal.');
        this.actionLoading.set(false);
      }
    });
  }

  getBadgeVariant(status: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'TRIALING': return 'primary';
      case 'PAST_DUE':
      case 'INCOMPLETE': return 'warning';
      case 'CANCELED':
      case 'NONE': return 'default';
      default: return 'default';
    }
  }
}
