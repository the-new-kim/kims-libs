export type CalendarGrid = Date[][];

export interface YearMonth {
  year: number;
  month: number;
}

export interface CalendarItem extends YearMonth {
  grid: CalendarGrid;
}

export function generateCalendarGrid(
  date: Date | YearMonth = new Date(),
  weekStart = 0
): CalendarGrid {
  const { year, month } = normalizeYearMonth(date);
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

export function normalizeYearMonth(date: Date | YearMonth): YearMonth {
  if (date instanceof Date) {
    return { year: date.getFullYear(), month: date.getMonth() };
  }
  const normalizedDate = new Date(date.year, date.month, 1);
  return {
    year: normalizedDate.getFullYear(),
    month: normalizedDate.getMonth(),
  };
}

export function fillCalendarGrid(
  year: number,
  month: number,
  weekStart: number
): CalendarGrid {
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
