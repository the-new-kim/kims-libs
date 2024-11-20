import { Directive, inject, Input, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarConfig } from '../calendar.config';

@Directive({
  selector: 'calendar, [calendar]',
  providers: [CalendarService],
  standalone: true,
  exportAs: 'calendar',
})
export class CalendarDirective implements OnInit {
  @Input() defaultDate?: Date;
  @Input() config?: Partial<CalendarConfig>;

  private calendar = inject(CalendarService);

  monthNames = this.calendar.monthNames;
  weekDayNames = this.calendar.weekDayNames;

  get grid() {
    return this.calendar.grid();
  }
  get year() {
    return this.calendar.year();
  }
  get monthIndex() {
    return this.calendar.monthIndex();
  }
  get month() {
    return this.calendar.month();
  }

  setDate(date: Date) {
    this.calendar.setDate(date);
  }
  setMonth(month: number) {
    this.calendar.setMonth(month);
  }

  nextMonth() {
    this.calendar.nextMonth();
  }
  prevMonth() {
    this.calendar.prevMonth();
  }
  nextYear() {
    this.calendar.nextYear();
  }
  prevYear() {
    this.calendar.prevYear();
  }

  ngOnInit(): void {
    if (this.defaultDate) {
      this.calendar.setDate(this.defaultDate);
    }
  }
}
