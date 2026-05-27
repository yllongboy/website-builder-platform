import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div 
        class="bg-primary h-2 rounded-full transition-all" 
        [style.width]="progressPercentage + '%'"
      ></div>
    </div>
  `
})
export class ProgressComponent {
  @Input() value = 0;
  @Input() max = 100;

  get progressPercentage(): number {
    if (this.max <= 0) return 0;
    const percentage = (this.value / this.max) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }
}