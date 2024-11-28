import { normalizeNumber } from './normalizeNumber';

describe('normalizeNumber', () => {
  it('should return the correct remainder for positive numbers', () => {
    expect(normalizeNumber(10, 3)).toBe(1);
    expect(normalizeNumber(7, 5)).toBe(2);
    expect(normalizeNumber(15, 4)).toBe(3);
  });

  it('should return the correct remainder for negative numbers', () => {
    expect(normalizeNumber(-10, 3)).toBe(2);
    expect(normalizeNumber(-7, 5)).toBe(3);
    expect(normalizeNumber(-15, 4)).toBe(1);
  });

  it('should return 0 when the value is divisible by the modulus', () => {
    expect(normalizeNumber(9, 3)).toBe(0);
    expect(normalizeNumber(20, 5)).toBe(0);
    expect(normalizeNumber(-16, 4)).toBe(0);
  });

  it('should handle the modulus value of 1', () => {
    expect(normalizeNumber(5, 1)).toBe(0);
    expect(normalizeNumber(-5, 1)).toBe(0);
    expect(normalizeNumber(0, 1)).toBe(0);
  });

  it('should return the correct result for zero value', () => {
    expect(normalizeNumber(0, 5)).toBe(0);
    expect(normalizeNumber(0, 3)).toBe(0);
  });

  it('should handle large values correctly', () => {
    expect(normalizeNumber(1000000, 7)).toBe(1);
    expect(normalizeNumber(-1000000, 7)).toBe(6);
  });
});
