import { Directive, HostListener, inject } from '@angular/core';
import { CalendarDirective } from './calendar.directive';

@Directive({
  selector: '[prevYear]',
  standalone: true,
})
export class PrevYearDirective {
  private calendar = inject(CalendarDirective);
  @HostListener('click') onClick() {
    this.calendar.prevYear();
  }
}
