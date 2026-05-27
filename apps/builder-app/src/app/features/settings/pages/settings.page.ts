import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent, CardComponent, CardContentComponent } from '@platform/ui';
import { LucideAngularModule, Settings } from 'lucide-angular';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, AppLayoutComponent, CardComponent, CardContentComponent, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-app-layout>
      <div class="p-8 max-w-4xl mx-auto">
        <ui-card>
          <ui-card-content class="flex flex-col items-center justify-center p-12 text-center">
            <lucide-icon name="settings" class="w-16 h-16 text-muted-foreground mb-4"></lucide-icon>
            <h1 class="text-2xl font-bold mb-2">Settings</h1>
            <p class="text-muted-foreground">Profile, account, notifications, preferences — coming soon.</p>
          </ui-card-content>
        </ui-card>
      </div>
    </ui-app-layout>
  `,
})
export class SettingsPage {
  readonly Settings = Settings;
}
