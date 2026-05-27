import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="rounded-xl border border-border bg-card text-card-foreground shadow-soft p-6"><ng-content></ng-content></div>`
})
export class CardComponent {}

@Component({
  selector: 'ui-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex flex-col space-y-1.5 p-6"><ng-content></ng-content></div>`
})
export class CardHeaderComponent {}

@Component({
  selector: 'ui-card-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h3 class="text-lg font-semibold leading-none tracking-tight"><ng-content></ng-content></h3>`
})
export class CardTitleComponent {}

@Component({
  selector: 'ui-card-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="text-sm text-muted-foreground"><ng-content></ng-content></div>`
})
export class CardDescriptionComponent {}

@Component({
  selector: 'ui-card-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="p-6 pt-0"><ng-content></ng-content></div>`
})
export class CardContentComponent {}

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="flex items-center p-6 pt-0"><ng-content></ng-content></div>`
})
export class CardFooterComponent {}