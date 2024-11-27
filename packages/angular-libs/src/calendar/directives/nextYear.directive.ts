import { Directive, HostListener, inject } from '@angular/core';
import { CalendarGroupDirective } from './calendarGroup.directive';
import { CalendarDirective } from './calendar.directive';

@Directive({
  selector: '[nextYear]',
  standalone: true,
})
export class NextYearDirective {
  private _calendarGroup = inject(CalendarGroupDirective, {
    optional: true,
    skipSelf: true,
  });
  private _calendar = inject(CalendarDirective, {
    optional: true,
    skipSelf: true,
  });

  @HostListener('click') onClick() {
    const calendar = this._calendarGroup || this._calendar;
    if (!calendar) return;
    calendar.nextYear();
  }
}
