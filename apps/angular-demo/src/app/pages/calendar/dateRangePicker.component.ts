import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, OnClickOutsideDirective } from '@kims-libs/angular';
import { isDateEqual, isValidDate } from '@kims-libs/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    OnClickOutsideDirective,
    CalendarComponent,
  ],
  templateUrl: './dateRangePicker.component.html',
})
export class DateRangePickerComponent {
  value: DateRange = [null, null];
  showCalendar = false;
  isDateEqual = isDateEqual;
  today = new Date();

  selectValue(date: Date) {
    if (!isValidDate(date)) return;
    const [startDate, endDate] = this.value;

    // Both dates already selected - start new range
    if (startDate && endDate) {
      this.clear();
      this.value[0] = date;
      return;
    }

    // No dates selected - set start date
    if (!startDate && !endDate) {
      this.value[0] = date;
      return;
    }

    // Start date selected - set end date based on comparison
    if (startDate && !endDate) {
      if (date <= startDate) {
        this.value[0] = date;
      } else {
        this.value[1] = date;
      }
      return;
    }
  }

  selectValue2 = (date: Date) => {
    if (!isValidDate(date)) return;
    const [startDate, endDate] = this.value;

    // Both dates already selected - start new range
    if (startDate && endDate) {
      this.clear();
      this.value[0] = date;
      return;
    }

    // No dates selected - set start date
    if (!startDate && !endDate) {
      this.value[0] = date;
      return;
    }

    // Start date selected - set end date based on comparison
    if (startDate && !endDate) {
      if (date <= startDate) {
        this.value[0] = date;
      } else {
        this.value[1] = date;
      }
      return;
    }
  };

  getBoundedSelectValue() {
    return this.selectValue.bind(this);
  }

  isDateWithinRange(date: Date) {
    return (
      this.value[0] &&
      this.value[1] &&
      date > this.value[0] &&
      date < this.value[1]
    );
  }

  isStartOfRange(date: Date) {
    return (
      this.value[0] && this.value[1] && isDateEqual('day', this.value[0], date)
    );
  }

  isEndOfRange(date: Date) {
    return (
      this.value[0] && this.value[1] && isDateEqual('day', this.value[1], date)
    );
  }

  isSelectedDate(date: Date) {
    return this.value.some((v) => isDateEqual('day', v, date));
  }

  clear() {
    this.value = [null, null];
  }
}

export type DateRange = [Date | null, Date | null];
