import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '@kims-libs/angular-libs';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './datePicker.component';
import { DateRangePickerComponent } from './dateRangePicker.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    DatePickerComponent,
    DateRangePickerComponent,
  ],
  templateUrl: './calendarPage.component.html',
})
export class CalendarPageComponent {}
