import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CalendarModule,
  OnClickOutsideDirective,
  YearWeekPipe,
} from '@kims-libs/angular-libs';
import { isDateEqual } from '@kims-libs/core';

@Component({
  selector: 'app-week-number-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, OnClickOutsideDirective],
  providers: [YearWeekPipe],
  templateUrl: './weekNumberPicker.component.html',
})
export class WeekNumberPickerComponent {
  showCalendar = false;
  value?: string;
  isDateEqual = isDateEqual;

  constructor(public yearWeek: YearWeekPipe) {}
}
