import { DateUnit } from './types';

/**
 * Adjusts a given date by a specified unit of time (year, month, day, etc.) and amount.
 *
 * This function allows you to add or subtract a specified amount of time from a given date.
 * You can adjust the year, month, day, hour, minute, second, or millisecond.
 *
 * @param unit - The unit of time to adjust (e.g., 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond').
 * @param date - The date to be adjusted.
 * @param amount - The amount to adjust the date by. Positive values add time, and negative values subtract time.
 * @returns A new `Date` object with the specified adjustment applied.
 *
 * @example
 * // Example 1: Adjusting the year by 2 years
 * adjustDate('year', new Date('2024-01-01'), 2); // Returns a date in 2026
 *
 * @example
 * // Example 2: Subtracting 3 days from a date
 * adjustDate('day', new Date('2024-01-15'), -3); // Returns a date for January 12, 2024
 *
 * @example
 * // Example 3: Adding 30 minutes to a date
 * adjustDate('minute', new Date('2024-01-01T12:00:00'), 30); // Returns a date for 12:30 PM on January 1, 2024
 */
export function adjustDate(unit: DateUnit, date: Date, amount: number): Date {
  const newDate = new Date(date);
  switch (unit) {
    case 'year':
      newDate.setFullYear(newDate.getFullYear() + amount);
      break;
    case 'month':
      newDate.setMonth(newDate.getMonth() + amount);
      break;
    case 'day':
      newDate.setDate(newDate.getDate() + amount);
      break;
    case 'hour':
      newDate.setHours(newDate.getHours() + amount);
      break;
    case 'minute':
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case 'second':
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
    case 'millisecond':
      newDate.setMilliseconds(newDate.getMilliseconds() + amount);
      break;
    default:
      throw new Error('Invalid unit');
  }
  return newDate;
}

export const adjustYear = (date: Date, amount: number) =>
  adjustDate('year', date, amount);
export const adjustMonth = (date: Date, amount: number) =>
  adjustDate('month', date, amount);
export const adjustDay = (date: Date, amount: number) =>
  adjustDate('day', date, amount);
export const adjustHour = (date: Date, amount: number) =>
  adjustDate('hour', date, amount);
export const adjustMinute = (date: Date, amount: number) =>
  adjustDate('minute', date, amount);
export const adjustSecond = (date: Date, amount: number) =>
  adjustDate('second', date, amount);
export const adjustMillisecond = (date: Date, amount: number) =>
  adjustDate('millisecond', date, amount);
