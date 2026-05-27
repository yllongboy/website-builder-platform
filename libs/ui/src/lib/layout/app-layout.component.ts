import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'ui-app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background-secondary flex">
      <ui-sidebar />
      <div class="flex-1 flex flex-col min-w-0">
        <ui-header />
        <main class="flex-1 overflow-auto p-6 lg:p-8">
          <ng-content />
        </main>
      </div>
    </div>
  `,
})
export class AppLayoutComponent {}
