import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CalendarModule,
  OnClickOutsideDirective,
} from '@kims-libs/angular-libs';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, OnClickOutsideDirective],
  templateUrl: './datePicker.component.html',
})
export class DatePickerComponent {
  @Input() value?: Date;
  showCalendar = false;
}
