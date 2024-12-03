import { inject, Pipe, PipeTransform } from '@angular/core';
import { getYearWeek, WeekNumberOptions } from '@kims-libs/core';
import { CALENDAR_CONFIG } from '../calendar.config';

@Pipe({
  name: 'yearWeek',
  standalone: true,
})
export class YearWeekPipe implements PipeTransform {
  private readonly _defaultConfig = inject(CALENDAR_CONFIG);
  transform(date: Date, options?: WeekNumberOptions) {
    const weekStart = options?.weekStart || this._defaultConfig.weekStart;
    return getYearWeek(date, { ...options, weekStart });
  }
}
