import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      <div class="flex gap-1 rounded-lg bg-muted p-1">
        <button
          *ngFor="let tab of tabs"
          (click)="selectTab(tab.id)"
          [ngClass]="tab.id === activeTab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
          class="flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="mt-4">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTab = '';
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string) {
    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }
}