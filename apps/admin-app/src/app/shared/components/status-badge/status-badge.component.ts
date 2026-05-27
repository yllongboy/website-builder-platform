import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
          [ngClass]="getClasses()">
      {{ status }}
    </span>
  `,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: string;
  @Input() type: 'user' | 'subscription' | 'website' = 'user';

  getClasses(): string {
    if (this.type === 'user') {
      switch (this.status) {
        case 'ACTIVE': return 'bg-success/10 text-success';
        case 'SUSPENDED': return 'bg-destructive/10 text-destructive';
        case 'PENDING': return 'bg-warning/10 text-warning';
        default: return 'bg-foreground/5 text-foreground-muted';
      }
    } else if (this.type === 'subscription') {
      switch (this.status) {
        case 'ACTIVE': return 'bg-success/10 text-success';
        case 'TRIALING': return 'bg-primary/10 text-primary';
        case 'PAST_DUE': return 'bg-warning/10 text-warning';
        case 'CANCELED': return 'bg-destructive/10 text-destructive';
        case 'INCOMPLETE': return 'bg-foreground/5 text-foreground-muted';
        case 'NONE': return 'bg-foreground/5 text-foreground-muted';
        default: return 'bg-foreground/5 text-foreground-muted';
      }
    } else if (this.type === 'website') {
      switch (this.status) {
        case 'PUBLISHED': return 'bg-success/10 text-success';
        case 'DRAFT': return 'bg-foreground/5 text-foreground-muted';
        case 'ARCHIVED': return 'bg-foreground/5 text-foreground-muted';
        default: return 'bg-foreground/5 text-foreground-muted';
      }
    }
    return 'bg-foreground/5 text-foreground-muted';
  }
}
