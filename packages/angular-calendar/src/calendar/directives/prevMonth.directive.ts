import { Directive, HostListener, inject } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Directive({
  selector: '[prevMonth]',
  standalone: true,
})
export class PrevMonthDirective {
  private calendar = inject(CalendarService);
  @HostListener('click') onClick() {
    this.calendar.prevMonth();
  }
}
