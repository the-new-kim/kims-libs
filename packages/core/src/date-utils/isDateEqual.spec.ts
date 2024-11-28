import { isDateEqual } from './isDateEqual';

describe('isDateEqual', () => {
  it('should return false if there are less than two valid dates', () => {
    expect(isDateEqual('year', new Date())).toBe(false);
    expect(isDateEqual('month', null, undefined)).toBe(false);
  });

  it('should return true for dates with the same year', () => {
    const date1 = new Date(2024, 0, 1);
    const date2 = new Date(2024, 11, 31);
    expect(isDateEqual('year', date1, date2)).toBe(true);
  });

  it('should return false for dates with different years', () => {
    const date1 = new Date(2023, 0, 1);
    const date2 = new Date(2024, 0, 1);
    expect(isDateEqual('year', date1, date2)).toBe(false);
  });

  it('should return true for dates with the same month', () => {
    const date1 = new Date(2024, 5, 1);
    const date2 = new Date(2024, 5, 15);
    expect(isDateEqual('month', date1, date2)).toBe(true);
  });

  it('should return false for dates with different months', () => {
    const date1 = new Date(2024, 4, 1);
    const date2 = new Date(2024, 5, 1);
    expect(isDateEqual('month', date1, date2)).toBe(false);
  });

  it('should return true for dates with the same day', () => {
    const date1 = new Date(2024, 5, 10, 10);
    const date2 = new Date(2024, 5, 10, 15);
    expect(isDateEqual('day', date1, date2)).toBe(true);
  });

  it('should return false for dates with different days', () => {
    const date1 = new Date(2024, 5, 10);
    const date2 = new Date(2024, 5, 11);
    expect(isDateEqual('day', date1, date2)).toBe(false);
  });

  it('should return true for dates with the same hour', () => {
    const date1 = new Date(2024, 5, 10, 10);
    const date2 = new Date(2024, 5, 10, 10, 30);
    expect(isDateEqual('hour', date1, date2)).toBe(true);
  });

  it('should return false for dates with different hours', () => {
    const date1 = new Date(2024, 5, 10, 10);
    const date2 = new Date(2024, 5, 10, 11);
    expect(isDateEqual('hour', date1, date2)).toBe(false);
  });

  it('should return true for dates with the same minute', () => {
    const date1 = new Date(2024, 5, 10, 10, 30);
    const date2 = new Date(2024, 5, 10, 10, 30, 45);
    expect(isDateEqual('minute', date1, date2)).toBe(true);
  });

  it('should return false for dates with different minutes', () => {
    const date1 = new Date(2024, 5, 10, 10, 30);
    const date2 = new Date(2024, 5, 10, 10, 31);
    expect(isDateEqual('minute', date1, date2)).toBe(false);
  });

  it('should return true for dates with the same second', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45);
    const date2 = new Date(2024, 5, 10, 10, 30, 45, 500);
    expect(isDateEqual('second', date1, date2)).toBe(true);
  });

  it('should return false for dates with different seconds', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45);
    const date2 = new Date(2024, 5, 10, 10, 30, 46);
    expect(isDateEqual('second', date1, date2)).toBe(false);
  });

  it('should return true for dates with the same millisecond', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45, 500);
    const date2 = new Date(2024, 5, 10, 10, 30, 45, 500);
    expect(isDateEqual('millisecond', date1, date2)).toBe(true);
  });

  it('should return false for dates with different milliseconds', () => {
    const date1 = new Date(2024, 5, 10, 10, 30, 45, 500);
    const date2 = new Date(2024, 5, 10, 10, 30, 45, 501);
    expect(isDateEqual('millisecond', date1, date2)).toBe(false);
  });
});
