import { Component, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-tooltip, [uiTooltip]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-block" (mouseenter)="showTooltip = true" (mouseleave)="showTooltip = false">
      <ng-content></ng-content>
      <div *ngIf="showTooltip && content" class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-popover rounded-md border border-border whitespace-nowrap z-50">
        {{ content }}
      </div>
    </div>
  `
})
export class TooltipComponent {
  @Input() content = '';
  showTooltip = false;
}