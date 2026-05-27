import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ' + variantClasses + ' ' + sizeClasses"
      [disabled]="isLoading || disabled"
    >
      <ng-container *ngIf="isLoading; else content">
        <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin"></lucide-icon>
        Please wait
      </ng-container>
      <ng-template #content>
        <ng-content></ng-content>
      </ng-template>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' | 'icon' = 'md';
  @Input() isLoading = false;
  @Input() disabled = false;

  get variantClasses(): string {
    switch (this.variant) {
      case 'secondary': return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'outline': return 'border border-input hover:bg-accent hover:text-accent-foreground';
      case 'ghost': return 'hover:bg-accent hover:text-accent-foreground';
      case 'destructive': return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      case 'success': return 'bg-green-600 text-white hover:bg-green-700';
      default: return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'h-9 px-3 rounded-md';
      case 'lg': return 'h-11 px-8 rounded-md';
      case 'icon': return 'h-10 w-10';
      default: return 'h-10 py-2 px-4';
    }
  }
}
