import {
  AfterContentInit,
  computed,
  Directive,
  forwardRef,
  inject,
  Input,
  OnInit,
  Provider,
  signal,
} from '@angular/core';
import { CALENDAR_CONFIG, CalendarConfig } from '../calendar.config';
import {
  adjustDate,
  generateCalendarGrid,
  isDateEqual,
  isValidDate,
} from '@kims-libs/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarGroupDirective } from './calendarGroup.directive';

export const CALENDAR_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarDirective),
  multi: true,
};

@Directive({
  selector: '[calendar]',
  standalone: true,
  exportAs: 'calendar',
  providers: [CALENDAR_CONTROL_VALUE_ACCESSOR],
})
export class CalendarDirective
  implements OnInit, AfterContentInit, ControlValueAccessor
{
  private _calendarGroup = inject(CalendarGroupDirective, {
    optional: true,
    skipSelf: true,
  });
  private readonly _defaultConfig = inject(CALENDAR_CONFIG);
  @Input() config: Partial<CalendarConfig> = this._defaultConfig;

  private _date = signal<Date>(this.config.defaultDate || new Date());
  year = computed(() => this._date().getFullYear());
  monthIndex = computed(() => this._date().getMonth());
  month = computed(() => this.config.monthNames?.[this.monthIndex()]);
  grid = computed(() =>
    generateCalendarGrid(this._date(), this.config.weekStart)
  );

  private _defaultDate = computed(() => this.config.defaultDate || new Date());

  // ControlValueAccessor implementation
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: Date) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};
  private _disabled = false;

  ngOnInit(): void {
    this.config = { ...this._defaultConfig, ...this.config };
  }

  ngAfterContentInit(): void {
    this._calendarGroup?.addCalendar(this);
  }

  setDate(date: Date, emitChange = true) {
    if (this._disabled || !this.isValidDateSelection(date)) {
      return;
    }
    this._date.set(date);
    if (emitChange) {
      this._onChange(date);
      this._onTouched();
    }
  }

  setDateByMonthOffset(offset: number) {
    this.setDate(adjustDate('month', this._defaultDate(), offset), false);
  }

  setMonth(month: number) {
    this.setDate(new Date(this._date().getFullYear(), month), false);
  }

  prevMonth() {
    this.setDate(adjustDate('month', this._date(), -1), false);
  }

  nextMonth() {
    this.setDate(adjustDate('month', this._date(), 1), false);
  }

  prevYear() {
    this.setDate(adjustDate('year', this._date(), -1), false);
  }

  nextYear() {
    this.setDate(adjustDate('year', this._date(), 1), false);
  }

  isValidDateSelection(date: Date): boolean {
    if (!isValidDate(date)) return false;
    const { minDate, maxDate, disabledDates } = this.config;
    if (
      (minDate && date < minDate) ||
      (maxDate && date > maxDate) ||
      disabledDates?.some((disabled) => isDateEqual('day', disabled, date))
    ) {
      return false;
    }
    return true;
  }

  writeValue(value: Date): void {
    if (value) {
      this.setDate(value);
    }
  }

  registerOnChange(fn: (value: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Implement disabled state
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
