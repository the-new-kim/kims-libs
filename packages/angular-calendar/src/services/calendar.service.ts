import { computed, Inject, Injectable, Optional, signal } from '@angular/core';
import {
  generateCalendarGrid,
  isDateEqual,
  isValidDate,
  MonthNames,
  WeekDayNames,
  DateUnit,
  adjustDate,
  isDateWithinRange,
} from '@kims-libs/core';

import {
  CalendarConfig,
  CALENDAR_CONFIG,
  DEFAULT_CALENDAR_CONFIG,
} from '../calendar.config';

@Injectable()
export class CalendarService {
  private readonly _date = signal<Date>(new Date());
  private readonly _selectedDate = signal<Date | null>(null);
  private readonly _minDate = signal<Date | null>(null);
  private readonly _maxDate = signal<Date | null>(null);
  private readonly _disabledDates = signal<Date[]>([]);

  // Computed values
  readonly date = computed(() => this._date());
  readonly selectedDate = computed(() => this._selectedDate());
  readonly year = computed(() => this._date().getFullYear());
  readonly month = computed(() => this.monthNames[this._date().getMonth()]);
  readonly monthIndex = computed(() => this._date().getMonth());
  readonly grid = computed(() =>
    generateCalendarGrid(this._date(), this.weekStart)
  );
  readonly minDate = computed(() => this._minDate());
  readonly maxDate = computed(() => this._maxDate());
  readonly disabledDates = computed(() => this._disabledDates());

  // Validation computeds
  readonly canGoToPrevMonth = computed(() => {
    const prevMonth = adjustDate('month', this._date(), -1);
    const minDate = this._minDate();
    return !minDate || prevMonth >= minDate;
  });

  readonly canGoToNextMonth = computed(() => {
    const nextMonth = adjustDate('month', this._date(), 1);
    const maxDate = this._maxDate();
    return !maxDate || nextMonth <= maxDate;
  });

  private weekStart: number;
  monthNames: MonthNames;
  weekDayNames: WeekDayNames;

  constructor(
    @Optional() @Inject(CALENDAR_CONFIG) private config: CalendarConfig | null
  ) {
    const {
      defaultDate,
      weekStart,
      monthNames,
      weekDayNames,
      minDate,
      maxDate,
      disabledDates = [],
    } = this.config || DEFAULT_CALENDAR_CONFIG;

    this.weekStart = weekStart;
    this.monthNames = monthNames;
    this.weekDayNames = weekDayNames;

    if (minDate) this._minDate.set(minDate);
    if (maxDate) this._maxDate.set(maxDate);

    this._date.set(this.getValidatedDate(defaultDate));
    this._disabledDates.set(disabledDates);
  }

  // Public methods
  setDate(date: Date, emitChange = true) {
    if (!this.isValidDateSelection(date)) return false;

    this._date.set(date);
    if (emitChange) {
      this._selectedDate.set(date);
    }
    return true;
  }

  selectDate(date: Date) {
    if (!this.isValidDateSelection(date)) return false;
    this._selectedDate.set(date);
    return true;
  }

  setMonth(month: number) {
    const newDate = new Date(this._date().getFullYear(), month, 1);
    return this.setDate(newDate, false);
  }

  setYear(year: number) {
    const newDate = new Date(year, this._date().getMonth(), 1);
    return this.setDate(newDate, false);
  }

  prevMonth() {
    if (!this.canGoToPrevMonth()) return false;
    return this.setMonth(this._date().getMonth() - 1);
  }

  nextMonth() {
    if (!this.canGoToNextMonth()) return false;
    return this.setMonth(this._date().getMonth() + 1);
  }

  prevYear() {
    return this.setYear(this._date().getFullYear() - 1);
  }

  nextYear() {
    return this.setYear(this._date().getFullYear() + 1);
  }

  // Helper methods
  isDateEqual(unit: DateUnit, date1: Date, date2: Date | null) {
    return date2 ? isDateEqual(unit, date1, date2) : false;
  }

  private isValidDateSelection(date: Date): boolean {
    if (!isValidDate(date)) return false;

    const minDate = this._minDate();
    const maxDate = this._maxDate();
    const disabledDates = this._disabledDates();

    if (disabledDates.some((disabled) => isDateEqual('day', date, disabled))) {
      return false;
    }

    return isDateWithinRange(date, minDate, maxDate);
  }

  private getValidatedDate(date: Date): Date {
    if (!this.isValidDateSelection(date)) {
      const now = new Date();
      const minDate = this._minDate();
      const maxDate = this._maxDate();

      if (minDate && now < minDate) return minDate;
      if (maxDate && now > maxDate) return maxDate;
      return now;
    }
    return date;
  }
}
