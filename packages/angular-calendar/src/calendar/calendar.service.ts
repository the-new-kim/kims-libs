import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CalendarGridItem,
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
export class CalendarService {
  private configSubject: BehaviorSubject<CalendarConfig>;
  private config$: Observable<CalendarConfig>;

  private dateSubject: BehaviorSubject<Date>;
  date$: Observable<Date>;
  private gridsSubject = new BehaviorSubject<CalendarGridItem[]>([]);
  grids$ = this.gridsSubject.asObservable();

  readonly weekStart: number;
  readonly minDate: Date;
  readonly maxDate: Date;
  readonly calendarQuantity: number;

  // currentCalendarRange: { start: Date; end: Date };

  constructor(
    @Optional()
    @Inject(CALENDAR_CONFIG)
    private config: CalendarConfig | null
  ) {
    // Initialize config using Dependency Injection
    const { defaultDate, weekStart, minDate, maxDate, calendarQuantity } =
      this.config || DEFAULT_CALENDAR_CONFIG;

    this.dateSubject = new BehaviorSubject(defaultDate);
    this.date$ = this.dateSubject.asObservable();

    this.weekStart = weekStart;
    this.calendarQuantity = calendarQuantity;
    this.minDate = minDate;
    this.maxDate = maxDate;

    this.date$.subscribe(() => this.updateCalendarGrid());

    // In cases where configuration is dynamically set within the component
    this.configSubject = new BehaviorSubject(
      this.config || DEFAULT_CALENDAR_CONFIG
    );
    this.config$ = this.configSubject.asObservable();

    this.config$.subscribe(
      ({ defaultDate, weekStart, minDate, maxDate, calendarQuantity }) => {
        this.dateSubject.next(defaultDate);
        (this as { weekStart: number }).weekStart = weekStart;
        (this as { calendarQuantity: number }).calendarQuantity =
          calendarQuantity;
        (this as { minDate: Date }).minDate = minDate;
        (this as { maxDate: Date }).maxDate = maxDate;

        this.updateCalendarGrid();
      }
    );
  }

  setConfig(config: Partial<CalendarConfig>) {
    this.configSubject.next({ ...this.configSubject.value, ...config });
  }

  private updateCalendarGrid() {
    const gridsTemp: CalendarGridItem[] = [];
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
    if (startDate < this.minDate || endDate > this.maxDate) return;
    this.dateSubject.next(new Date(date));
  }

  prevMonth() {
    // check only the first date of grids
    const newDate = new Date(
      this.dateSubject.value.getFullYear(),
      this.dateSubject.value.getMonth() - 1
    );
    if (newDate < this.minDate) return;
    this.dateSubject.next(newDate);
  }

  nextMonth() {
    // check only the last date of grids

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

  private getYearMonth(index: number | 'first' | 'last') {
    index =
      index === 'first'
        ? 0
        : index === 'last'
        ? this.calendarQuantity - 1
        : index;
    const { year, month } = this.gridsSubject.value[index];
    return new Date(year, month, 1);
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

// import { Inject, Injectable, Optional } from '@angular/core';
// import {
//   CalendarGrid,
//   generateCalendarGrid,
//   isDateEqual,
//   isDateWithinRange,
// } from '@kims-libs/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import {
//   CalendarConfig,
//   CALENDAR_CONFIG,
//   DEFAULT_CALENDAR_CONFIG,
// } from './calendar.config';

// @Injectable()
// export class CalendarService {
//   private dateSubject: BehaviorSubject<Date>;
//   date$: Observable<Date>;
//   private gridSubject = new BehaviorSubject<CalendarGrid>([]);
//   grid$ = this.gridSubject.asObservable();

//   private weekStart: number;
//   private minDate: Date;
//   private maxDate: Date;

//   constructor(
//     @Optional() @Inject(CALENDAR_CONFIG) private config: CalendarConfig | null
//   ) {
//     const { defaultDate, weekStart, minDate, maxDate } =
//       this.config || DEFAULT_CALENDAR_CONFIG;

//     this.weekStart = weekStart;
//     this.minDate = minDate;
//     this.maxDate = maxDate;
//     this.dateSubject = new BehaviorSubject(defaultDate);

//     this.date$ = this.dateSubject.asObservable();
//     this.updateCalendarGrid();
//     this.date$.subscribe(() => this.updateCalendarGrid());
//   }

//   private updateCalendarGrid() {
//     this.gridSubject.next(
//       generateCalendarGrid(this.dateSubject.value, this.weekStart)
//     );
//   }

//   setDate(date?: Date) {
//     if (
//       !date ||
//       isDateEqual('month', date, this.dateSubject.value) ||
//       !isDateWithinRange(date, this.minDate, this.maxDate)
//     )
//       return;
//     this.dateSubject.next(date);
//   }

//   setMonth(month: number) {
//     this.setDate(new Date(this.dateSubject.value.getFullYear(), month, 1));
//   }

//   prevMonth() {
//     this.setMonth(this.dateSubject.value.getMonth() - 1);
//   }

//   nextMonth() {
//     this.setMonth(this.dateSubject.value.getMonth() + 1);
//   }

//   setYear(year: number) {
//     this.setDate(new Date(year, this.dateSubject.value.getMonth(), 1));
//   }

//   prevYear() {
//     this.setMonth(this.dateSubject.value.getFullYear() - 1);
//   }

//   nextYear() {
//     this.setMonth(this.dateSubject.value.getFullYear() + 1);
//   }
// }
