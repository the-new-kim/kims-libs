import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './datePicker.component';
import { DateRangePickerComponent } from './dateRangePicker.component';
import { CalendarModule } from '@kims-libs/angular-libs';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePickerComponent,
    DateRangePickerComponent,
    CalendarModule,
  ],
  // providers: [provideCalendarConfig({ weekStart: 6 })],
  templateUrl: './calendarPage.component.html',
})
export class CalendarPageComponent {}
