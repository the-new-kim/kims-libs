import {
  Directive,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CALENDAR_CONFIG, CalendarConfig } from '../calendar.config';
import { CalendarDirective } from './calendar.directive';
import { adjustDate } from '@kims-libs/core';

@Directive({
  selector: '[calendarGroup]',
  standalone: true,
  exportAs: 'calendarGroup',
})
export class CalendarGroupDirective implements OnInit {
  private readonly _defaultConfig = inject(CALENDAR_CONFIG);
  private _calendars: CalendarDirective[] = [];

  @Input() config?: Partial<CalendarConfig>;

  offset = signal(0);

  constructor() {
    effect(
      () => {
        this._calendars.forEach((calendar) => {
          calendar.setDateByMonthOffset(this.offset());
        });
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  ngOnInit(): void {
    this.config = { ...this._defaultConfig, ...this.config };
  }

  private _getDefaultCalendarConfig(index: number) {
    return {
      ...this.config,
      defaultDate: adjustDate(
        'month',
        this.config?.defaultDate || new Date(),
        index
      ),
    };
  }

  addCalendar(calendar: CalendarDirective) {
    calendar.config = this._getDefaultCalendarConfig(this._calendars.length);
    this._calendars = [...this._calendars, calendar];
  }

  setOffset(offset: number) {
    this.offset.set(offset);
  }

  prevMonth() {
    this.offset.update((offset) => offset - 1);
  }

  nextMonth() {
    this.offset.update((offset) => offset + 1);
  }

  prevYear() {
    this.offset.update((offset) => offset - 12);
  }

  nextYear() {
    this.offset.update((offset) => offset + 12);
  }
}
