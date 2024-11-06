import { Inject, Injectable, Optional } from '@angular/core';
import {
  CalendarGrid,
  generateCalendarGrid,
  isDateEqual,
  isDateWithinRange,
} from '@kims-libs/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CalendarConfig,
  CALENDAR_CONFIG,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';
import { CalendarMethods } from '../types';

@Injectable()
export class CalendarService implements CalendarMethods {
  private dateSubject: BehaviorSubject<Date>;
  date$: Observable<Date>;
  private gridSubject = new BehaviorSubject<CalendarGrid>([]);
  grid$ = this.gridSubject.asObservable();

  private weekStart: number;
  private minDate: Date;
  private maxDate: Date;

  constructor(
    @Optional() @Inject(CALENDAR_CONFIG) private config: CalendarConfig | null
  ) {
    const { defaultDate, weekStart, minDate, maxDate } =
      this.config || DEFAULT_CALENDAR_CONFIG;

    this.weekStart = weekStart;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.dateSubject = new BehaviorSubject(defaultDate);

    this.date$ = this.dateSubject.asObservable();
    this.updateCalendarGrid();
    this.date$.subscribe(() => this.updateCalendarGrid());
  }

  private updateCalendarGrid() {
    this.gridSubject.next(
      generateCalendarGrid(this.dateSubject.value, this.weekStart)
    );
  }

  setDate(date?: Date) {
    if (
      !date ||
      isDateEqual('month', date, this.dateSubject.value) ||
      !isDateWithinRange(date, this.minDate, this.maxDate)
    )
      return;
    this.dateSubject.next(date);
  }

  setMonth(month: number) {
    this.setDate(new Date(this.dateSubject.value.getFullYear(), month, 1));
  }

  prevMonth() {
    this.setMonth(this.dateSubject.value.getMonth() - 1);
  }

  nextMonth() {
    this.setMonth(this.dateSubject.value.getMonth() + 1);
  }

  setYear(year: number) {
    this.setDate(new Date(year, this.dateSubject.value.getMonth(), 1));
  }

  prevYear() {
    this.setMonth(this.dateSubject.value.getFullYear() - 1);
  }

  nextYear() {
    this.setMonth(this.dateSubject.value.getFullYear() + 1);
  }
}
