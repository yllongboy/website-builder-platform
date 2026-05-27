import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener, ElementRef, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-block text-left">
      <div (click)="toggleDropdown($event)" [attr.aria-haspopup]="true" [attr.aria-expanded]="isOpen">
        <ng-content select="[trigger]"></ng-content>
      </div>
      <div
        [class]="isOpen
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none'"
        class="absolute right-0 mt-2 rounded-md shadow-lg bg-white border border-border ring-1 ring-black ring-opacity-5 z-50 transition-all duration-150 ease-out origin-top-right"
        role="menu"
        aria-orientation="vertical"
        [attr.aria-hidden]="!isOpen">
        <div class="py-1">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class DropdownComponent {
  @Input() isOpen = false;
  @Output() openChange = new EventEmitter<boolean>();

  private readonly elementRef = inject(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
      this.openChange.emit(false);
      this.cdr.markForCheck();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }
}

@Component({
  selector: 'ui-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      role="menuitem"
      (click)="onClick()"
      [ngClass]="{'opacity-50 cursor-not-allowed': disabled, 'cursor-pointer hover:bg-muted': !disabled}"
      class="block px-3 py-2 text-sm text-foreground"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownItemComponent {
  @Input() disabled = false;
  @Output() itemClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.itemClick.emit();
    }
  }
}

@Component({
  selector: 'ui-dropdown-separator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<hr class="my-1 border-border" />`
})
export class DropdownSeparatorComponent {}