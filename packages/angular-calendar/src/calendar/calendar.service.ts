import { computed, Inject, Injectable, Optional, signal } from '@angular/core';
import {
  generateCalendarGrid,
  isDateEqual,
  MonthNames,
  WeekDayNames,
} from '@kims-libs/core';

import {
  CalendarConfig,
  CALENDAR_CONFIG,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';

@Injectable()
export class CalendarService {
  date = signal<Date>(new Date());
  year = computed(() => this.date().getFullYear());
  month = computed(() => this.monthNames[this.date().getMonth()]);
  monthIndex = computed(() => this.date().getMonth());
  grid = computed(() => generateCalendarGrid(this.date(), this.weekStart));

  private weekStart: number;
  monthNames: MonthNames;
  weekDayNames: WeekDayNames;

  constructor(
    @Optional() @Inject(CALENDAR_CONFIG) private config: CalendarConfig | null
  ) {
    const { defaultDate, weekStart, monthNames, weekDayNames } =
      this.config || DEFAULT_CALENDAR_CONFIG;

    this.weekStart = weekStart;

    this.monthNames = monthNames;
    this.weekDayNames = weekDayNames;
    this.date.set(defaultDate);
  }

  setDate(date: Date) {
    if (isDateEqual('month', date, this.date())) return;
    this.date.set(date);
  }

  setMonth(month: number) {
    this.setDate(new Date(this.date().getFullYear(), month, 1));
  }

  prevMonth() {
    this.setMonth(this.date().getMonth() - 1);
  }

  nextMonth() {
    this.setMonth(this.date().getMonth() + 1);
  }

  setYear(year: number) {
    this.setDate(new Date(year, this.date().getMonth(), 1));
  }

  prevYear() {
    this.setYear(this.date().getFullYear() - 1);
  }

  nextYear() {
    this.setYear(this.date().getFullYear() + 1);
  }
}
