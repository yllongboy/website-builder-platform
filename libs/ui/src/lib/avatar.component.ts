import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngClass]="['relative inline-flex shrink-0', sizeClasses[size]]">
      <img *ngIf="src; else initialsTpl" [src]="src" [alt]="alt" class="h-full w-full rounded-full object-cover" />
      <ng-template #initialsTpl>
        <div class="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
          {{ initials }}
        </div>
      </ng-template>
    </div>
  `
})
export class AvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() initials = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  sizeClasses: Record<string, string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };
}