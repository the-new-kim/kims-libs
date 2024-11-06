import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiCalendarService } from '@kims-libs/angular-calendar';
import { DateUnit, isDateEqual } from '@kims-libs/core';

@Component({
  selector: 'app-multi-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-calendar.component.html',
  styles: ``,
})
export class MultiCalendarComponent {
  @Input() selectedDate?: Date;
  @Input() defaultDate = new Date();

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(public calendarService: MultiCalendarService) {
    this.calendarService.setDate(this.selectedDate);
  }

  isDateEqual(dateUnit: DateUnit, date1: Date, date2: Date | undefined) {
    return isDateEqual(dateUnit, date1, date2);
  }
}
