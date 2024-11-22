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
  private onChange: (value?: Date) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  private datePipe = inject(DatePipe);

  ngOnInit(): void {
    if (this.el.nativeElement.tagName.toLowerCase() !== 'input') {
      console.error(
        'dateFormat directive can only be used on <input> elements'
      );
      return;
    }
  }
  @HostListener('change', ['$event.target.value'])
  @HostListener('blur')
  onInputChange(value?: string): void {
    if (!value) {
      value = (this.el.nativeElement as HTMLInputElement).value;
    }
    if (!isValidDate(value)) {
      if (this.el.nativeElement === document.activeElement) return;
      value = this._value?.toISOString() || '';
    }

    const parsedDate = new Date(value);
    this._value = parsedDate;
    this.updateInputValue(parsedDate);
    this.onChange(parsedDate);

    if (this.el.nativeElement !== document.activeElement) {
      this.onTouched();
    }
  }

  writeValue(value: string | Date): void {
    if (!isValidDate(value)) return;
    const parsedDate = value instanceof Date ? value : new Date(value);
    this._value = parsedDate;
    this.updateInputValue(parsedDate);
  }

  private updateInputValue(value: Date): void {
    if (!isValidDate(value)) return;
    const formattedDate = this.datePipe.transform(value, this.format);
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedDate);
  }

  registerOnChange(fn: (value?: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }
}
