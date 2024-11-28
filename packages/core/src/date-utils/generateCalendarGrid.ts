/**
 * Generates a calendar grid for a given month and year.
 *
 * This function takes a `Date` object or a {@link YearMonth} object and generates a 2D array
 * representing the calendar grid for that month. The calendar grid is organized by weeks,
 * where each week is represented by an array of `Date` objects.
 *
 * @param date - The `Date` object or {@link YearMonth} object representing the year and month for which to generate the calendar. Defaults to the current date.
 * @param weekStart - The starting day of the week (0 = Sunday, 6 = Saturday). Defaults to `0` (Sunday).
 * @returns A 2D array of `Date` objects, where each sub-array represents a week in the calendar.
 *
 * @example
 * // Example 1: Generate a calendar grid for January 2024 starting on Sunday
 * generateCalendarGrid(new Date('2024-01-01'));
 * // Output: A 2D array representing the calendar of January 2024
 *
 * @example
 * // Example 2: Generate a calendar grid for March 2024 starting on Monday
 * generateCalendarGrid({ year: 2024, month: 2 }, 1);
 * // Output: A 2D array representing the calendar of March 2024, starting on Monday
 */
export function generateCalendarGrid(
  date: Date | YearMonth = new Date(),
  weekStart = 0
): CalendarGrid {
  const year = date instanceof Date ? date.getFullYear() : date.year;
  const month = date instanceof Date ? date.getMonth() : date.month;
  const grid: CalendarGrid = [];
  let week: Date[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  weekStart = weekStart % 7;
  const startOffset = (firstDayOfMonth.getDay() - weekStart + 7) % 7;

  // fill the first week
  for (let i = 0; i < startOffset; i++) {
    week.push(new Date(year, month, 1 - startOffset + i));
  }
  // fill the rest of the weeks
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    week.push(new Date(year, month, day));
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }
  // fill the last week
  if (week.length > 0) {
    for (let i = 1; week.length < 7; i++) {
      week.push(new Date(year, month + 1, i));
    }
    grid.push(week);
  }

  return grid;
}

export type CalendarGrid = Date[][];

export interface YearMonth {
  year: number;
  month: number;
}

export interface CalendarItem extends YearMonth {
  grid: CalendarGrid;
}
