import { getYearWeek, WeekNumberOptions } from './getYearWeek';
describe('getYearWeek', () => {
  const mockDate = (year: number, month: number, day: number) =>
    new Date(Date.UTC(year, month, day));

  test('should return correct year-week representation with default options', () => {
    const date = mockDate(2024, 0, 7); // January 7, 2024 (Sunday)
    const result = getYearWeek(date);
    expect(result).toBe('2024-00'); // Assuming default format is 'YYYY-ww', and January 7, 2024 is the first week of 2024
  });

  test('should return correct year-week representation with week starting on Wednesday', () => {
    const date = mockDate(2024, 0, 10); // January 10, 2024 (Wednesday)
    const options: WeekNumberOptions = { weekStart: 3, mode: 0 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-01'); // Week starts from the first occurrence of Wednesday
  });

  test("should handle December dates that belong to the next year's first week", () => {
    const date = mockDate(2023, 11, 31); // December 31, 2023 (Sunday)
    const options: WeekNumberOptions = { weekStart: 0, mode: 1 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-00'); // Should be treated as part of the first week of 2024
  });

  test('should correctly handle ISO-like week numbering with mode 1', () => {
    const date = mockDate(2024, 0, 4); // January 4, 2024
    const options: WeekNumberOptions = { weekStart: 1, mode: 1 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-00'); // Assuming ISO-like week number representation with week containing at least 4 days
  });

  test('should calculate the last week of the previous year correctly', () => {
    const date = mockDate(2024, 0, 1); // January 1, 2024
    const options: WeekNumberOptions = { weekStart: 0, mode: 0 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2023-52'); // January 1, 2024 is part of the last week of 2023 if weekStart is Sunday
  });

  test('should use custom format correctly', () => {
    const date = mockDate(2024, 0, 15); // January 15, 2024
    const options: WeekNumberOptions = {
      format: 'YYYY-Www-D',
      weekStart: 1,
      mode: 1,
    };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-W02-1'); // Depending on custom format specified
  });

  test('should handle negative weekStart values by normalizing', () => {
    const date = mockDate(2024, 0, 15); // January 15, 2024
    const options: WeekNumberOptions = { weekStart: -1, mode: 0 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-01'); // weekStart should be normalized to a valid value (e.g., 6 for Saturday)
  });

  test('should handle countFrom offset properly starting from 1', () => {
    const date = mockDate(2024, 0, 15); // January 15, 2024
    const options: WeekNumberOptions = { countFrom: 1 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-02'); // Count starts from 1 instead of 0
  });

  test('should calculate the correct week for January 1st when weekStart is Monday', () => {
    const date = mockDate(2024, 0, 1); // January 1, 2024 (Monday)
    const options: WeekNumberOptions = { weekStart: 1, mode: 0 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2024-00'); // January 1, 2024 should be part of the first week of 2024 since weekStart is Monday
  });

  test('should treat the first week correctly when fewer than 4 days belong to the new year', () => {
    const date = mockDate(2027, 0, 2); // January 2, 2027 (Saturday)
    const options: WeekNumberOptions = { weekStart: 1, mode: 1 };
    const result = getYearWeek(date, options);
    expect(result).toBe('2026-52'); // If fewer than 4 days of the new year are in the first week, it belongs to the last week of the previous year
  });
});
