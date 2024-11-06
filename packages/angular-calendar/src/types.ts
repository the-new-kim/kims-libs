export interface CalendarMethods {
  setDate(date: Date): void;
  setMonth(month: number): void;
  prevMonth(): void;
  nextMonth(): void;
  setYear(year: number): void;
  prevYear(): void;
  nextYear(): void;
}
