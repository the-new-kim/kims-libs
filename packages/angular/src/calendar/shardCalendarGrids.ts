import { CalendarGrid } from '@kims-libs/core';

//key year-month-weekStart
type SharedCalendarGridKey = `${number}-${number}-${number}`;
export const sharedCalendarGrids = new Map<
  SharedCalendarGridKey,
  CalendarGrid
>();
