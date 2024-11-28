import { isValidDate } from './isValidDate';

describe('isValidDate', () => {
  it('should return false for false, null, or undefined', () => {
    expect(isValidDate(false)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
  });

  it('should return true for valid Date objects', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(2024, 5, 10))).toBe(true);
  });

  it('should return false for invalid Date objects', () => {
    expect(isValidDate(new Date('invalid date'))).toBe(false);
  });

  it('should return true for valid date strings', () => {
    expect(isValidDate('2024-06-10')).toBe(true);
    expect(isValidDate('June 10, 2024')).toBe(true);
  });

  it('should return false for invalid date strings', () => {
    expect(isValidDate('invalid date')).toBe(false);
    expect(isValidDate('not a date')).toBe(false);
  });

  it('should return true for valid timestamps', () => {
    expect(isValidDate(1622520000000)).toBe(true); // A valid timestamp
  });

  it('should return false for NaN', () => {
    expect(isValidDate(NaN)).toBe(false);
  });

  it('should return false for non-date types like objects and arrays', () => {
    expect(isValidDate({})).toBe(false);
    expect(isValidDate([])).toBe(false);
  });
});
