import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarGroupDirective } from './calendarGroup.directive';
import { CalendarDirective } from './calendar.directive';
import { CALENDAR_CONFIG } from '../calendar.config';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div calendarGroup [config]="customConfig">
      <div calendar></div>
      <div calendar></div>
      <div calendar></div>
    </div>
  `,
})
class TestComponent {}

describe('CalendarGroupDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let calendarGroupDirective: CalendarGroupDirective;
  let calendarDirectives: CalendarDirective[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarGroupDirective, CalendarDirective],
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
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Retrieve the directive directly from the debug element
    const groupDebugElement = fixture.debugElement.query(
      By.directive(CalendarGroupDirective)
    );
    calendarGroupDirective = groupDebugElement.injector.get(
      CalendarGroupDirective
    );

    // Get all calendar directives
    const debugElements = fixture.debugElement.queryAll(
      By.directive(CalendarDirective)
    );
    calendarDirectives = debugElements.map((de) =>
      de.injector.get(CalendarDirective)
    );
  });

  it('should create an instance', () => {
    expect(calendarGroupDirective).toBeTruthy();
  });

  it('should initialize with default configuration', () => {
    expect(calendarGroupDirective.config).toBeTruthy();
    expect(calendarGroupDirective.config?.monthNames).toBeTruthy();
  });

  describe('Offset Management', () => {
    it('should set offset correctly', () => {
      calendarGroupDirective.setOffset(2);
      expect(calendarGroupDirective.offset()).toBe(2);
    });

    it('should increment offset on nextMonth', () => {
      const initialOffset = calendarGroupDirective.offset();
      calendarGroupDirective.nextMonth();
      expect(calendarGroupDirective.offset()).toBe(initialOffset + 1);
    });

    it('should decrement offset on prevMonth', () => {
      const initialOffset = calendarGroupDirective.offset();
      calendarGroupDirective.prevMonth();
      expect(calendarGroupDirective.offset()).toBe(initialOffset - 1);
    });

    it('should increment offset by 12 on nextYear', () => {
      const initialOffset = calendarGroupDirective.offset();
      calendarGroupDirective.nextYear();
      expect(calendarGroupDirective.offset()).toBe(initialOffset + 12);
    });

    it('should decrement offset by 12 on prevYear', () => {
      const initialOffset = calendarGroupDirective.offset();
      calendarGroupDirective.prevYear();
      expect(calendarGroupDirective.offset()).toBe(initialOffset - 12);
    });
  });

  describe('Calendar Configuration', () => {
    it('should configure child calendars on initialization', () => {
      expect(calendarDirectives.length).toBe(3);

      // Check that each calendar has been configured with a different default date
      const firstCalendarDate = calendarDirectives[0].year();
      const secondCalendarDate = calendarDirectives[1].year();
      const thirdCalendarDate = calendarDirectives[2].year();

      expect(firstCalendarDate).toBe(2023);
      expect(secondCalendarDate).toBe(2023);
      expect(thirdCalendarDate).toBe(2023);
    });
  });

  describe('Effect Behavior', () => {
    it('should update child calendars when offset changes', () => {
      // Create mock spy methods
      calendarDirectives.forEach((calendar) => {
        jest
          .spyOn(calendar, 'setDateByMonthOffset')
          .mockImplementation(() => {});
      });

      // Trigger offset change
      calendarGroupDirective.setOffset(3);
      fixture.detectChanges();

      // Check that all calendars had setDateByMonthOffset called with correct offset
      calendarDirectives.forEach((calendar) => {
        expect(calendar.setDateByMonthOffset).toHaveBeenCalledWith(3);
      });
    });

    it('should navigate to the next month for all calendars', () => {
      calendarGroupDirective.nextMonth();
      fixture.detectChanges();
      calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
        const expectedDate = new Date(2023, 1 + index, 1);
        expect(calendar['_date']().toDateString()).toBe(
          expectedDate.toDateString()
        );
      });
    });

    it('should navigate to the previous month for all calendars', () => {
      calendarGroupDirective.prevMonth();
      fixture.detectChanges();
      calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
        const expectedDate = new Date(2022, 11 + index, 1);
        expect(calendar['_date']().toDateString()).toBe(
          expectedDate.toDateString()
        );
      });
    });

    it('should navigate to the next year for all calendars', () => {
      calendarGroupDirective.nextYear();
      fixture.detectChanges();
      calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
        const expectedDate = new Date(2024, 0 + index, 1);
        expect(calendar['_date']().toDateString()).toBe(
          expectedDate.toDateString()
        );
      });
    });

    it('should navigate to the previous year for all calendars', () => {
      calendarGroupDirective.prevYear();
      fixture.detectChanges();
      calendarGroupDirective['_calendars']?.forEach((calendar, index) => {
        const expectedDate = new Date(2022, 0 + index, 1);
        expect(calendar['_date']().toDateString()).toBe(
          expectedDate.toDateString()
        );
      });
    });
  });
});
