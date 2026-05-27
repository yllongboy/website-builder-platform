import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      <label *ngIf="label" class="mb-2 block text-sm font-medium">{{label}}</label>
      <div class="relative">
        <div *ngIf="showSearch || isSearch" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          <lucide-icon [img]="Search" [size]="16"></lucide-icon>
        </div>
        <input
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          [ngClass]="{'pl-10': showSearch || isSearch}"
          class="flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <p *ngIf="error" class="mt-1 text-sm text-destructive">{{error}}</p>
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() label = '';
  @Input() error = '';
  @Input() showSearch = false;
  @Input() isSearch = false;
  
  @Output() valueChange = new EventEmitter<string>();

  readonly Search = Search;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  onInput(event: Event) {
    const newVal = (event.target as HTMLInputElement).value;
    this.value = newVal;
    this.onChange(newVal);
    this.valueChange.emit(newVal);
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}