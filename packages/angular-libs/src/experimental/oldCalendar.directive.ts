import {
  Directive,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
  Provider,
  // DestroyRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CalendarService } from './calendar.service';
import { isDateEqual } from '@kims-libs/core';

export const CALENDAR_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OldCalendarDirective),
  multi: true,
};

@Directive({
  selector: 'calendar, [calendar]',
  providers: [CalendarService, CALENDAR_CONTROL_VALUE_ACCESSOR],
  standalone: true,
  exportAs: 'calendar',
})
export class OldCalendarDirective implements OnInit, ControlValueAccessor {
  @Input() defaultDate?: Date | null;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates?: Date[];
  @Input() set multiIndex(value) {
    this._multiIndex = value;
    if (typeof value === 'number') {
      this._calendar.setDate(
        new Date(this._calendar.year(), this._calendar.monthIndex() + value)
      );
    }
  }
  get multiIndex() {
    return this._multiIndex;
  }
  @Output() multiIndexChange = new EventEmitter<number>();

  private _multiIndex?: number;

  private _calendar = inject(CalendarService);
  // private _destroyRef = inject(DestroyRef);

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

  // Add state for disabled status
  private _disabled = false;

  setDate(date: Date) {
    if (this._disabled || !this.isDateValid(date)) {
      return;
    }

    this._calendar.setDate(date);
    this.onChange(date);
    this.onTouched();
  }
  setMonth(month: number) {
    this._calendar.setMonth(month);
  }

  nextMonth() {
    if (typeof this.multiIndex === 'number') {
      return this.multiIndexChange.emit(1);
    }
    this._calendar.nextMonth();
  }
  prevMonth() {
    if (typeof this.multiIndex === 'number') {
      return this.multiIndexChange.emit(-1);
    }
    this._calendar.prevMonth();
  }
  nextYear() {
    if (typeof this.multiIndex === 'number') {
      return this.multiIndexChange.emit(12);
    }
    this._calendar.nextYear();
  }
  prevYear() {
    if (typeof this.multiIndex === 'number') {
      return this.multiIndexChange.emit(-12);
    }
    this._calendar.prevYear();
  }

  isDateValid(date: Date): boolean {
    if (!date) return false;

    if (this.minDate && date < this.minDate) return false;
    if (this.maxDate && date > this.maxDate) return false;
    if (
      this.disabledDates?.some((disabled) => isDateEqual('day', disabled, date))
    )
      return false;

    return true;
  }

  ngOnInit(): void {
    if (typeof this.multiIndex === 'number') {
      return;
    } else if (this.defaultDate && this.isDateValid(this.defaultDate)) {
      this.setDate(this.defaultDate);
    }

    // Subscribe to calendar changes
    // this._calendar.dateChange
    //   .pipe(takeUntilDestroyed(this._destroyRef))
    //   .subscribe((date) => {
    //     this.onChange(date);
    //     this.onTouched();
    //   });
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

  // Implement disabled state
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
