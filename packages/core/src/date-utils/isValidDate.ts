/**
 * Checks if the given value is a valid `Date` object.
 *
 * This function ensures that the provided value is a valid `Date` instance, excluding `null`, `undefined`, and invalid `Date` objects.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is a valid `Date` object, otherwise `false`.
 *
 * @example
 * // Example 1: Check a valid date
 * isValidDate(new Date('2024-01-01')); // Returns true
 *
 * @example
 * // Example 2: Check an invalid date
 * isValidDate(new Date('invalid-date')); // Returns false
 *
 * @example
 * // Example 3: Check a non-date value
 * isValidDate('2024-01-01'); // Returns true (if it can be parsed as a date)
 */
export function isValidDate(value: unknown): boolean {
  if (value === false || value === null || value === undefined) {
    return false;
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    const parsedDate = value instanceof Date ? value : new Date(value);
    return !(
      parsedDate.toString() === 'Invalid Date' || isNaN(parsedDate.getTime())
    );
  }

  return false;
}
