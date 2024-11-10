import { Injectable } from '@angular/core';
import { CalendarGrid } from '@kims-libs/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarGridService {
  grids: Map<string, CalendarGrid> = new Map();
}
