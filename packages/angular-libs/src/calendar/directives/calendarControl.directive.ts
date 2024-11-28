import { Directive, HostListener, inject, ElementRef } from '@angular/core';
import { CalendarGroupDirective } from './calendarGroup.directive';
import { CalendarDirective } from './calendar.directive';

const controls = ['prevMonth', 'nextMonth', 'prevYear', 'nextYear'] as const;
type Control = (typeof controls)[number];

@Directive({
  selector: '[prevMonth], [nextMonth], [prevYear], [nextYear]',
  standalone: true,
})
export class CalendarControlDirective {
  private _calendarGroup = inject(CalendarGroupDirective, {
    optional: true,
    skipSelf: true,
  });
  private _calendar = inject(CalendarDirective, {
    optional: true,
    skipSelf: true,
  });
  private _elementRef = inject(ElementRef);

  private get _control(): Control | null {
    const element = this._elementRef.nativeElement as HTMLElement;
    for (const control of controls) {
      if (element.hasAttribute(control)) return control;
    }
    return null;
  }

  @HostListener('click') onClick() {
    const calendar = this._calendarGroup || this._calendar;
    if (!calendar || !this._control) return;
    calendar[this._control]();
  }
}
