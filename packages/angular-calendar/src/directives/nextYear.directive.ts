import { Directive, HostListener, inject } from '@angular/core';
import { CalendarDirective } from './calendar.directive';

@Directive({
  selector: '[nextYear]',
  standalone: true,
})
export class NextYearDirective {
  private calendar = inject(CalendarDirective);
  @HostListener('click') onClick() {
    this.calendar.nextYear();
  }
}
