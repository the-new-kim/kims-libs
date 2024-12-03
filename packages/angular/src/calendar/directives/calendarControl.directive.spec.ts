import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarControlDirective } from './calendarControl.directive';
import { CalendarGroupDirective } from './calendarGroup.directive';
import { CalendarDirective } from './calendar.directive';
import { CALENDAR_CONFIG } from '../calendar.config';
import { FormsModule } from '@angular/forms';

// TestComponent for CalendarGroup scenario
@Component({
  template: `
    <div calendarGroup>
      <button prevMonth>Previous Month</button>
      <button nextMonth>Next Month</button>
      <button prevYear>Previous Year</button>
      <button nextYear>Next Year</button>
      <div
        calendar
        *ngFor="let calendar of [0, 1, 2]"
        [(ngModel)]="selectedDate"
      ></div>
    </div>
  `,
})
class CalendarGroupTestComponent {
  selectedDate?: Date;
}

describe('CalendarControlDirective with CalendarGroupDirective', () => {
  let fixture: ComponentFixture<CalendarGroupTestComponent>;
  let calendarGroupEl: DebugElement;
  let calendarGroupDirective: CalendarGroupDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarControlDirective,
        CalendarGroupDirective,
        CalendarDirective,
        FormsModule,
      ],
      declarations: [CalendarGroupTestComponent],
      providers: [
        {
          provide: CALENDAR_CONFIG,
          useValue: {
            defaultDate: new Date(2024, 10, 1),
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

    fixture = TestBed.createComponent(CalendarGroupTestComponent);
    calendarGroupEl = fixture.debugElement.query(
      By.directive(CalendarGroupDirective)
    );
    calendarGroupDirective = calendarGroupEl.injector.get(
      CalendarGroupDirective
    );
    fixture.detectChanges();
  });

  it('should create the calendar control directive', () => {
    expect(calendarGroupDirective).toBeTruthy();
  });

  it('should navigate to the next month when nextMonth button is clicked', () => {
    const nextMonthButton = fixture.debugElement.query(
      By.css('button[nextMonth]')
    );
    nextMonthButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
      const expectedDate = new Date(2024, 11 + index, 1);
      expect(calendar['_date']().toDateString()).toBe(
        expectedDate.toDateString()
      );
    });
  });

  it('should navigate to the previous month when prevMonth button is clicked', () => {
    const prevMonthButton = fixture.debugElement.query(
      By.css('button[prevMonth]')
    );
    prevMonthButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
      const expectedDate = new Date(2024, 9 + index, 1);
      expect(calendar['_date']().toDateString()).toBe(
        expectedDate.toDateString()
      );
    });
  });

  it('should navigate to the next year when nextYear button is clicked', () => {
    const nextYearButton = fixture.debugElement.query(
      By.css('button[nextYear]')
    );
    nextYearButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
      const expectedDate = new Date(2025, 10 + index, 1);
      expect(calendar['_date']().toDateString()).toBe(
        expectedDate.toDateString()
      );
    });
  });

  it('should navigate to the previous year when prevYear button is clicked', () => {
    const prevYearButton = fixture.debugElement.query(
      By.css('button[prevYear]')
    );
    prevYearButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
      const expectedDate = new Date(2023, 10 + index, 1);
      expect(calendar['_date']().toDateString()).toBe(
        expectedDate.toDateString()
      );
    });
  });
});

// TestComponent for CalendarDirective scenario
@Component({
  template: `
    <div calendar [(ngModel)]="selectedDate">
      <button prevMonth>Previous Month</button>
      <button nextMonth>Next Month</button>
      <button prevYear>Previous Year</button>
      <button nextYear>Next Year</button>
    </div>
  `,
})
class CalendarTestComponent {
  selectedDate?: Date;
}

describe('CalendarControlDirective with CalendarDirective', () => {
  let fixture: ComponentFixture<CalendarTestComponent>;
  let calendarEl: DebugElement;
  let calendarDirective: CalendarDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalendarControlDirective, CalendarDirective, FormsModule],
      declarations: [CalendarTestComponent],
      providers: [
        {
          provide: CALENDAR_CONFIG,
          useValue: {
            defaultDate: new Date(2024, 10, 1),
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

    fixture = TestBed.createComponent(CalendarTestComponent);
    calendarEl = fixture.debugElement.query(By.directive(CalendarDirective));
    calendarDirective = calendarEl.injector.get(CalendarDirective);
    fixture.detectChanges();
  });

  it('should create the calendar control directive', () => {
    expect(calendarDirective).toBeTruthy();
  });

  it('should navigate to the previous month when prevMonth button is clicked', () => {
    const prevMonthButton = fixture.debugElement.query(
      By.css('button[prevMonth]')
    );
    prevMonthButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const expectedDate = new Date(2024, 9, 1);
    expect(calendarDirective['_date']().toDateString()).toBe(
      expectedDate.toDateString()
    );
  });

  it('should navigate to the next month when nextMonth button is clicked', () => {
    const nextMonthButton = fixture.debugElement.query(
      By.css('button[nextMonth]')
    );
    nextMonthButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const expectedDate = new Date(2024, 11, 1);
    expect(calendarDirective['_date']().toDateString()).toBe(
      expectedDate.toDateString()
    );
  });

  it('should navigate to the previous year when prevYear button is clicked', () => {
    const prevYearButton = fixture.debugElement.query(
      By.css('button[prevYear]')
    );
    prevYearButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const expectedDate = new Date(2023, 10, 1);
    expect(calendarDirective['_date']().toDateString()).toBe(
      expectedDate.toDateString()
    );
  });

  it('should navigate to the next year when nextYear button is clicked', () => {
    const nextYearButton = fixture.debugElement.query(
      By.css('button[nextYear]')
    );
    nextYearButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const expectedDate = new Date(2025, 10, 1);
    expect(calendarDirective['_date']().toDateString()).toBe(
      expectedDate.toDateString()
    );
  });
});
