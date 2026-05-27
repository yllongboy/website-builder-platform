import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar.component';
import { AdminHeaderComponent } from './admin-header.component';

@Component({
  selector: 'wb-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent, AdminHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background-subtle flex">
      <wb-admin-sidebar
        [collapsed]="sidebarCollapsed"
        (toggle)="sidebarCollapsed = !sidebarCollapsed"
      />
      <div
        [ngClass]="sidebarCollapsed ? 'ml-16' : 'ml-60'"
        class="flex-1 flex flex-col transition-all duration-300"
      >
        <wb-admin-header />
        <main class="flex-1 px-10 py-8 overflow-auto">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class AdminShellComponent {
  sidebarCollapsed = false;
}
