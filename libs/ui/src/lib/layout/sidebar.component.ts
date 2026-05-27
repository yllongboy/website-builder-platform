import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@platform/auth';
import { LucideAngularModule, LayoutDashboard, Globe, LayoutTemplate, CreditCard, Settings, HelpCircle, ChevronLeft, ChevronRight, Sparkles, Crown } from 'lucide-angular';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside
      class="h-screen sticky top-0 bg-surface border-r border-border flex flex-col transition-all duration-300 ease-out"
      [class.w-[72px]]="collapsed"
      [class.w-64]="!collapsed"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center border-b border-border" [class.justify-center]="collapsed" [class.px-3]="collapsed" [class.px-5]="!collapsed">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <lucide-icon name="sparkles" class="w-4 h-4 text-white"></lucide-icon>
          </div>
          <span *ngIf="!collapsed" class="font-bold text-lg text-foreground">SiteForge</span>
        </div>
      </div>

      <!-- Main Nav -->
      <nav class="flex-1 p-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        <ng-container *ngFor="let item of navItems">
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-primary text-primary-foreground shadow-sm"
            [routerLinkActiveOptions]="{ exact: item.exact }"
            #rla="routerLinkActive"
            [class.bg-primary]="rla.isActive"
            [class.text-primary-foreground]="rla.isActive"
            [class.shadow-sm]="rla.isActive"
            [class.text-foreground-secondary]="!rla.isActive"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-muted hover:text-foreground"
            [title]="collapsed ? item.label : ''"
          >
            <lucide-icon [name]="item.icon" class="w-5 h-5 flex-shrink-0"></lucide-icon>
            <span *ngIf="!collapsed">{{ item.label }}</span>
          </a>
        </ng-container>
      </nav>

      <!-- Bottom Nav -->
      <div class="p-3 border-t border-border flex flex-col gap-1">
        <ng-container *ngFor="let item of bottomItems">
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-primary text-primary-foreground shadow-sm"
            #rlaBottom="routerLinkActive"
            [class.bg-primary]="rlaBottom.isActive"
            [class.text-primary-foreground]="rlaBottom.isActive"
            [class.shadow-sm]="rlaBottom.isActive"
            [class.text-foreground-secondary]="!rlaBottom.isActive"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-muted hover:text-foreground"
            [title]="collapsed ? item.label : ''"
          >
            <lucide-icon [name]="item.icon" class="w-5 h-5 flex-shrink-0"></lucide-icon>
            <span *ngIf="!collapsed">{{ item.label }}</span>
          </a>
        </ng-container>
        
        <!-- Upgrade Banner -->
        <div *ngIf="!collapsed && userPlan === 'free'" class="mt-2 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
          <div class="relative flex items-center gap-2 mb-2">
            <lucide-icon name="crown" class="w-4 h-4 text-primary"></lucide-icon>
            <span class="font-semibold text-sm text-foreground">Pro Plan</span>
          </div>
          <p class="text-xs text-muted-foreground mb-3 leading-relaxed">Unlock premium templates, custom domains, and remove branding.</p>
          <button (click)="navigateToBilling()" class="w-full py-1.5 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium transition-colors shadow-sm">
            Upgrade Now
          </button>
        </div>
      </div>

      <!-- Collapse Button -->
      <button
        (click)="toggleCollapse()"
        class="absolute -right-3 top-24 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 shadow-sm transition-all z-10"
      >
        <lucide-icon [name]="collapsed ? 'chevron-right' : 'chevron-left'" class="w-3 h-3"></lucide-icon>
      </button>
    </aside>
  `,
})
export class SidebarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  
  collapsed = false;
  userPlan: string = 'free';

  navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', path: '/', exact: true },
    { id: 'websites', label: 'My Websites', icon: 'globe', path: '/websites', exact: false },
    { id: 'templates', label: 'Templates', icon: 'layout-template', path: '/templates', exact: false },
    { id: 'billing', label: 'Billing', icon: 'credit-card', path: '/billing', exact: false }
  ];

  bottomItems = [
    { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings', exact: false },
    { id: 'help', label: 'Help & Support', icon: 'help-circle', path: '/help', exact: false }
  ];
  
  ngOnInit(): void {
    // Attempt to get user plan from auth service if available
    this.authService.currentUser$.subscribe(user => {
      // Stub plan handling based on whatever user obj has
      if (user && 'plan' in user) {
        this.userPlan = (user as any).plan || 'free';
      }
      this.cdr.markForCheck();
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.cdr.markForCheck();
  }

  navigateToBilling(): void {
    this.router.navigate(['/billing']);
  }
}
