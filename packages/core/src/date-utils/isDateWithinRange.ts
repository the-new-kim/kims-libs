import { isNumberWithinRange } from '../utils';
import { normalizeDate } from './normalizeDate';
import { DateUnit } from './types';

/**
 * Checks if a given date falls within a specified range, with optional normalization by a date unit.
 *
 * This function verifies whether the `date` is within the bounds of `minDate` and `maxDate`.
 * It allows for comparisons at different levels of granularity (e.g., year, month, day) by normalizing
 * the dates using the specified unit.
 *
 * @param date - The `Date` object to be checked.
 * @param options - An optional object containing additional parameters to define the range and granularity.
 * @param options.minDate - The optional minimum date boundary. If provided, the `date` must not be earlier than this value.
 * @param options.maxDate - The optional maximum date boundary. If provided, the `date` must not be later than this value.
 * @param options.unit - The date unit used for normalization (`millisecond` by default). This determines the granularity of the comparison.
 *                       See {@link DateUnit} for possible values.
 * @returns `true` if the `date` falls within the specified range, otherwise `false`.
 *
 * @example
 * // Example 1: Check if a date is within a range at millisecond granularity
 * isDateWithinRange(new Date('2024-01-01T12:00:00Z'), {
 *   minDate: new Date('2024-01-01T00:00:00Z'),
 *   maxDate: new Date('2024-01-01T23:59:59Z'),
 *   unit: 'millisecond',
 * });
 * // Returns true
 *
 * @example
 * // Example 2: Check if a date is within a range at day granularity
 * isDateWithinRange(new Date('2024-01-02T12:00:00Z'), {
 *   minDate: new Date('2024-01-01T00:00:00Z'),
 *   maxDate: new Date('2024-01-03T00:00:00Z'),
 *   unit: 'day',
 * });
 * // Returns true
 *
 * @example
 * // Example 3: Check if a date is outside the range
 * isDateWithinRange(new Date('2025-01-01T12:00:00Z'), {
 *   minDate: new Date('2024-01-01T00:00:00Z'),
 *   maxDate: new Date('2024-12-31T23:59:59Z'),
 *   unit: 'year',
 * });
 * // Returns false
 */
export function isDateWithinRange(
  date: Date,
  options: IsDateWithinRangeOptions = {}
): boolean {
  const { minDate, maxDate, unit = 'millisecond' } = options;

  // Normalize the date, minDate, and maxDate based on the provided unit
  const normalizedDate = normalizeDate(date, unit);
  const normalizedMin = minDate ? normalizeDate(minDate, unit) : null;
  const normalizedMax = maxDate ? normalizeDate(maxDate, unit) : null;

  // Compare normalized values
  isNumberWithinRange(normalizedDate, normalizedMin, normalizedMax);
  if (normalizedMin !== null && normalizedDate < normalizedMin) return false;
  if (normalizedMax !== null && normalizedDate > normalizedMax) return false;

  return true;
}

interface IsDateWithinRangeOptions {
  minDate?: Date | null;
  maxDate?: Date | null;
  unit?: DateUnit;
}
