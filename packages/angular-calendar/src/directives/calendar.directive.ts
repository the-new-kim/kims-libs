import {
  Directive,
  forwardRef,
  inject,
  Input,
  OnInit,
  Provider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CalendarConfig } from '../calendar.config';
import { CalendarService } from '../services/calendar.service';
import { isDateEqual } from '@kims-libs/core';

export const CALENDAR_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarDirective),
  multi: true,
};

@Directive({
  selector: 'calendar, [calendar]',
  providers: [CalendarService, CALENDAR_CONTROL_VALUE_ACCESSOR],
  standalone: true,
  exportAs: 'calendar',
})
export class CalendarDirective implements OnInit, ControlValueAccessor {
  @Input() defaultDate?: Date;
  @Input() config?: Partial<CalendarConfig>;

  private _calendar = inject(CalendarService);

  // ControlValueAccessor implementation
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: Date) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  monthNames = this._calendar.monthNames;
  weekDayNames = this._calendar.weekDayNames;

  get grid() {
    return this._calendar.grid();
  }
  get year() {
    return this._calendar.year();
  }
  get monthIndex() {
    return this._calendar.monthIndex();
  }
  get month() {
    return this._calendar.month();
  }

  isDateEqual = isDateEqual;

  setDate(date: Date) {
    this._calendar.setDate(date);
    this.onChange(date);
    this.onTouched();
  }
  setMonth(month: number) {
    this._calendar.setMonth(month);
  }

  nextMonth() {
    this._calendar.nextMonth();
  }
  prevMonth() {
    this._calendar.prevMonth();
  }
  nextYear() {
    this._calendar.nextYear();
  }
  prevYear() {
    this._calendar.prevYear();
  }

  ngOnInit(): void {
    if (this.defaultDate) {
      this._calendar.setDate(this.defaultDate);
    }
  }

  writeValue(value: Date): void {
    if (value) {
      this.setDate(value);
    }
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // // Optional: Add support for disabled state
  // setDisabledState?(isDisabled: boolean): void {
  //   // Implement disable logic if needed
  // }
}
