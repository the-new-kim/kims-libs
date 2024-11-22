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

@Directive({
  selector: '[monthSelect]',
  standalone: true,
})
export class MonthSelectDirective implements OnInit {
  private calendar = inject(CalendarDirective);
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  monthNames = this.calendar.monthNames;

  constructor() {
    // Use effect to track monthIndex signal changes
    effect(() => {
      this.updateSelectedOption();
    });
  }

  ngOnInit(): void {
    if (this.el.nativeElement.tagName.toLowerCase() !== 'select') {
      console.error(
        'monthSelect directive can only be used on <select> elements'
      );
      return;
    }
    this.populateMonths();
  }

  private populateMonths() {
    this.monthNames.forEach((month, index) => {
      const option = this.renderer.createElement('option');
      this.renderer.setAttribute(option, 'value', index + '');

      const text = this.renderer.createText(month);
      this.renderer.appendChild(option, text);
      this.renderer.appendChild(this.el.nativeElement, option);
    });

    // Initially set the selected option
    this.updateSelectedOption();
  }

  private updateSelectedOption() {
    // Reset all options to not selected
    const options = this.el.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      options[i].selected = false;
    }

    // Set the current month's option as selected
    const currentMonthIndex = this.calendar.monthIndex;
    this.el.nativeElement.selectedIndex = currentMonthIndex;
  }

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedMonth = parseInt(selectElement.value, 10);
    this.calendar.setMonth(selectedMonth);
  }
}
