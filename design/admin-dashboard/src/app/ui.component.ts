import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IconComponent } from './icon.component';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'outline';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: '<span [ngClass]="classes"><ng-content></ng-content></span>'
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() extraClass = '';
  get classes(): string[] {
    const map: Record<BadgeVariant, string> = {
      default: 'bg-primary/8 text-primary',
      success: 'bg-success/8 text-success',
      warning: 'bg-warning/8 text-warning',
      destructive: 'bg-destructive/8 text-destructive',
      secondary: 'bg-foreground/5 text-foreground-muted',
      outline: 'border border-border/80 text-foreground-muted'
    };
    return ['inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded', map[this.variant], this.extraClass];
  }
}

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-foreground">{{ label }}</p>
        <p *ngIf="description" class="text-xs text-muted-foreground mt-0.5">{{ description }}</p>
      </div>
      <button type="button" (click)="enabledChange.emit(!enabled)" [ngClass]="enabled ? 'bg-primary' : 'bg-muted'" class="relative w-11 h-6 rounded-full transition-colors">
        <span [ngClass]="enabled ? 'translate-x-5' : ''" class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"></span>
      </button>
    </div>
  `
})
export class ToggleComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() enabled = false;
  @Output() enabledChange = new EventEmitter<boolean>();
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-foreground/50 backdrop-blur-sm" (click)="close.emit()"></div>
      <div [ngClass]="sizeClass" class="relative bg-background rounded-xl shadow-2xl w-full mx-4">
        <div class="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 class="text-lg font-semibold text-foreground">{{ title }}</h2>
          <button (click)="close.emit()" class="p-1 rounded-lg hover:bg-muted transition-colors"><app-icon name="x" [size]="20" className="text-muted-foreground"></app-icon></button>
        </div>
        <div class="px-6 py-4"><ng-content></ng-content></div>
        <div *ngIf="footer" class="px-6 py-4 border-t border-border bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() footer = false;
  @Output() close = new EventEmitter<void>();
  get sizeClass(): string {
    return ({ sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' })[this.size];
  }
}

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  template: `
    <app-modal [open]="open" [title]="title" size="sm" [footer]="true" (close)="close.emit()">
      <p class="text-muted-foreground">{{ message }}</p>
      <button modal-footer type="button" class="inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-all border border-border/80 text-foreground hover:bg-muted/50 px-3.5 py-1.5 text-[13px]" (click)="close.emit()">{{ cancelText }}</button>
      <button modal-footer type="button" [ngClass]="variant === 'danger' ? 'bg-destructive text-white hover:bg-destructive/90' : 'bg-primary text-white hover:bg-primary/90'" class="inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-all px-3.5 py-1.5 text-[13px]" (click)="confirm.emit(); close.emit()">{{ confirmText }}</button>
    </app-modal>
  `
})
export class ConfirmModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() message = '';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() variant: 'danger' | 'warning' | 'info' = 'danger';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly subject = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this.subject.asObservable();

  add(type: Toast['type'], message: string): void {
    const id = Math.random().toString(36).slice(2);
    this.subject.next([...this.subject.value, { id, type, message }]);
    window.setTimeout(() => this.remove(id), 5000);
  }

  remove(id: string): void {
    this.subject.next(this.subject.value.filter((toast) => toast.id !== id));
  }
}

@Component({
  selector: 'app-toast-host',
  standalone: true,
  imports: [AsyncPipe, CommonModule, IconComponent],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div *ngFor="let toast of toastService.toasts$ | async" [ngClass]="toastClass(toast.type)" class="flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg bg-background">
        <app-icon [name]="toastIcon(toast.type)" [size]="20"></app-icon>
        <p class="text-sm font-medium text-foreground">{{ toast.message }}</p>
        <button (click)="toastService.remove(toast.id)" class="ml-2 p-1 hover:bg-muted rounded transition-colors"><app-icon name="x" [size]="16" className="text-muted-foreground"></app-icon></button>
      </div>
    </div>
  `
})
export class ToastHostComponent {
  toastService = inject(ToastService);
  toastIcon(type: Toast['type']): string {
    return ({ success: 'check', error: 'x', warning: 'alert', info: 'alert' })[type];
  }
  toastClass(type: Toast['type']): string {
    return ({ success: 'bg-success/10 border-success/20 text-success', error: 'bg-destructive/10 border-destructive/20 text-destructive', warning: 'bg-warning/10 border-warning/20 text-warning', info: 'bg-primary/10 border-primary/20 text-primary' })[type];
  }
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <header class="h-14 bg-background border-b border-border/60 flex items-center justify-between px-8">
      <div class="relative w-80">
        <app-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"></app-icon>
        <input [(ngModel)]="searchQuery" type="text" placeholder="Search..." class="w-full pl-9 pr-4 py-1.5 text-sm bg-muted/50 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-muted transition-all placeholder:text-muted-foreground/50">
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <button (click)="showNotifications = !showNotifications; showProfile = false" class="relative p-2 rounded-md hover:bg-muted/70 transition-colors">
            <app-icon name="bell" [size]="18" className="text-foreground-muted"></app-icon>
            <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </button>
          <div *ngIf="showNotifications" class="absolute right-0 top-full mt-2 w-72 bg-background border border-border/60 rounded-lg shadow-xl shadow-black/5 overflow-hidden z-50">
            <div class="px-4 py-3 border-b border-border/60"><h3 class="font-medium text-sm">Notifications</h3></div>
            <div class="max-h-72 overflow-y-auto">
              <div *ngFor="let item of notifications" [ngClass]="item.unread ? 'bg-primary/[0.03]' : ''" class="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <p class="text-[13px] text-foreground leading-snug">{{ item.text }}</p>
                <p class="text-xs text-muted-foreground mt-1">{{ item.time }}</p>
              </div>
            </div>
            <div class="px-4 py-2.5 border-t border-border/60 bg-muted/30"><button class="text-xs text-primary font-medium hover:underline">View all</button></div>
          </div>
        </div>
        <div class="relative ml-1">
          <button (click)="showProfile = !showProfile; showNotifications = false" class="flex items-center gap-2 hover:bg-muted/70 px-2 py-1.5 rounded-md transition-colors">
            <div class="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"><span class="text-xs font-medium text-white">A</span></div>
            <app-icon name="chevronDown" [size]="14" className="text-muted-foreground"></app-icon>
          </button>
          <div *ngIf="showProfile" class="absolute right-0 top-full mt-2 w-44 bg-background border border-border/60 rounded-lg shadow-xl shadow-black/5 overflow-hidden z-50">
            <div class="px-3 py-2 border-b border-border/60"><p class="text-sm font-medium">Admin User</p><p class="text-xs text-muted-foreground truncate">admin&#64;site.com</p></div>
            <div class="py-1"><a href="#" class="block px-3 py-1.5 text-[13px] hover:bg-muted/50 transition-colors">Settings</a><a href="#" class="block px-3 py-1.5 text-[13px] text-destructive hover:bg-muted/50 transition-colors">Sign out</a></div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class TopbarComponent {
  searchQuery = '';
  showNotifications = false;
  showProfile = false;
  notifications = [
    { text: 'New user signup: Alex Thompson', time: '2 min ago', unread: true },
    { text: 'Website flagged for review', time: '1 hour ago', unread: true },
    { text: 'Payment failed for user #1234', time: '3 hours ago', unread: false }
  ];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <aside [ngClass]="collapsed ? 'w-16' : 'w-60'" class="fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50">
      <div class="h-16 flex items-center px-5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><app-icon name="zap" [size]="16" className="text-white"></app-icon></div>
          <span *ngIf="!collapsed" class="font-semibold text-base tracking-tight text-white">SiteBuilder</span>
        </div>
      </div>
      <nav class="flex-1 py-6 px-3 flex flex-col gap-0.5 overflow-y-auto">
        <a *ngFor="let item of navItems" [routerLink]="item.path" [ngClass]="isActive(item.path) ? 'bg-sidebar-active text-white' : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-white'" class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150">
          <app-icon [name]="item.icon" [size]="18" className="flex-shrink-0"></app-icon>
          <span *ngIf="!collapsed" class="text-[13px] font-medium">{{ item.label }}</span>
        </a>
      </nav>
      <button (click)="toggle.emit()" class="h-11 flex items-center justify-center border-t border-white/5 hover:bg-sidebar-hover transition-colors">
        <app-icon [name]="collapsed ? 'chevronRight' : 'chevronLeft'" [size]="16" className="text-sidebar-foreground/50"></app-icon>
      </button>
    </aside>
  `
})
export class SidebarComponent {
  private router = inject(Router);
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();
  navItems = [
    { path: '/', icon: 'layout', label: 'Dashboard' },
    { path: '/users', icon: 'users', label: 'Users' },
    { path: '/websites', icon: 'globe', label: 'Websites' },
    { path: '/templates', icon: 'grid', label: 'Templates' },
    { path: '/categories', icon: 'folder', label: 'Categories' },
    { path: '/billing', icon: 'card', label: 'Billing' },
    { path: '/settings', icon: 'settings', label: 'Settings' }
  ];
  isActive(path: string): boolean {
    return this.router.url === path || (path === '/' && this.router.url === '');
  }
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent],
  template: `
    <div class="min-h-screen bg-background-subtle flex">
      <app-sidebar [collapsed]="sidebarCollapsed" (toggle)="sidebarCollapsed = !sidebarCollapsed"></app-sidebar>
      <div [ngClass]="sidebarCollapsed ? 'ml-16' : 'ml-60'" class="flex-1 flex flex-col transition-all duration-300">
        <app-topbar></app-topbar>
        <main class="flex-1 px-8 py-6 overflow-auto"><ng-content></ng-content></main>
      </div>
    </div>
  `
})
export class LayoutComponent {
  sidebarCollapsed = false;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastHostComponent],
  template: '<router-outlet></router-outlet><app-toast-host></app-toast-host>'
})
export class RootShellComponent {}
