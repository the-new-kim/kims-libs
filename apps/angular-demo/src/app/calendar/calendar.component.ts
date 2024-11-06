import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarService } from '@kims-libs/angular-calendar';
import { DateUnit, isDateEqual } from '@kims-libs/core';
import { CalendarGridComponent } from './calendar-grid.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [CommonModule, CalendarGridComponent],
  providers: [CalendarService],
})
export class CalendarComponent {
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

  // currentDate$: Observable<Date>;
  // currentGrid$: Observable<CalendarGrid>;

  constructor(public calendar: CalendarService) {
    this.calendar.setDate(this.selectedDate || this.defaultDate);

    // this.currentDate$ = this.calendar.date$;
    // this.currentGrid$ = this.calendar.grid$;
  }

  onMonthChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    if (Number.isNaN(value)) {
      throw new Error('Select value is not a number');
    }
    this.calendar.setMonth(Number(value));
  }

  isDateEqual(dateUnit: DateUnit, date1: Date, date2: Date | undefined) {
    return isDateEqual(dateUnit, date1, date2);
  }
}
