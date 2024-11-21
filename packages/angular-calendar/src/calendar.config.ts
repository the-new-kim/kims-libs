import { InjectionToken, Provider } from '@angular/core';
import { freezeDate, MonthNames, WeekDayNames } from '@kims-libs/core';

export interface CalendarConfig {
  weekStart: number;
  defaultDate: Date;
  calendarQuantity: number;
  monthNames: MonthNames;
  weekDayNames: WeekDayNames;
}

export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  weekStart: 0,
  defaultDate: freezeDate(new Date()),
  calendarQuantity: 1,
  monthNames: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  weekDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
} as const;

export const CALENDAR_CONFIG = new InjectionToken<CalendarConfig>(
  'CALENDAR_CONFIG'
);

export function provideCalendarConfig(
  config?: Partial<CalendarConfig>
): Provider {
  return {
    provide: CALENDAR_CONFIG,
    useValue: { ...DEFAULT_CALENDAR_CONFIG, ...config },
  };
}
