import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="visible" [ngClass]="typeClasses[type]" class="fixed bottom-4 right-4 z-50 rounded-lg shadow-glow p-4 flex items-center gap-3 border">
      <div class="text-sm font-medium flex-1">{{ message }}</div>
      <button (click)="onDismiss()" class="ml-auto text-current opacity-70 hover:opacity-100">&times;</button>
    </div>
  `
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() visible = false;
  
  @Output() dismiss = new EventEmitter<void>();

  typeClasses: Record<string, string> = {
    success: 'bg-success/10 border-success/30 text-success',
    error: 'bg-destructive/10 border-destructive/30 text-destructive',
    warning: 'bg-warning/10 border-warning/30 text-warning',
    info: 'bg-primary/10 border-primary/30 text-primary' // or another default mapping
  };

  onDismiss() {
    this.visible = false;
    this.dismiss.emit();
  }
}