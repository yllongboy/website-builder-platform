import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@platform/auth';
import { ButtonComponent, InputComponent, DropdownComponent, DropdownItemComponent, DropdownSeparatorComponent, BadgeComponent, AvatarComponent } from '../index';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Bell, Plus, ChevronDown, LogOut } from 'lucide-angular';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonComponent, 
    InputComponent, 
    DropdownComponent, 
    DropdownItemComponent, 
    DropdownSeparatorComponent, 
    BadgeComponent, 
    AvatarComponent,
    FormsModule,
    LucideAngularModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="h-16 bg-surface border-b border-border px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
      <!-- Search -->
      <div class="flex-1 max-w-md">
        <ui-input
          [isSearch]="true"
          placeholder="Search websites, templates..."
          [ngModel]="searchQuery"
          (ngModelChange)="searchQuery = $event"
          class="bg-background-secondary border-transparent focus:bg-surface"
        ></ui-input>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <ui-button
          (click)="navigateToNewWebsite()"
          class="flex items-center"
        >
          <lucide-icon name="plus" class="w-4 h-4 mr-2"></lucide-icon>
          New Website
        </ui-button>

        <!-- Notifications -->
        <ui-dropdown [isOpen]="notificationsOpen" (openChange)="onNotificationsToggle($event)">
          <button trigger class="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <lucide-icon name="bell" class="w-5 h-5 text-foreground-secondary"></lucide-icon>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div class="w-64">
            <div class="px-3 py-2 border-b border-border">
              <p class="font-semibold text-foreground">Notifications</p>
            </div>
            <div class="py-2 px-3">
              <p class="text-sm text-muted-foreground">No new notifications</p>
            </div>
          </div>
        </ui-dropdown>

        <!-- User Menu -->
        <ui-dropdown [isOpen]="userMenuOpen" (openChange)="onUserMenuToggle($event)">
          <button trigger class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ui-avatar [src]="userAvatar" [initials]="userInitials" [alt]="userName || 'User'" size="sm"></ui-avatar>
            <div class="hidden sm:block text-left">
              <p class="text-sm font-medium text-foreground">{{ userName || 'User' }}</p>
              <ui-badge variant="primary" size="sm">{{ userPlan === 'pro' ? 'Pro' : userPlan === 'enterprise' ? 'Enterprise' : 'Free' }}</ui-badge>
            </div>
            <lucide-icon name="chevron-down" class="w-4 h-4 text-muted-foreground hidden sm:block"></lucide-icon>
          </button>

          <div class="w-56">
            <div class="px-3 py-2 border-b border-border">
              <p class="font-medium text-foreground">{{ userName || 'User' }}</p>
              <p class="text-sm text-muted-foreground">{{ userEmail || 'user@example.com' }}</p>
            </div>
            <ui-dropdown-item (itemClick)="navigateTo('/settings'); userMenuOpen = false">Settings</ui-dropdown-item>
            <ui-dropdown-item (itemClick)="navigateTo('/billing'); userMenuOpen = false">Billing</ui-dropdown-item>
            <ui-dropdown-separator></ui-dropdown-separator>
            <ui-dropdown-item (itemClick)="handleLogout(); userMenuOpen = false">
              <lucide-icon name="log-out" class="w-4 h-4 mr-2"></lucide-icon>
              Sign Out
            </ui-dropdown-item>
          </div>
        </ui-dropdown>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  searchQuery = '';
  userName = '';
  userInitials = '';
  userEmail = '';
  userPlan = 'free';
  userAvatar = undefined;
  notificationsOpen = false;
  userMenuOpen = false;

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user) => {
        if (user) {
          this.userName = (user as any).name || user.email.split('@')[0];
          this.userEmail = user.email;
          this.userPlan = (user as any).plan || 'free';
          this.userAvatar = (user as any).avatar;
          
          // Compute initials from name/email prefix
          const parts = this.userName.split(/[\s._-]+/).filter(Boolean);
          this.userInitials = parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : this.userName.slice(0, 2).toUpperCase();
        }
        this.cdr.markForCheck();
      }
    });
  }

  onNotificationsToggle(open: boolean): void {
    this.notificationsOpen = open;
    if (open) this.userMenuOpen = false;
  }

  onUserMenuToggle(open: boolean): void {
    this.userMenuOpen = open;
    if (open) this.notificationsOpen = false;
  }

  handleLogout(): void {
    this.authService.logout().subscribe({
      complete: () => this.router.navigate(['/landing'])
    });
  }

  navigateToNewWebsite(): void {
    this.router.navigate(['/editor', 'new']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
