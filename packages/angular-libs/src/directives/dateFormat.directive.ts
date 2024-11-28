import { DatePipe } from '@angular/common';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  OnInit,
  Provider,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValidDate } from '@kims-libs/core';

export const DATE_FORM_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateFormatDirective),
  multi: true,
};

@Directive({
  selector: '[dateFormat]',
  standalone: true,
  providers: [DatePipe, DATE_FORM_CONTROL_VALUE_ACCESSOR],
})
export class DateFormatDirective implements OnInit, ControlValueAccessor {
  @Input() format = 'yyyy-MM-dd';

  _value?: Date;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value?: Date) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  private _elementRef: ElementRef = inject(ElementRef);
  private _renderer: Renderer2 = inject(Renderer2);
  private _datePipe = inject(DatePipe);

  ngOnInit(): void {
    if (this._elementRef.nativeElement.tagName.toLowerCase() !== 'input') {
      console.error(
        'dateFormat directive can only be used on <input> elements'
      );
      return;
    }
  }
  @HostListener('change', ['$event.target.value'])
  @HostListener('blur')
  onInputChange(value?: string): void {
    value = value || (this._elementRef.nativeElement as HTMLInputElement).value;

    if (!isValidDate(value)) {
      if (
        !this._value ||
        this._elementRef.nativeElement === document.activeElement
      ) {
        return;
      }
      value = this._value?.toISOString() || '';
    }

    const parsedDate = new Date(value);
    this._updateInputValue(parsedDate);
    this._onChange(parsedDate);

    if (this._elementRef.nativeElement !== document.activeElement) {
      this._onTouched();
    }
  }

  writeValue(value: string | Date): void {
    // if (!isValidDate(value)) return;
    // const parsedDate = value instanceof Date ? value : new Date(value);
    // this._value = parsedDate;
    this._updateInputValue(value);
  }

  private _updateInputValue(value: Date | string): void {
    if (!isValidDate(value)) {
      value = '';
      delete this._value;
    } else {
      value = this._datePipe.transform(value, this.format) as string;
      this._value = new Date(value);
    }
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
  }

  registerOnChange(fn: (value?: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(
      this._elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
