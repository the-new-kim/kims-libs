/**
 * Constants representing time values in milliseconds.
 *
 * This object provides the number of milliseconds in each common unit of time, such as a second, minute, hour, day, and week.
 * It is defined as a constant object to prevent modifications.
 *
 * @property second - The number of milliseconds in one second (1000 ms).
 * @property minute - The number of milliseconds in one minute (60,000 ms).
 * @property hour - The number of milliseconds in one hour (3,600,000 ms).
 * @property day - The number of milliseconds in one day (86,400,000 ms).
 * @property week - The number of milliseconds in one week (604,800,000 ms).
 *
 * @example
 * // Example usage:
 * const durationInMs = 5 * TIME_IN_MS.minute; // Represents 5 minutes in milliseconds
 */
export const TIME_IN_MS = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
} as const;
