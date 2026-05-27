import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../shared/icon.component';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'wb-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside
      [ngClass]="collapsed ? 'w-16' : 'w-60'"
      class="fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50"
    >
      <div class="h-14 flex items-center px-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <wb-icon name="zap" [size]="16" className="text-white"></wb-icon>
          </div>
          <span *ngIf="!collapsed" class="font-semibold text-base tracking-tight text-white">SiteBuilder</span>
        </div>
      </div>

      <nav class="flex-1 py-4 px-3 flex flex-col gap-0.5 overflow-y-auto">
        <a
          *ngFor="let item of navItems"
          [routerLink]="item.path"
          routerLinkActive="sidebar-nav-active"
          [routerLinkActiveOptions]="item.path === '/dashboard' ? { exact: true } : { exact: false }"
          class="flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 text-sidebar-foreground hover:bg-sidebar-hover hover:text-white border-l-2 border-l-transparent"
        >
          <wb-icon [name]="item.icon" [size]="18" className="flex-shrink-0"></wb-icon>
          <span *ngIf="!collapsed" class="text-[13px] font-medium">{{ item.label }}</span>
        </a>
      </nav>

      <button
        type="button"
        (click)="toggle.emit()"
        class="h-11 flex items-center justify-center border-t border-white/5 hover:bg-sidebar-hover transition-colors rounded-md"
      >
        <wb-icon
          [name]="collapsed ? 'chevronRight' : 'chevronLeft'"
          [size]="16"
          className="text-sidebar-foreground/50"
        ></wb-icon>
      </button>
    </aside>
  `
})
export class AdminSidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  readonly navItems: NavItem[] = [
    { path: '/dashboard',  icon: 'layout',  label: 'Dashboard' },
    { path: '/users',      icon: 'users',   label: 'Users' },
    { path: '/websites',   icon: 'globe',   label: 'Websites' },
    { path: '/templates',  icon: 'grid',    label: 'Templates' },
    { path: '/categories', icon: 'folder',  label: 'Categories' },
    { path: '/billing',    icon: 'card',    label: 'Billing' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];
}