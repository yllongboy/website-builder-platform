import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@platform/auth';
import { IconComponent } from '../shared/icon.component';

interface Notification {
  text: string;
  time: string;
  unread: boolean;
}

@Component({
  selector: 'wb-admin-header',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="h-14 bg-background border-b border-border/60 flex items-center justify-between px-8">
      <div class="relative w-80">
        <wb-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"></wb-icon>
        <input
          [(ngModel)]="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full pl-9 pr-4 py-1.5 text-sm bg-muted/50 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-muted transition-all placeholder:text-muted-foreground/50"
        />
      </div>

      <div class="flex items-center gap-2">
        <!-- Notifications -->
        <div class="relative">
          <button
            (click)="toggleNotifications($event)"
            class="relative p-2 rounded-md hover:bg-muted/70 transition-colors"
          >
            <wb-icon name="bell" [size]="18" className="text-foreground-muted"></wb-icon>
            <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </button>
          <div
            *ngIf="showNotifications"
            class="absolute right-0 top-full mt-2 w-72 bg-background border border-border/60 rounded-lg shadow-xl shadow-black/5 overflow-hidden z-50"
          >
            <div class="px-4 py-3 border-b border-border/60">
              <h3 class="font-medium text-sm">Notifications</h3>
            </div>
            <div class="max-h-72 overflow-y-auto">
              <div
                *ngFor="let item of notifications"
                [ngClass]="item.unread ? 'bg-primary/[0.03]' : ''"
                class="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <p class="text-[13px] text-foreground leading-snug">{{ item.text }}</p>
                <p class="text-xs text-muted-foreground mt-1">{{ item.time }}</p>
              </div>
            </div>
            <div class="px-4 py-2.5 border-t border-border/60 bg-muted/30">
              <button class="text-xs text-primary font-medium hover:underline">View all</button>
            </div>
          </div>
        </div>

        <!-- User Avatar + Dropdown -->
        <div class="relative ml-1">
          <button
            (click)="toggleProfile($event)"
            class="flex items-center gap-2 hover:bg-muted/70 px-2 py-1.5 rounded-md transition-colors"
          >
            <div class="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-white">{{ userEmail ? userEmail[0].toUpperCase() : 'A' }}</span>
            </div>
            <wb-icon name="chevronDown" [size]="14" className="text-muted-foreground"></wb-icon>
          </button>
          <div
            *ngIf="showProfile"
            class="absolute right-0 top-full mt-2 w-44 bg-background border border-border/60 rounded-lg shadow-xl shadow-black/5 overflow-hidden z-50"
          >
            <div class="px-3 py-2 border-b border-border/60">
              <p class="text-sm font-medium">Admin</p>
              <p class="text-xs text-muted-foreground truncate">{{ userEmail ?? 'Loading...' }}</p>
            </div>
            <div class="py-1">
              <button
                (click)="signOut()"
                class="block w-full text-left px-3 py-1.5 text-[13px] text-destructive hover:bg-muted/50 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class AdminHeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  searchQuery = '';
  showNotifications = false;
  showProfile = false;
  userEmail: string | null = null;

  ngOnInit(): void {
    this.authService.currentUser$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.cdr.markForCheck();
      } else if (this.authService.isLoggedIn()) {
        // Session restoration: token exists but subject is null (page reload)
        this.authService.getMe().pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe({
          next: (me: any) => {
            this.userEmail = me?.email ?? null;
            this.cdr.markForCheck();
          },
          error: () => {} // silently fail — user will be logged out by 401 interceptor
        });
      }
    });
  }

  readonly notifications: Notification[] = [
    { text: 'New user signup: Alex Thompson', time: '2 min ago', unread: true },
    { text: 'Website flagged for review', time: '1 hour ago', unread: true },
    { text: 'Payment failed for user #1234', time: '3 hours ago', unread: false },
  ];

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    this.showProfile = false;
  }

  toggleProfile(event: Event): void {
    event.stopPropagation();
    this.showProfile = !this.showProfile;
    this.showNotifications = false;
  }

  signOut(): void {
    this.authService.logout().subscribe({
      complete: () => this.router.navigateByUrl('/login')
    });
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.showNotifications = false;
    this.showProfile = false;
  }
}
