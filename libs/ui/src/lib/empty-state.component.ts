import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
      <p *ngIf="description" class="text-sm text-muted-foreground">{{ description }}</p>
      <ui-button *ngIf="actionLabel" (click)="onAction()">{{ actionLabel }}</ui-button>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() title = 'Nothing here yet';
  @Input() description = '';
  @Input() actionLabel = '';
  
  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}