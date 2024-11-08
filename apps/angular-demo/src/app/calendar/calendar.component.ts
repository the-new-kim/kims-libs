import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarConfig, CalendarService } from '@kims-libs/angular-calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  providers: [CalendarService],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() selectedDate?: Date;
  @Input() calendarConfig?: Partial<CalendarConfig>;

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

  constructor(public calendar: CalendarService) {}

  ngOnInit(): void {
    if (this.selectedDate && this.calendarConfig) {
      this.calendarConfig['defaultDate'] = this.selectedDate;
    }
    this.calendar.init(this.calendarConfig);
  }

  ngOnDestroy(): void {
    this.calendar.destroy();
  }
}
