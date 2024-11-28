import { TIME_IN_MS } from './constants';
import { freezeDate } from './freezeDate';
import { WeekDateFormat } from './types';

/**
 * Returns a formatted string representing the year and week number for a given date.
 *
 * This function calculates the week number of the year for a given date, based on the specified
 * week start day and formatting options. The week number calculation can follow different modes
 * to determine how weeks are assigned at the beginning of the year, accommodating ISO-like or custom rules.
 *
 * @param date - The date for which the year-week representation is calculated.
 * @param options - Optional parameters to customize the week calculation.
 *                  - `weekStart`: The first day of the week (0 = Sunday, 6 = Saturday). Default is `0` (Sunday).
 *                  - `mode`: The mode of week calculation.
 *                      - `0`: Weeks start from the first occurrence of `weekStart` after January 1st.
 *                      - `1`: Weeks starting with January 1st are included if they contain at least 4 days of the new year (ISO-like).
 *                  - `countFrom`: Offset to shift the starting point of week counting. Default is `0`.
 *                  - `format`: The output format for representing year and week. Default is `'YYYY-ww'`.
 *                  See {@link WeekNumberOptions} for more details.
 *
 * @returns A string representing the formatted year and week number according to the specified format.
 *
 * @description
 * The function operates in the following steps:
 * 1. Normalizes the date by setting the time to midnight and applying the freezeDate operation.
 * 2. Determines the week to which the given date belongs based on `weekStart`, `mode`, and `countFrom` options.
 * 3. Computes the year and week number according to the provided `format`. See {@link WeekDateFormat} for format options.
 *
 * @example
 * // Basic usage with default options
 * getYearWeek(new Date('2024-01-15'));
 * // Output: '2024-03' (if 'YYYY-ww' format is default)
 *
 * @example
 * // Using a custom week start (Monday) and ISO-like mode
 * getYearWeek(new Date('2024-01-15'), { weekStart: 1, mode: 1 });
 * // Output: '2024-W03-1' (depending on the specified format)
 */

export function getYearWeek(
  date: Date,
  {
    weekStart = 0,
    mode = 0,
    countFrom = 0,
    format = 'YYYY-ww',
  }: WeekNumberOptions = {}
) {
  // 0. normalize hours & freeze date to prevent
  date.setHours(0, 0, 0, 0);
  date = freezeDate(date);
  weekStart = Math.abs(weekStart) % 7;

  // 1. January 1
  // 1-1. initialize variables for january 1
  const jan1 = isLastWeekOfLastYear(date, weekStart, mode)
    ? new Date(date.getFullYear() - 1, 0, 1)
    : isFirstWeekOfNextYear(date, weekStart, mode)
    ? new Date(date.getFullYear() + 1, 0, 1)
    : new Date(date.getFullYear(), 0, 1);

  const year = jan1.getFullYear();

  let offset = 0;
  const normalizedJan1DayIndex = normalizeDayIndex(jan1, weekStart);

  // 1-2. get offset for first week day of year
  if (mode === 0) {
    if (jan1.getDay() !== weekStart) {
      offset = 7 - normalizedJan1DayIndex;
    }
  } else if (mode === 1) {
    // 0 ~ 3 this week
    if (normalizedJan1DayIndex <= 3) {
      offset = -normalizedJan1DayIndex;
    }
    // 4 ~ 6 next week
    else {
      offset = 7 - normalizedJan1DayIndex;
    }
  }

  // 1-3. set first week day of year
  const firstWeekDayOfYear = new Date(year, 0, jan1.getDate() + offset);

  // 2. Week Number
  // 2-1. calculate week number
  const millisecondsDifference =
    Math.abs(date.getTime() - firstWeekDayOfYear.getTime()) +
    TIME_IN_MS.week * (countFrom % 2);
  const dayDifference = millisecondsDifference / TIME_IN_MS.day;

  const weekNumber = Math.floor(dayDifference / 7) + '';
  const weekdayNumber = normalizeDayIndex(date, weekStart) + 1 + '';

  // prettier-ignore
  switch (format) {
    case 'Www':        return 'W' + weekNumber.padStart(2, '0');
    case 'ww':         return weekNumber.padStart(2, '0');
    case 'Ww':         return 'W' + weekNumber;
    case 'w':          return weekNumber;
    case 'YYYY-Www':   return year + '-' + 'W' + weekNumber.padStart(2, '0');
    case 'YYYY-ww':    return year + '-' + weekNumber.padStart(2, '0');
    case 'YYYY-Ww':    return year + '-' + 'W' + weekNumber;
    case 'YYYY-w':     return year + '-' + weekNumber;
    case 'YYYYWww':    return year + 'W' + weekNumber.padStart(2, '0');
    case 'YYYYww':     return year + weekNumber.padStart(2, '0');
    case 'YYYYWw':     return year + 'W' + weekNumber;
    case 'YYYYw':      return year + weekNumber;
    case 'YYYY-Www-D': return year + '-' + 'W' + weekNumber.padStart(2, '0') + '-' + weekdayNumber;
    case 'YYYY-ww-D':  return year + '-' + weekNumber.padStart(2, '0') + '-' + weekdayNumber
    case 'YYYY-Ww-D':  return year + '-' + 'W' + weekNumber + '-' + weekdayNumber;
    case 'YYYY-w-D':   return year + '-' + weekNumber + '-' + weekdayNumber;
    default:           return year + '-' + weekNumber.padStart(2, '0');
  }
}

/**
 * Determines if a given date falls within the last week of the previous year.
 *
 * This function checks if the given date belongs to the last week of the previous year,
 * based on customizable options for the starting day of the week (`weekStart`) and a `mode`
 * parameter that influences the week boundaries. It considers whether a date in January is
 * effectively part of the previous year's last week.
 *
 * @param date - The date to be checked.
 * @param weekStart - The starting day of the week, represented as an index (0 for Sunday, 1 for Monday, etc.). Defaults to 0 (Sunday).
 * @param mode - Determines how the week boundary is calculated:
 *               - `0`: The first day of the week is `weekStart`. Weeks start from the first occurrence of `weekStart` after January 1st.
 *               - `1`: Weeks that start with January 1st are included as part of the last week of the previous year if they contain fewer than 4 days of the current year.
 *               Defaults to `0`.
 * @returns `true` if the date is part of the last week of the previous year, `false` otherwise.
 *
 * @description
 * The function operates in the following steps:
 * 1. If the month is not January, it returns `false` immediately, as the date cannot be part of the last week of the previous year.
 * 2. Checks if the given date belongs to the first week of January, based on the `weekStart` day index.
 * 3. Depending on the `mode` parameter:
 *    - **Mode 0**: If January 1st is not the specified `weekStart`, and the date falls within the first week of January, then it is treated as belonging to the last week of the previous year.
 *    - **Mode 1**: If January 1st is in the middle of the week (i.e., fewer than 4 days belong to the new year), and the date falls within the first week of January, then it is treated as part of the last week of the previous year.
 *
 * @example
 * // Example 1: Assuming the week starts on Sunday (0) and using mode 0
 * isLastWeekOfLastYear(new Date(2024, 0, 1), 0, 0); // false
 * isLastWeekOfLastYear(new Date(2024, 0, 3), 0, 0); // true (if January 1st is a Tuesday)
 *
 * @example
 * // Example 2: Assuming the week starts on Monday (1) and using mode 1
 * isLastWeekOfLastYear(new Date(2024, 0, 2), 1, 1); // true (depending on the normalized day index)
 */
function isLastWeekOfLastYear(date: Date, weekStart = 0, mode = 0) {
  const isJan = date.getMonth() === 0;
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const normalizedJan1DayIndex = normalizeDayIndex(jan1, weekStart);

  // 1. Check if the date is in January
  if (!isJan) {
    return false;
  }

  // Check if the date belongs to the first week of January
  const belongsToFirstWeekOfJanuary =
    date.getDate() <= 7 - normalizedJan1DayIndex;

  // 2. Mode 0
  if (mode === 0) {
    // Check if January 1st falls on the week start day
    const isJan1WeekStart = jan1.getDay() === weekStart;
    if (belongsToFirstWeekOfJanuary && !isJan1WeekStart) {
      return true;
    }
    return false;
  }

  // 3. Mode 1
  if (mode === 1) {
    if (belongsToFirstWeekOfJanuary && normalizedJan1DayIndex > 3) {
      return true;
    }
  }

  return false;
}

/**
 * Determines if a given date falls within the first week of the next year.
 *
 * This function checks if the given date in December is part of the first week of the following year,
 * based on customizable options for the starting day of the week (`weekStart`) and a `mode` parameter
 * that influences the week boundaries.
 *
 * @param date - The date to be checked.
 * @param weekStart - The starting day of the week, represented as an index (0 for Sunday, 1 for Monday, etc.). Defaults to 0 (Sunday).
 * @param mode - Determines how the week boundary is calculated:
 *               - `0`: The first day of the week is `weekStart`. December days are included in the current year unless they belong to a full week of the next year.
 *               - `1`: Weeks that contain fewer than 4 days of the next year are treated as part of the current year.
 *               Defaults to `0`.
 * @returns `true` if the date is part of the first week of the next year, `false` otherwise.
 *
 * @description
 * The function operates in the following steps:
 * 1. If the month is not December, it returns `false` immediately, as the date cannot be part of the next year's first week.
 * 2. Checks if the given date in December belongs to the first week of the next year based on the `weekStart` day index.
 * 3. Depending on the `mode` parameter:
 *    - **Mode 0**: If the date belongs to a full week starting from `weekStart` that is mostly in January, it is treated as part of the next year.
 *    - **Mode 1**: If the last week of December has fewer than 4 days in January, it is treated as part of the current year.
 *
 * @example
 * // Example 1: Assuming the week starts on Sunday (0) and using mode 0
 * isFirstWeekOfNextYear(new Date(2023, 11, 31), 0, 0); // false
 *
 * @example
 * // Example 2: Assuming the week starts on Monday (1) and using mode 1
 * isFirstWeekOfNextYear(new Date(2023, 11, 29), 1, 1); // true (depending on the normalized day index)
 */
function isFirstWeekOfNextYear(date: Date, weekStart = 0, mode = 0) {
  // 1. check if it is december
  const isDec = date.getMonth() === 11;
  if (!isDec) {
    return false;
  }

  const dec31 = new Date(date.getFullYear() + 1, 0, 0);

  const normalizedDec31DayIndex = normalizeDayIndex(dec31, weekStart);

  // 12월 마지막 주에 속하는지 확인 (월 확인은 위에서 필터하고 있음으로 생략)
  const belongsToLastWeekOfDecember =
    date.getDate() >= dec31.getDate() - normalizedDec31DayIndex;

  // mode 0 일때 와 12월 25일 이하는 무조건 올해
  if (mode === 0) {
    if (belongsToLastWeekOfDecember) return false;
  }

  if (mode === 1) {
    if (belongsToLastWeekOfDecember && normalizedDec31DayIndex < 3) {
      return true;
    }
  }

  return false;
}
/**
 * Normalizes the day index of a given date based on the starting day of the week.
 *
 * This function adjusts the day index of the provided `date` to match the specified `weekStart`.
 * For example, if the week starts on Monday (`weekStart = 1`), then Monday becomes day index `0`,
 * and the other days are adjusted accordingly.
 *
 * @param date - The date whose day index is to be normalized.
 * @param weekStart - The starting day of the week, represented as an index (0 for Sunday, 1 for Monday, etc.).
 * @returns The normalized day index, adjusted to start from the specified `weekStart`.
 *
 * @example
 * // Example 1: Normalizing with Sunday as the week start (0)
 * normalizeDayIndex(new Date('2024-01-01'), 0); // Returns 1 (since January 1, 2024 is a Monday)
 *
 * @example
 * // Example 2: Normalizing with Monday as the week start (1)
 * normalizeDayIndex(new Date('2024-01-01'), 1); // Returns 0 (since Monday is the first day of the week)
 */
function normalizeDayIndex(date: Date, weekStart = 0) {
  const day = date.getDay();
  const gap = day - weekStart;
  return gap < 0 ? 7 + gap : gap;
}

/**
 * Options for customizing the week calculation in the `getYearWeek` function.
 *
 * @property weekStart - The first day of the week, represented as an index:
 *                      - `0`: Sunday
 *                      - `1`: Monday
 *                      - `2`: Tuesday
 *                      - `3`: Wednesday
 *                      - `4`: Thursday
 *                      - `5`: Friday
 *                      - `6`: Saturday
 *                      Defaults to `0` (Sunday).
 *
 * @property mode - The mode of week calculation:
 *                - `0`: Weeks start from the first occurrence of `weekStart` after January 1st.
 *                - `1`: Weeks starting with January 1st are included if they contain at least 4 days of the new year (ISO-like).
 *                Defaults to `0`.
 *
 * @property countFrom - Offset to shift the starting point of week counting. Default is `0`.
 *
 * @property format - The format to use for representing the year and week. See {@link WeekDateFormat}.
 */
export interface WeekNumberOptions {
  weekStart?: number;
  mode?: 0 | 1;
  countFrom?: 0 | 1;
  format?: WeekDateFormat;
}
