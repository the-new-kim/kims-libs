import { generateCalendarGrid, CalendarGrid } from './generateCalendarGrid';

describe('generateCalendarGrid', () => {
  it('generates a calendar grid for January 2024', () => {
    const date = new Date(2024, 0, 1);
    const grid: CalendarGrid = generateCalendarGrid(date);
    expect(grid.length).toBeGreaterThan(0); // should have multiple weeks
    expect(grid[0].length).toBe(7); // each week should have 7 days
    expect(grid[0][0] instanceof Date).toBe(true); // each item should be a Date object
  });

  it('generates a calendar grid starting on Monday', () => {
    const yearMonth = { year: 2024, month: 1 }; // February 2024
    const weekStart = 1; // Monday
    const grid: CalendarGrid = generateCalendarGrid(yearMonth, weekStart);
    expect(grid[0].length).toBe(7); // each week should have 7 days
    expect(grid[0][0].getDay()).toBe(1); // first day should be a Monday
  });

  it("fills the first week with previous month's dates if necessary", () => {
    const date = new Date(2024, 0, 1); // January 2024
    const grid: CalendarGrid = generateCalendarGrid(date);
    const firstWeek = grid[0];
    expect(firstWeek[0].getMonth()).toBe(11); // should be from December of the previous year
  });

  it("fills the last week with next month's dates if necessary", () => {
    const date = new Date(2024, 1, 1); // February 2024
    const grid: CalendarGrid = generateCalendarGrid(date);
    const lastWeek = grid[grid.length - 1];
    expect(lastWeek[6].getMonth()).toBe(2); // should be from March of the next year
  });

  it('handles leap year correctly', () => {
    const date = new Date(2024, 1, 1); // February 2024 (leap year)
    const grid: CalendarGrid = generateCalendarGrid(date);
    const februaryDates = grid.flat().filter((d) => d.getMonth() === 1);
    expect(februaryDates.length).toBe(29); // should have 29 days in February
  });

  it('defaults to current month if no date is provided', () => {
    const now = new Date();
    const grid: CalendarGrid = generateCalendarGrid();
    const currentMonthDates = grid
      .flat()
      .filter((d: Date) => d.getMonth() === now.getMonth());
    expect(currentMonthDates.length).toBeGreaterThan(0); // should contain dates from the current month
  });
});
