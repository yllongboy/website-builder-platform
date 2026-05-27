import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="form">
      <ui-input formControlName="name"></ui-input>
    </form>
  `,
})
class InputHostComponent {
  readonly form = new FormGroup({
    name: new FormControl(''),
  });
}

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputHostComponent>;
  let component: InputComponent;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputHostComponent);
    fixture.detectChanges();

    component = fixture.debugElement.query(By.directive(InputComponent)).componentInstance;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('registers itself as a ControlValueAccessor', () => {
    const accessors = fixture.debugElement.query(By.directive(InputComponent)).injector.get(NG_VALUE_ACCESSOR);

    expect(accessors.includes(component)).toBeTrue();
  });

  it('writeValue updates internal state', () => {
    component.writeValue('new value');
    fixture.detectChanges();

    expect(inputElement.value).toBe('new value');
  });

  it('calls registered onChange on input event', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);

    inputElement.value = 'typed';
    inputElement.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('typed');
  });

  it('calls registered onTouched on blur', () => {
    const onTouched = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouched);

    inputElement.dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalled();
  });

  it('setDisabledState disables the input', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(inputElement.disabled).toBeTrue();
  });

  it('emits valueChange on input event', () => {
    const emitSpy = jasmine.createSpy('emitSpy');
    component.valueChange.subscribe(emitSpy);

    inputElement.value = 'output value';
    inputElement.dispatchEvent(new Event('input'));

    expect(emitSpy).toHaveBeenCalledWith('output value');
  });
});
