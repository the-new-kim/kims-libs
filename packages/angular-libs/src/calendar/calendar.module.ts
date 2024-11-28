import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarConfig, provideCalendarConfig } from './calendar.config';
import { WeekDayNamePipe } from './pipes/weekDayName.pipe';
import { DateFormatDirective } from '../directives/dateFormat.directive';
import { CalendarGroupDirective } from './directives/calendarGroup.directive';
import { CalendarDirective } from './directives/calendar.directive';
import { YearWeekPipe } from './pipes/yearWeek.pipe';
import { CalendarControlDirective } from './directives/calendarControl.directive';
import { MonthSelectDirective } from './directives/monthSelect.directive';

const directives = [
  CalendarGroupDirective,
  CalendarDirective,
  MonthSelectDirective,
  CalendarControlDirective,
  DateFormatDirective,
];

const pipes = [WeekDayNamePipe, YearWeekPipe];

@NgModule({
  imports: [CommonModule, ...directives, ...pipes],
  exports: [...directives, ...pipes],
})
export class CalendarModule {
  static forRoot(
    config?: Partial<CalendarConfig>
  ): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
      providers: config ? [provideCalendarConfig(config)] : [],
    };
  }
}
