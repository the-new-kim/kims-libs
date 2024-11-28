import { normalizeWeekStart } from './normalizeWeekStart';

describe('normalizeWeekStart', () => {
  test('should normalize positive weekStart values correctly', () => {
    expect(normalizeWeekStart(0)).toBe(0); // Sunday
    expect(normalizeWeekStart(1)).toBe(1); // Monday
    expect(normalizeWeekStart(6)).toBe(6); // Saturday
  });

  test('should normalize negative weekStart values correctly', () => {
    expect(normalizeWeekStart(-1)).toBe(6); // Equivalent to Saturday
    expect(normalizeWeekStart(-6)).toBe(1); // Equivalent to Monday
    expect(normalizeWeekStart(-7)).toBe(0); // Equivalent to Sunday
  });

  test('should normalize values greater than 6 correctly', () => {
    expect(normalizeWeekStart(7)).toBe(0); // Equivalent to Sunday
    expect(normalizeWeekStart(8)).toBe(1); // Equivalent to Monday
    expect(normalizeWeekStart(13)).toBe(6); // Equivalent to Saturday
  });

  test('should normalize large negative values correctly', () => {
    expect(normalizeWeekStart(-8)).toBe(6); // Equivalent to Saturday
    expect(normalizeWeekStart(-14)).toBe(0); // Equivalent to Sunday
  });
});
