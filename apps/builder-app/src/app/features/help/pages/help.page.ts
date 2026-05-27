
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent, CardComponent, CardContentComponent } from '@platform/ui';
import { LucideAngularModule, HelpCircle } from 'lucide-angular';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [CommonModule, AppLayoutComponent, CardComponent, CardContentComponent, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-app-layout>
      <div class="p-8">
        <div class="max-w-2xl mx-auto text-center py-12">
          <h1 class="text-2xl font-bold text-foreground mb-4">Help & Support</h1>
          <p class="text-muted-foreground">Documentation, tutorials, and support options — coming soon.</p>
        </div>
      </div>
    </ui-app-layout>
  `,
})
export class HelpPage {
  readonly HelpCircle = HelpCircle;
}
