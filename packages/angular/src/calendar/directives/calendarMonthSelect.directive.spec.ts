import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarDirective } from './calendar.directive';
import { CalendarMonthSelectDirective } from './calendarMonthSelect.directive';
import { CALENDAR_CONFIG } from '../calendar.config';
import { FormsModule } from '@angular/forms';

// TestComponent for CalendarMonthSelectDirective
@Component({
  template: ` <div calendar>
    <select monthSelect></select>
  </div>`,
})
class TestComponent {}

describe('CalendarMonthSelectDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let selectEl: DebugElement;
  let calendarEl: DebugElement;
  let calendarDirective: CalendarDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CalendarDirective, CalendarMonthSelectDirective],
      declarations: [TestComponent],
      providers: [
        {
          provide: CALENDAR_CONFIG,
          useValue: {
            defaultDate: new Date(2024, 0, 1),
            monthNames: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            weekStart: 0,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    selectEl = fixture.debugElement.query(By.css('select[monthSelect]'));
    calendarEl = fixture.debugElement.query(By.directive(CalendarDirective));
    calendarDirective = calendarEl.injector.get(CalendarDirective);

    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(selectEl).toBeTruthy();
  });

  it('should populate select element with month options', () => {
    const options = selectEl.nativeElement.options;
    expect(options.length).toBe(12);
    expect(options[0].text).toBe('January');
    expect(options[11].text).toBe('December');
  });

  it('should set the correct initial month as selected', () => {
    const selectedIndex = selectEl.nativeElement.selectedIndex;
    expect(selectedIndex).toBe(calendarDirective.monthIndex());
  });

  it('should update selected month when calendar month changes', () => {
    calendarDirective.setMonth(5); // Set to June (index 5)
    fixture.detectChanges();

    const selectedIndex = selectEl.nativeElement.selectedIndex;
    expect(selectedIndex).toBe(5);
  });

  it('should update calendar month when a different month is selected', () => {
    selectEl.nativeElement.selectedIndex = 8; // Select September (index 8)
    selectEl.triggerEventHandler('change', { target: selectEl.nativeElement });
    fixture.detectChanges();

    expect(calendarDirective.monthIndex()).toBe(8);
  });

  // it('should log error if directive is used on a non-select element', () => {
  //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

  //   const incorrectFixture = TestBed.overrideComponent(TestComponent, {
  //     set: {
  //       template: `<div monthSelect></div>`,
  //     },
  //   }).createComponent(TestComponent);

  //   incorrectFixture.detectChanges();

  //   expect(consoleErrorSpy).toHaveBeenCalledWith(
  //     'monthSelect directive can only be used on <select> elements'
  //   );

  //   consoleErrorSpy.mockRestore();
  // });
});
