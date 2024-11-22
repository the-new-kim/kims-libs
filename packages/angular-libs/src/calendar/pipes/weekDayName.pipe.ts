import { inject, Pipe, PipeTransform } from '@angular/core';
import { CalendarService } from '../services/calendar.service';

@Pipe({
  name: 'weekDayName',
  standalone: true,
})
export class WeekDayNamePipe implements PipeTransform {
  private calendar = inject(CalendarService);
  transform(value: Date | number): unknown {
    value = (typeof value === 'number' ? value : value.getDay()) % 7;
    return this.calendar.weekDayNames[value];
  }
}
