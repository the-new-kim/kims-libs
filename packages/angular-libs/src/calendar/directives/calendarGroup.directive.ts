import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  effect,
  inject,
  Input,
  OnInit,
  QueryList,
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
export class CalendarGroupDirective implements OnInit, AfterContentInit {
  private readonly _defaultConfig = inject(CALENDAR_CONFIG);
  @ContentChildren(CalendarDirective, { descendants: true })
  calendars?: QueryList<CalendarDirective>;

  @Input() config?: Partial<CalendarConfig>;

  offset = signal(0);

  constructor(private cdRef: ChangeDetectorRef) {
    effect(
      () => {
        const offset = this.offset();
        this.calendars?.forEach((calendar) => {
          calendar.setDateByMonthOffset(offset);
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

  ngAfterContentInit(): void {
    this.calendars?.forEach((calendar, i) => {
      const defaultDate = adjustDate(
        'month',
        this.config?.defaultDate || new Date(),
        i
      );
      calendar.config = { ...this.config, defaultDate };
    });

    this.cdRef.detectChanges();
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