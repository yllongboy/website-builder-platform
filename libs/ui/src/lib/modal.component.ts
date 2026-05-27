import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="closeModal()"></div>
      <div class="relative bg-card text-card-foreground rounded-xl shadow-glow border border-border p-6 w-full max-w-md z-10 flex flex-col gap-4">
        <button (click)="closeModal()" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          &times;
        </button>
        <div *ngIf="title || description">
          <h2 *ngIf="title" class="text-xl font-semibold">{{ title }}</h2>
          <p *ngIf="description" class="text-sm text-muted-foreground mt-1">{{ description }}</p>
        </div>
        <div>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() description = '';
  
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}