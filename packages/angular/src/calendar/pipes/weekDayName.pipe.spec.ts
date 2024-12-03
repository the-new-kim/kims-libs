import { TestBed } from '@angular/core/testing';
import { WeekDayNamePipe } from './weekDayName.pipe';
// import { CalendarGroupDirective } from '../directives/calendarGroup.directive';
// import { CalendarDirective } from '../directives/calendar.directive';
import { CALENDAR_CONFIG } from '../calendar.config';

describe('WeekDayNamePipe', () => {
  let weekDayNamePipe: WeekDayNamePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeekDayNamePipe,
        {
          provide: CALENDAR_CONFIG,
          useValue: {
            weekDayNames: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
          },
        },
      ],
    });

    weekDayNamePipe = TestBed.inject(WeekDayNamePipe);
  });

  it('should create an instance', () => {
    expect(weekDayNamePipe).toBeTruthy();
  });

  describe('transform method', () => {
    it('should return day name for a Date object', () => {
      const mondayDate = new Date(2023, 5, 5); // June 5, 2023 is a Monday
      const result = weekDayNamePipe.transform(mondayDate);
      expect(result).toBe('Monday');
    });

    it('should return day name for a number', () => {
      const result = weekDayNamePipe.transform(1); // Monday
      expect(result).toBe('Monday');
    });

    it('should handle numbers > 6 using modulo', () => {
      const result = weekDayNamePipe.transform(8); // 8 % 7 = 1 (Monday)
      expect(result).toBe('Monday');
    });

    // it('should use CalendarGroupDirective config if available', () => {
    //   // Mock inject method to return a mock CalendarGroup
    //   const mockCalendarGroup = {
    //     config: {
    //       weekDayNames: mockCalendarGroupConfig.weekDayNames,
    //     },
    //   } as CalendarGroupDirective;

    //   // Manually set up the mock injection
    //   Object.defineProperty(weekDayNamePipe, '_calendarGroup', {
    //     value: mockCalendarGroup,
    //     writable: true,
    //   });

    //   const result = weekDayNamePipe.transform(1); // Monday
    //   expect(result).toBe('Monday');
    // });

    // it('should use CalendarDirective config if CalendarGroup is not available', () => {
    //   const mockCalendar = {
    //     config: {
    //       weekDayNames: [
    //         'Domingo',
    //         'Lunes',
    //         'Martes',
    //         'Miércoles',
    //         'Jueves',
    //         'Viernes',
    //         'Sábado',

    //       ],
    //     },
    //   } as CalendarDirective;

    //   // Manually set up the mock injection
    //   Object.defineProperty(weekDayNamePipe, '_calendarGroup', {
    //     value: null,
    //     writable: true,
    //   });
    //   Object.defineProperty(weekDayNamePipe, '_calendar', {
    //     value: mockCalendar,
    //     writable: true,
    //   });

    //   const result = weekDayNamePipe.transform(1); // Monday
    //   expect(result).toBe('Lunes');
    // });

    it('should fall back to default config when no custom config is provided', () => {
      // Ensure both _calendarGroup and _calendar are null
      Object.defineProperty(weekDayNamePipe, '_calendarGroup', {
        value: null,
        writable: true,
      });
      Object.defineProperty(weekDayNamePipe, '_calendar', {
        value: null,
        writable: true,
      });

      const result = weekDayNamePipe.transform(2); // Tuesday
      expect(result).toBe('Tuesday');
    });
  });
});
