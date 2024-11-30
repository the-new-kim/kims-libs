import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatDirective } from './dateFormat.directive';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  template: ` <input type="text" dateFormat [(ngModel)]="date" /> `,
  standalone: true,
  imports: [DateFormatDirective, FormsModule],
})
class TestComponent {
  date = new Date(2023, 5, 15); // June 15, 2023
}

describe('DateFormatDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let dateFormatDirective: DateFormatDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [DatePipe, Renderer2],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(
      By.directive(DateFormatDirective)
    );
    dateFormatDirective = debugElement.injector.get(DateFormatDirective);
    inputElement = debugElement.nativeElement;
  });

  it('should create an instance of the directive', () => {
    expect(dateFormatDirective).toBeTruthy();
  });

  it('should format date on input change', () => {
    inputElement.value = '2023-06-15';
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('2023-06-15');
  });

  it('should correctly update the model when input changes', () => {
    inputElement.value = '2023-07-20';
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.date.toDateString()).toEqual(
      new Date(2023, 6, 20).toDateString()
    );
  });

  it('should handle invalid date input gracefully', () => {
    const originalDate = component.date;
    inputElement.value = 'invalid-date';
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.date.toDateString()).toEqual(originalDate.toDateString());
  });

  it('should set disabled state of the input', () => {
    dateFormatDirective.setDisabledState(true);
    expect(inputElement.disabled).toBe(true);

    dateFormatDirective.setDisabledState(false);
    expect(inputElement.disabled).toBe(false);
  });

  it('should format the initial value on load', () => {
    fixture.detectChanges();
    expect(inputElement.value).toBe('2023-06-15');
  });

  it('should call onTouched when input is blurred', () => {
    const onTouchedSpy = jest.fn();
    dateFormatDirective.registerOnTouched(onTouchedSpy);

    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should call onChange when the date is updated', () => {
    const onChangeSpy = jest.fn();
    dateFormatDirective.registerOnChange(onChangeSpy);

    inputElement.value = '2023-08-10';
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith(new Date('2023-08-10'));
  });
});
