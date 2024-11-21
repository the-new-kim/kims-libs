import {
  Directive,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Provider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerDirective),
  multi: true,
};

@Directive({
  selector: '[datepicker]',
  standalone: true,
  providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR],
})
export class DatepickerDirective implements ControlValueAccessor {
  @Input() value?: Date;
  @Output() valueChange = new EventEmitter<Date>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: Date) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(value: Date): void {
    if (value) {
      this.value = value;
    }
    console.log(value);
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
