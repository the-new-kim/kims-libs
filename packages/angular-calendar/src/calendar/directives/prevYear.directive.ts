import { Directive, HostListener, inject } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Directive({
  selector: '[prevYear]',
  standalone: true,
})
export class PrevYearDirective {
  private calendar = inject(CalendarService);
  @HostListener('click') onClick() {
    this.calendar.prevYear();
  }
}
