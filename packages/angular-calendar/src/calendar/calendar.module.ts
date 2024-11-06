import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from './calendar.service';
import {
  CALENDAR_CONFIG,
  CalendarConfig,
  DEFAULT_CALENDAR_CONFIG,
} from './calendar.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
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
