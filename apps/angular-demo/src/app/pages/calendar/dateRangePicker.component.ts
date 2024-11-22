import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '@kims-libs/angular-libs';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule],
  templateUrl: './dateRangePicker.component.html',
})
export class DateRangePickerComponent {
  value: DateRange = [null, null];
  showCalendar = false;
}

export type DateRange = [Date | null, Date | null];
