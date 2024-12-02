import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  effect,
} from '@angular/core';
import { CalendarDirective } from './calendar.directive';
import { CALENDAR_CONFIG } from '../calendar.config';

@Directive({
  selector: '[monthSelect]',
  standalone: true,
})
export class CalendarMonthSelectDirective implements OnInit {
  private readonly _defaultConfig = inject(CALENDAR_CONFIG);

  private _calendar = inject(CalendarDirective);
  private _elementRef: ElementRef = inject(ElementRef);
  private _renderer: Renderer2 = inject(Renderer2);

  monthNames =
    this._calendar.config?.monthNames || this._defaultConfig.monthNames;

  constructor() {
    // Use effect to track monthIndex signal changes
    effect(() => {
      this._updateSelectedOption();
    });
  }

  ngOnInit(): void {
    if (this._elementRef.nativeElement.tagName.toLowerCase() !== 'select') {
      console.error(
        'monthSelect directive can only be used on <select> elements'
      );
      return;
    }
    this._populateMonths();
  }

  private _populateMonths() {
    this.monthNames.forEach((month, index) => {
      const option = this._renderer.createElement('option');
      this._renderer.setAttribute(option, 'value', index + '');

      const text = this._renderer.createText(month);
      this._renderer.appendChild(option, text);
      this._renderer.appendChild(this._elementRef.nativeElement, option);
    });

    // Initially set the selected option
    this._updateSelectedOption();
  }

  private _updateSelectedOption() {
    // Reset all options to not selected
    const options = this._elementRef.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      options[i].selected = false;
    }

    // Set the current month's option as selected
    const currentMonthIndex = this._calendar.monthIndex();
    this._elementRef.nativeElement.selectedIndex = currentMonthIndex;
  }

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedMonth = parseInt(selectElement.value, 10);
    this._calendar.setMonth(selectedMonth);
  }
}
