import { Directive, HostListener, inject } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Directive({
  selector: '[nextYear]',
  standalone: true,
})
export class NextYearDirective {
  private calendar = inject(CalendarService);
  @HostListener('click') onClick() {
    this.calendar.nextYear();
  }
}
