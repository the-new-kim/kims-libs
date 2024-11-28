import { isValidDate } from './isValidDate';
import { DateUnit } from './types';

/**
 * Compares multiple `Date` objects to determine if they are equal up to a specified unit of time.
 *
 * This function takes a unit of time (e.g., year, month, day, etc.) and compares the given dates to check if they are equal up to that level of granularity.
 * Dates that are `null` or `undefined` are ignored. If less than two valid dates are provided, the function returns `false`.
 *
 * @param dateUnit - The unit of time to compare (`year`, `month`, `day`, `hour`, `minute`, `second`, or `millisecond`).
 * @param dateValues - An array of `Date` objects (or `null`/`undefined`) to be compared.
 * @returns `true` if all the valid `Date` objects are equal up to the specified unit, otherwise `false`.
 *
 * @example
 * // Example 1: Compare if dates are in the same year
 * isDateEqual('year', new Date('2024-01-01'), new Date('2024-12-31')); // Returns true
 *
 * @example
 * // Example 2: Compare if dates are in the same month
 * isDateEqual('month', new Date('2024-01-15'), new Date('2024-01-30')); // Returns true
 *
 * @example
 * // Example 3: Compare if dates are on the same day
 * isDateEqual('day', new Date('2024-01-15T12:00:00'), new Date('2024-01-15T23:59:59')); // Returns true
 *
 * @example
 * // Example 4: Compare if dates are at the same hour
 * isDateEqual('hour', new Date('2024-01-15T12:00:00'), new Date('2024-01-15T12:59:59')); // Returns true
 *
 * @example
 * // Example 5: Compare if dates are at the same millisecond
 * isDateEqual('millisecond', new Date('2024-01-15T12:00:00.123'), new Date('2024-01-15T12:00:00.123')); // Returns true
 */
export function isDateEqual(
  dateUnit: DateUnit,
  ...dateValues: (Date | null | undefined)[]
): boolean {
  const validDates = dateValues.filter(isValidDate) as Date[];

  if (validDates.length < 2) {
    return false;
  }

  const firstDate = validDates[0];

  switch (dateUnit) {
    case 'year':
      return validDates.every(
        (date) => date.getFullYear() === firstDate.getFullYear()
      );
    case 'month':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth()
      );
    case 'day':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate()
      );
    case 'hour':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate() &&
          date.getHours() === firstDate.getHours()
      );
    case 'minute':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate() &&
          date.getHours() === firstDate.getHours() &&
          date.getMinutes() === firstDate.getMinutes()
      );
    case 'second':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate() &&
          date.getHours() === firstDate.getHours() &&
          date.getMinutes() === firstDate.getMinutes() &&
          date.getSeconds() === firstDate.getSeconds()
      );
    case 'millisecond':
      return validDates.every((date) => date.getTime() === firstDate.getTime());
    default:
      return false;
  }
}
