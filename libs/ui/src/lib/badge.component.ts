import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [ngClass]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' = 'default';

  get badgeClasses() {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
    const variants: Record<string, string> = {
      default: 'bg-muted text-muted-foreground',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      success: 'bg-success/10 text-success',
      warning: 'bg-amber-500 text-white',
      destructive: 'bg-destructive/10 text-destructive',
      outline: 'border border-border text-foreground'
    };
    return `${baseClasses} ${variants[this.variant] || variants['default']}`;
  }
}