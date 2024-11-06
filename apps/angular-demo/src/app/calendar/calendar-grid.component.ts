import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarService } from '@kims-libs/angular-calendar';
import { DateUnit, isDateEqual } from '@kims-libs/core';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CalendarGridComponent {
  @Input() selectedDate?: Date;
  @Input() calendar!: CalendarService;

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

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  isDateEqual(dateUnit: DateUnit, date1: Date, date2: Date | undefined) {
    return isDateEqual(dateUnit, date1, date2);
  }

  onMonthChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    if (Number.isNaN(value)) {
      throw new Error('Select value is not a number');
    }
    this.calendar.setMonth(Number(value));
  }
}
