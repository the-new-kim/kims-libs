/**
 * Determines if a given date falls within a specified range.
 *
 * This function checks if the provided `date` is within the optional `min` and `max` date boundaries.
 * If either boundary is not provided (`null` or `undefined`), it is ignored during the comparison.
 *
 * @param date - The `Date` object to be checked.
 * @param min - The optional minimum `Date` boundary. If provided, `date` must be equal to or after this value.
 * @param max - The optional maximum `Date` boundary. If provided, `date` must be equal to or before this value.
 * @returns `true` if the `date` is within the specified range, otherwise `false`.
 *
 * @example
 * // Example 1: Check if a date is within a given range
 * isDateWithinRange(new Date('2024-05-15'), new Date('2024-01-01'), new Date('2024-12-31')); // Returns true
 *
 * @example
 * // Example 2: Check if a date is before the minimum date
 * isDateWithinRange(new Date('2023-12-31'), new Date('2024-01-01')); // Returns false
 *
 * @example
 * // Example 3: Check if a date is after the maximum date
 * isDateWithinRange(new Date('2025-01-01'), undefined, new Date('2024-12-31')); // Returns false
 */
export function isDateWithinRange(
  date: Date,
  min?: Date | null,
  max?: Date | null
) {
  if (min && date < min) return false;
  if (max && date > max) return false;
  return true;
}
