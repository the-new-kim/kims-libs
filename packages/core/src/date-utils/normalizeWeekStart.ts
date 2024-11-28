import { normalizeNumber } from '../utils';

/**
 * Normalizes the `weekStart` value to ensure it is within the range of 0 to 6.
 *
 * This function takes a `weekStart` value (which may be any integer) and ensures it falls within the valid range of days in a week,
 * from 0 (Sunday) to 6 (Saturday). Negative values and values greater than 6 are correctly normalized to wrap around the week.
 *
 * @param weekStart - The starting day of the week, which can be any integer (e.g., -3, 8, etc.).
 * @returns A normalized value within the range of 0 to 6, representing the day of the week.
 *
 * @example
 * // Example 1: Normalize a positive value greater than 6
 * normalizeWeekStart(8); // Returns 1 (equivalent to Monday)
 *
 * @example
 * // Example 2: Normalize a negative value
 * normalizeWeekStart(-1); // Returns 6 (equivalent to Saturday)
 *
 * @example
 * // Example 3: Normalize a valid value within range
 * normalizeWeekStart(3); // Returns 3 (equivalent to Wednesday)
 */
export const normalizeWeekStart = (weekStart: number) =>
  normalizeNumber(weekStart, 7);
