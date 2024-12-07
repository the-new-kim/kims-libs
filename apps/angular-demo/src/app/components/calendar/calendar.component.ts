import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDirective, WeekDayNamePipe } from '@kims-libs/angular';
import { isDateEqual } from '@kims-libs/core';
import { FormsModule } from '@angular/forms';
import { DateRange } from '../../pages/calendar/dateRangePicker.component';
import { CalendarHeaderComponent } from './calendarHeader.component';
import { CalendarStateDirective } from 'packages/angular/src/calendar/directives/calendarState.directive';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CalendarDirective,
    CalendarStateDirective,
    WeekDayNamePipe,
    CalendarHeaderComponent,
  ],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  @Input() selectedDate?: Date | DateRange;
  @Output() selectedDateChange = new EventEmitter<Date>();
  @Input() disabledButtons?: CalendarControlButton[] = [];

  calendarDirective = viewChild(CalendarDirective);

  @Input() showOverFlow? = false;

  @Input() dateClickCallback?: (
    date: Date,
    calendar?: CalendarDirective
  ) => void;

  onNgModelChange(value: Date) {
    this.selectedDate = value;
    this.selectedDateChange.emit(value);
  }

  dateClick(date: Date, calendar: CalendarDirective) {
    return this.dateClickCallback
      ? this.dateClickCallback(date, calendar)
      : calendar.setDate(date);
  }

  is(
    date: Date,
    type: 'selected' | 'startOfRange' | 'endOfRange' | 'withinRange'
  ) {
    if (!this.selectedDate) return false;

    if (type === 'selected') {
      const isSelected =
        this.selectedDate instanceof Date
          ? isDateEqual('day', date, this.selectedDate)
          : this.selectedDate.some((v) => isDateEqual('day', v, date));

      return isSelected;
    } else {
      if (this.selectedDate instanceof Date) return false;
      const [start, end] = this.selectedDate;

      switch (type) {
        case 'startOfRange':
          return start && end && isDateEqual('day', start, date);
        case 'endOfRange':
          return start && end && isDateEqual('day', end, date);
        case 'withinRange':
          return start && end && date > start && date < end;
        default:
          return false;
      }
    }
  }
}

type CalendarControlButton =
  | 'prevMonth'
  | 'nextMonth'
  | 'prevYear'
  | 'nextYear';
