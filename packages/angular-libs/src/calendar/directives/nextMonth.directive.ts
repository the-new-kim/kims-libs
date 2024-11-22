import { Directive, HostListener, inject } from '@angular/core';
import { CalendarDirective } from './calendar.directive';

@Directive({
  selector: '[nextMonth]',
  standalone: true,
})
export class NextMonthDirective {
  private calendar = inject(CalendarDirective);
  @HostListener('click') onClick() {
    this.calendar.nextMonth();
  }
}
