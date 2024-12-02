import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarDirective } from './calendar.directive';
import { CALENDAR_CONFIG } from '../calendar.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: ` <div calendar [(ngModel)]="selectedDate"></div> `,
})
class TestComponent {
  selectedDate = new Date(2023, 5, 15);
}

describe('CalendarDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let calendarDirective: CalendarDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CalendarDirective],
      declarations: [TestComponent],
      providers: [
        {
          provide: CALENDAR_CONFIG,
          useValue: {
            defaultDate: new Date(2023, 0, 1),
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
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2030, 11, 31),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    // Correct way to get the directive instance
    const debugElement = fixture.debugElement.query(
      By.directive(CalendarDirective)
    );
    calendarDirective = debugElement.injector.get(CalendarDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(calendarDirective).toBeTruthy();
  });

  describe('Date Setting and Validation', () => {
    it('should set date correctly', () => {
      const testDate = new Date(2023, 7, 20);
      calendarDirective.setDate(testDate);

      expect(calendarDirective.year()).toBe(2023);
      expect(calendarDirective.monthIndex()).toBe(7);
    });

    it('should not set invalid dates', () => {
      const invalidDate = new Date('Invalid Date');
      const originalDate = calendarDirective['_date']();

      calendarDirective.setDate(invalidDate);

      expect(calendarDirective['_date']()).toEqual(originalDate);
    });

    it('should respect minDate and maxDate', () => {
      const beforeMinDate = new Date(2019, 0, 1);
      const afterMaxDate = new Date(2031, 0, 1);
      const originalDate = calendarDirective['_date']();

      calendarDirective.setDate(beforeMinDate);
      expect(calendarDirective['_date']()).toEqual(originalDate);

      calendarDirective.setDate(afterMaxDate);
      expect(calendarDirective['_date']()).toEqual(originalDate);
    });
  });

  describe('Month and Year Navigation', () => {
    it('should go to previous month', () => {
      const initialDate = new Date(2023, 5, 15);
      calendarDirective.setDate(initialDate);

      calendarDirective.prevMonth();

      expect(calendarDirective.year()).toBe(2023);
      expect(calendarDirective.monthIndex()).toBe(4);
    });

    it('should go to next month', () => {
      const initialDate = new Date(2023, 5, 15);
      calendarDirective.setDate(initialDate);

      calendarDirective.nextMonth();

      expect(calendarDirective.year()).toBe(2023);
      expect(calendarDirective.monthIndex()).toBe(6);
    });

    it('should go to previous year', () => {
      const initialDate = new Date(2023, 5, 15);
      calendarDirective.setDate(initialDate);

      calendarDirective.prevYear();

      expect(calendarDirective.year()).toBe(2022);
      expect(calendarDirective.monthIndex()).toBe(5);
    });

    it('should go to next year', () => {
      const initialDate = new Date(2023, 5, 15);
      calendarDirective.setDate(initialDate);

      calendarDirective.nextYear();

      expect(calendarDirective.year()).toBe(2024);
      expect(calendarDirective.monthIndex()).toBe(5);
    });
  });

  describe('ControlValueAccessor Implementation', () => {
    it('should update model when date is set', () => {
      const testDate = new Date(2023, 7, 20);
      calendarDirective.writeValue(testDate);

      expect(component.selectedDate).toEqual(testDate);
    });

    it('should handle disabled state', () => {
      const testDate = new Date(2023, 7, 20);

      calendarDirective.setDisabledState(true);
      calendarDirective.setDate(testDate);

      expect(calendarDirective['_date']().getMonth()).not.toBe(7);
    });

    it('should register onChange and onTouched callbacks', () => {
      const onChangeSpy = jest.fn();
      const onTouchedSpy = jest.fn();

      calendarDirective.registerOnChange(onChangeSpy);
      calendarDirective.registerOnTouched(onTouchedSpy);

      const newDate = new Date(2024, 11, 25);
      calendarDirective.setDate(newDate);

      expect(onChangeSpy).toHaveBeenCalledWith(newDate);
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Grid Generation', () => {
    it('should generate calendar grid', () => {
      const grid = calendarDirective.grid();

      expect(grid).toBeTruthy();
      expect(grid.length).toBeGreaterThan(0);
      expect(grid[0].length).toBe(7); // 7 days in a week
    });
  });
});
