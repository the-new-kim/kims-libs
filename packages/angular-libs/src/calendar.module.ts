import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from './calendar/services/calendar.service';
import {
  CALENDAR_CONFIG,
  CalendarConfig,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';
import { CalendarDirective } from './calendar/directives/calendar.directive';
import { PrevMonthDirective } from './calendar/directives/prevMonth.directive';
import { NextMonthDirective } from './calendar/directives/nextMonth.directive';
import { PrevYearDirective } from './calendar/directives/prevYear.directive';
import { NextYearDirective } from './calendar/directives/nextYear.directive';
import { MonthSelectDirective } from './calendar/directives/monthSelect.directive';
import { WeekDayNamePipe } from './calendar/pipes/weekDayName.pipe';
import { DateFormatDirective } from './experimental/dateFormat.directive';

const directives = [
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
  exports: [CalendarDirective, ...directives, ...pipes],
  providers: [CalendarService],
})
export class CalendarModule {
  static forRoot(
    config?: Partial<CalendarConfig>
  ): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
      providers: [
        {
          provide: CALENDAR_CONFIG,
          useValue: { ...DEFAULT_CALENDAR_CONFIG, ...config },
        },
      ],
    };
  }
}
