import { Directive, HostListener, inject } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Directive({
  selector: '[nextMonth]',
  standalone: true,
})
export class NextMonthDirective {
  private calendar = inject(CalendarService);
  @HostListener('click') onClick() {
    this.calendar.nextMonth();
  }
}
