import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarControlDirective,
  CalendarMonthSelectDirective,
} from '@kims-libs/angular';
import { CalendarStateDirective } from 'packages/angular/src/calendar/directives/calendarState.directive';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [
    CommonModule,
    CalendarControlDirective,
    CalendarMonthSelectDirective,
    CalendarStateDirective,
  ],
  templateUrl: './calendarHeader.component.html',
})
export class CalendarHeaderComponent {}
