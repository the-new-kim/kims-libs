import { Directive, HostListener, inject } from '@angular/core';
import { CalendarDirective } from './calendar.directive';

@Directive({
  selector: '[prevMonth]',
  standalone: true,
})
export class PrevMonthDirective {
  private calendar = inject(CalendarDirective);
  @HostListener('click') onClick() {
    this.calendar.prevMonth();
  }
}
