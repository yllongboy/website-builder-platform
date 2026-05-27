import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('does not render modal DOM when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.fixed.inset-0'))).toBeNull();
  });

  it('renders modal DOM when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.fixed.inset-0'))).not.toBeNull();
  });

  it('emits close when clicking the backdrop', () => {
    component.isOpen = true;
    const closeSpy = jasmine.createSpy('closeSpy');
    component.close.subscribe(closeSpy);
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.absolute.inset-0'));
    backdrop.nativeElement.click();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('emits close on Escape key', () => {
    component.isOpen = true;
    const closeSpy = jasmine.createSpy('closeSpy');
    component.close.subscribe(closeSpy);
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(closeSpy).toHaveBeenCalled();
  });

  it('renders the title text', () => {
    component.isOpen = true;
    component.title = 'Confirm action';
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2'))?.nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Confirm action');
  });

  it('renders the description text', () => {
    component.isOpen = true;
    component.description = 'This operation cannot be undone.';
    fixture.detectChanges();

    const description = fixture.debugElement.query(By.css('p'))?.nativeElement as HTMLElement;

    expect(description.textContent?.trim()).toBe('This operation cannot be undone.');
  });
});
