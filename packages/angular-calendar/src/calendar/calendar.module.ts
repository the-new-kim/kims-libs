import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from './calendar.service';
import {
  CALENDAR_CONFIG,
  CalendarConfig,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';
import { CalendarDirective } from './directives/calendar.directive';
import { PrevMonthDirective } from './directives/prevMonth.directive';
import { NextMonthDirective } from './directives/nextMonth.directive';
import { PrevYearDirective } from './directives/prevYear.directive';
import { NextYearDirective } from './directives/nextYear.directive';
import { MonthSelectDirective } from './directives/monthSelect.directive';
import { WeekDayNamePipe } from './pipes/weekDayName.pipe';

const directives = [
  CalendarDirective,
  PrevMonthDirective,
  NextMonthDirective,
  PrevYearDirective,
  NextYearDirective,
  MonthSelectDirective,
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
