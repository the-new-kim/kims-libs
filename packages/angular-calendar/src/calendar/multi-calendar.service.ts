import { Inject, Injectable, Optional } from '@angular/core';
import { CalendarMethods } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CalendarGrid,
  generateCalendarGrid,
  isDateEqual,
  isDateWithinRange,
} from '@kims-libs/core';

import {
  CALENDAR_CONFIG,
  CalendarConfig,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';

@Injectable({
  providedIn: 'root',
})
export class MultiCalendarService implements CalendarMethods {
  private dateSubject: BehaviorSubject<Date>;
  date$: Observable<Date>;
  private gridsSubject = new BehaviorSubject<MultiCalendarGrid[]>([]);
  grids$ = this.gridsSubject.asObservable();

  private weekStart: number;
  minDate: Date;
  maxDate: Date;
  private calendarQuantity: number;

  constructor(
    @Optional()
    @Inject(CALENDAR_CONFIG)
    private config: CalendarConfig | null
  ) {
    const { defaultDate, weekStart, minDate, maxDate, calendarQuantity } =
      this.config || DEFAULT_CALENDAR_CONFIG;

    this.weekStart = weekStart;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.calendarQuantity = calendarQuantity;
    this.dateSubject = new BehaviorSubject(defaultDate);

    this.date$ = this.dateSubject.asObservable();
    this.updateCalendarGrid();
    this.date$.subscribe(() => this.updateCalendarGrid());
  }

  private updateCalendarGrid() {
    const gridsTemp: MultiCalendarGrid[] = [];

    for (let i = 0; i < this.calendarQuantity; i++) {
      const dateTemp = new Date(
        this.dateSubject.value.getFullYear(),
        this.dateSubject.value.getMonth() + i,
        1
      );
      gridsTemp.push(generateCalendarGrid(dateTemp, this.weekStart, true));
    }

    this.gridsSubject.next(gridsTemp);
  }

  setDate(date?: Date) {
    const { startDate, endDate } = this.getStartEndDate(
      new Date(
        this.gridsSubject.value[0].year,
        this.gridsSubject.value[0].month,
        1
      )
    );
    if (
      !date ||
      isDateEqual('month', date, this.dateSubject.value) ||
      !isDateWithinRange(date, this.minDate, this.maxDate) ||
      isDateWithinRange(date, startDate, endDate)
    ) {
      return;
    }
    this.dateSubject.next(date);
  }

  setMonth(month: number) {
    const date = new Date(this.dateSubject.value.getFullYear(), month, 1);
    const { startDate, endDate } = this.getStartEndDate(date);
    console.log('startDate < this.minDate:::', startDate < this.minDate);
    console.log('endDate > this.maxDate:::', endDate > this.maxDate);
    if (startDate < this.minDate || endDate > this.maxDate) return;
    this.dateSubject.next(new Date(date));
  }

  prevMonth() {
    // startDate 만 확인
    this.setMonth(this.dateSubject.value.getMonth() - 1);
  }

  nextMonth() {
    // endDate 만 확인
    this.setMonth(this.dateSubject.value.getMonth() + 1);
  }

  setYear(year: number) {
    // this.setDate(new Date(year, this.dateSubject.value.getMonth(), 1));
    this.dateSubject.next(new Date(year, this.dateSubject.value.getMonth(), 1));
  }

  prevYear() {
    this.setMonth(this.dateSubject.value.getFullYear() - 1);
  }

  nextYear() {
    this.setMonth(this.dateSubject.value.getFullYear() + 1);
  }

  private getStartEndDate(startDate: Date) {
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + this.calendarQuantity,
      0
    );

    return {
      startDate,
      endDate,
    };
  }

  getCalendarQuantity() {
    return this.calendarQuantity;
  }
}

export type MultiCalendarGrid = {
  year: number;
  month: number;
  grid: CalendarGrid;
};
