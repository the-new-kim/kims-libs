import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarConfig, provideCalendarConfig } from './calendar.config';
import { PrevMonthDirective } from './directives/prevMonth.directive';
import { NextMonthDirective } from './directives/nextMonth.directive';
import { PrevYearDirective } from './directives/prevYear.directive';
import { NextYearDirective } from './directives/nextYear.directive';
import { MonthSelectDirective } from './directives/monthSelect.directive';
import { WeekDayNamePipe } from './pipes/weekDayName.pipe';
import { DateFormatDirective } from '../directives/dateFormat.directive';
import { CalendarGroupDirective } from './directives/calendarGroup.directive';
import { CalendarDirective } from './directives/calendar.directive';

const directives = [
  CalendarGroupDirective,
  CalendarDirective,
  PrevMonthDirective,
  NextMonthDirective,
  PrevYearDirective,
  NextYearDirective,
  MonthSelectDirective,
  DateFormatDirective,
];

const pipes = [WeekDayNamePipe];

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
