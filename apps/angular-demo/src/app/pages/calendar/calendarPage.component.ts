import { Component } from '@angular/core';

import { DatePickerComponent } from './datePicker.component';
import { DateRangePickerComponent } from './dateRangePicker.component';
import { WeekNumberPickerComponent } from './weekNumberPicker.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    DatePickerComponent,
    DateRangePickerComponent,
    WeekNumberPickerComponent,
  ],
  // providers: [provideCalendarConfig({ weekStart: 6 })],
  templateUrl: './calendarPage.component.html',
})
export class CalendarPageComponent {}
