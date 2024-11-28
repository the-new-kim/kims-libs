import { isDateWithinRange } from './isDateWithinRange';

describe('isDateWithinRange', () => {
  it('should return false when date is within the range', () => {
    const date = new Date(2024, 5, 10);
    const min = new Date(2024, 5, 1);
    const max = new Date(2024, 5, 20);
    expect(isDateWithinRange(date, min, max)).toBe(false);
  });

  it('should return false when date is before the minimum date', () => {
    const date = new Date(2024, 4, 25);
    const min = new Date(2024, 5, 1);
    expect(isDateWithinRange(date, min)).toBe(false);
  });

  it('should return false when date is after the maximum date', () => {
    const date = new Date(2024, 5, 25);
    const max = new Date(2024, 5, 20);
    expect(isDateWithinRange(date, undefined, max)).toBe(false);
  });

  it('should return false when date equals the minimum date', () => {
    const date = new Date(2024, 5, 1);
    const min = new Date(2024, 5, 1);
    expect(isDateWithinRange(date, min)).toBe(false);
  });

  it('should return false when date equals the maximum date', () => {
    const date = new Date(2024, 5, 20);
    const max = new Date(2024, 5, 20);
    expect(isDateWithinRange(date, undefined, max)).toBe(false);
  });

  it('should return false when no min or max is provided', () => {
    const date = new Date(2024, 5, 10);
    expect(isDateWithinRange(date)).toBe(false);
  });
  it('should return false when date is null or undefined', () => {
    expect(isDateWithinRange(null as unknown as Date)).toBe(false);
    expect(isDateWithinRange(undefined as unknown as Date)).toBe(false);
  });
});
