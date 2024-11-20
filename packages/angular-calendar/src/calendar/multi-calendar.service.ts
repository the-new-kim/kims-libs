import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  adjustDate,
  CalendarGrid,
  CalendarItem,
  freezeDate,
  generateCalendarGrid,
  isDateEqual,
  isDateWithinRange,
} from '@kims-libs/core';

import {
  CALENDAR_CONFIG,
  CalendarConfig,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';
import { CalendarGridService } from './calendar-grid.service';

@Injectable()
export class MultiCalendarService {
  ////// 아래 부분 합치기
  private dateSubject: BehaviorSubject<Date>;
  private date$: Observable<Date>;
  private lastDate: Date;

  readonly weekStart: number;
  readonly calendarQuantity: number;
  readonly minDate: Date;
  readonly maxDate: Date;

  sharedGrids: Map<string, CalendarGrid>;
  calendarItems: CalendarItem[] = [];

  isDateEqual = isDateEqual;
  adjustDate = adjustDate;
  isDateWithinRange = isDateWithinRange;

  private subscription = new Subscription();
  hash = 0;
  constructor(
    private calendarGridService: CalendarGridService,
    @Optional()
    @Inject(CALENDAR_CONFIG)
    private config: CalendarConfig | null
  ) {
    this.hash = Math.random();

    this.sharedGrids = this.calendarGridService.grids;
    const { defaultDate, weekStart, minDate, maxDate, calendarQuantity } =
      this.config || DEFAULT_CALENDAR_CONFIG;

    this.dateSubject = new BehaviorSubject(defaultDate);
    this.date$ = this.dateSubject.asObservable();
    this.lastDate = adjustDate('month', defaultDate, calendarQuantity);

    this.weekStart = weekStart;
    this.calendarQuantity = calendarQuantity;
    this.minDate = freezeDate(minDate);
    this.maxDate = freezeDate(maxDate);
  }

  getHash() {
    return this.hash;
  }

  init(config?: Partial<CalendarConfig>) {
    if (config) {
      this.config = {
        ...DEFAULT_CALENDAR_CONFIG,
        ...this.config,
        ...config,
      };
      const { weekStart, defaultDate, minDate, maxDate, calendarQuantity } =
        this.config;

      this.dateSubject.next(defaultDate);
      this.lastDate = adjustDate('month', defaultDate, calendarQuantity);
      (this as { weekStart: number }).weekStart = weekStart;
      (this as { calendarQuantity: number }).calendarQuantity =
        calendarQuantity;
      (this as { minDate: Date }).minDate = freezeDate(minDate);
      (this as { maxDate: Date }).maxDate = freezeDate(maxDate);
    }

    this.subscription.add(
      this.date$.subscribe(() => this.updateCalendarGrid())
    );
  }

  destroy() {
    this.subscription.unsubscribe();
  }

  private updateCalendarGrid() {
    this.calendarItems = [];

    for (let i = 0; i < this.calendarQuantity; i++) {
      const dateTemp = new Date(
        this.dateSubject.value.getFullYear(),
        this.dateSubject.value.getMonth() + i,
        1
      );

      if (i === this.calendarQuantity - 1) {
        this.lastDate = dateTemp;
      }

      const year = dateTemp.getFullYear();
      const month = dateTemp.getMonth();
      const key = year + '-' + month;

      if (!this.sharedGrids.has(key)) {
        this.sharedGrids.set(
          key,
          generateCalendarGrid(dateTemp, this.weekStart)
        );
      }

      this.calendarItems.push({
        year,
        month,
        grid: this.sharedGrids.get(key) as CalendarGrid,
      });
    }
  }

  setDate(date: Date) {
    if (
      isDateEqual('month', date, this.dateSubject.value) ||
      !isDateWithinRange(date, this.minDate, this.maxDate) ||
      isDateWithinRange(date, this.dateSubject.value, this.lastDate)
    )
      return;
    this.dateSubject.next(date);
  }

  setMonth(month: number) {
    this.setDate(new Date(this.dateSubject.value.getFullYear(), month));
  }

  prevMonth() {
    if (this.validate('prevMonth')) {
      const prevMonth = adjustDate('month', this.dateSubject.value, -1);
      this.dateSubject.next(prevMonth);
    }
  }

  nextMonth() {
    if (this.validate('nextMonth')) {
      const nextMonth = adjustDate('month', this.dateSubject.value, 1);
      this.dateSubject.next(nextMonth);
    }
  }

  setYear(year: number) {
    this.setDate(new Date(year, this.dateSubject.value.getMonth()));
  }

  prevYear() {
    this.setYear(this.dateSubject.value.getFullYear() - 1);
  }

  nextYear() {
    this.setYear(this.dateSubject.value.getFullYear() + 1);
  }

  validate(type: 'nextMonth' | 'prevMonth' | 'nextYear' | 'prevYear') {
    switch (type) {
      case 'nextMonth': {
        const nextMonth = new Date(
          this.lastDate.getFullYear(),
          this.lastDate.getMonth() + 1,
          1
        );
        return nextMonth <= this.maxDate;
      }
      case 'prevMonth': {
        const prevMonth = new Date(
          this.dateSubject.value.getFullYear(),
          this.dateSubject.value.getMonth(),
          0
        );
        return prevMonth >= this.minDate;
      }
      case 'nextYear': {
        const nextYear = new Date(this.lastDate.getFullYear() + 1, 0, 1);
        return nextYear <= this.maxDate;
      }
      case 'prevYear': {
        const prevYear = new Date(this.lastDate.getFullYear() - 1, 12, 0);
        return prevYear <= this.maxDate;
      }
      default:
        return false;
    }
  }
}
