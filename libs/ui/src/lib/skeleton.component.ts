import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [style.width]="width"
      [style.height]="height"
      [ngClass]="{'rounded-full': rounded, 'rounded-md': !rounded}"
      class="bg-muted animate-pulse"
    ></div>
  `
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() rounded = false;
}