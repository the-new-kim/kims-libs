import { FixedLengthArray } from '../types';

export type DateUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export type MonthNames = FixedLengthArray<string, 12>;
export type WeekDayNames = FixedLengthArray<string, 7>;

/**
 * Represents the various formats for representing a year and week.
 *
 * This type allows different formats for representing a year, week number, and optionally a weekday number.
 * It can be used to flexibly format dates in different week-based representations, accommodating ISO standards or custom formats.
 *
 * @example
 * // Examples of formats:
 * - `'YYYY-ww'`: Represents the year and two-digit week number (e.g., `'2024-03'`).
 * - `'YYYY-Www-D'`: Represents the year, week number with 'W' prefix, and day of the week (e.g., `'2024-W03-3'`).
 * - `'Www'`: Represents the week number only, prefixed by 'W' (e.g., `'W03'`).
 * - `'w'`: Represents a single-digit week number without any prefix (e.g., `'3'`).
 */
export type WeekDateFormat =
  | `${YearFormat}-${WeekFormat}`
  | `${YearFormat}${WeekFormat}`
  | `${YearFormat}-${WeekFormat}-D`
  | `${YearFormat}${WeekFormat}D`
  | `${WeekFormat}`;

type YearFormat = 'YYYY';
type WeekFormat = 'Www' | 'ww' | 'Ww' | 'w';
