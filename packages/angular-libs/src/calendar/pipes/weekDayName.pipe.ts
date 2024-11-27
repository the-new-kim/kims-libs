import { inject, Pipe, PipeTransform } from '@angular/core';
import { CalendarGroupDirective } from '../directives/calendarGroup.directive';
import { CalendarDirective } from '../directives/calendar.directive';
import { CALENDAR_CONFIG } from '../calendar.config';

@Pipe({
  name: 'weekDayName',
  standalone: true,
})
export class WeekDayNamePipe implements PipeTransform {
  private readonly _defaultConfig = inject(CALENDAR_CONFIG);
  private _calendarGroup = inject(CalendarGroupDirective, {
    optional: true,
    skipSelf: true,
  });
  private _calendar = inject(CalendarDirective, {
    optional: true,
    skipSelf: true,
  });
  transform(value: Date | number): unknown {
    value = (typeof value === 'number' ? value : value.getDay()) % 7;
    const calendar = this._calendarGroup || this._calendar;
    if (!calendar) return '';
    return (calendar.config?.weekDayNames || this._defaultConfig.weekDayNames)[
      value
    ];
  }
}
