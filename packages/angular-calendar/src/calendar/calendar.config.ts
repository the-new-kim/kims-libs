import { InjectionToken, Provider } from '@angular/core';
import { freezeDate } from '@kims-libs/core';

export interface CalendarConfig {
  weekStart: number;
  defaultDate: Date;
  minDate: Date;
  maxDate: Date;
  calendarQuantity: number;
}

export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  weekStart: 0,
  defaultDate: freezeDate(new Date()),
  minDate: freezeDate(new Date(1900, 0, 1)),
  maxDate: freezeDate(new Date(2024, 11, 31)),
  calendarQuantity: 4,
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
