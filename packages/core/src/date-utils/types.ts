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
 * This type represents an extended version of the [ISO 8601 week date format](https://en.wikipedia.org/wiki/ISO_8601#Week_dates)
 *
 * It allows different formats for representing a year, week number, and optionally a weekday number.
 * This type can be useful when dealing with various week date representations,
 * such as parsing week-related data or formatting dates based on the week.
 *
 * The type combines several patterns:
 * - [YYYY]: Represents the year in a four-digit format (e.g., 2024).
 * - [Www]: Represents the week number, where 'W' is an optional prefix, followed by a two-digit week number (e.g., W03, 12).
 * - [D]: Represents the day of the week, with values from 1 (the first day of the week) through 7 (the last day of the week).
 *   For example, if the week starts on Monday, then `1` is Monday and `7` is Sunday.
 *
 * ### Examples:
 *  March 5, 2024 (Sunday as the first day of the week):
 * - `YYYY-ww`: `'2024-10'`
 * - `YYYY-Ww-D` (Tuesday): `'2024-W10-3'`
 *
 * January 15, 2024:
 * - `YYYY-Www`: `'2024-W03'`
 * - `YYYYww` (Week number without hyphen): `'202403'`
 * - `Ww`: `'W3'`
 */
export type WeekDateFormat =
  | `${YearFormat}-${WeekFormat}`
  | `${YearFormat}${WeekFormat}`
  | `${YearFormat}-${WeekFormat}-D`
  | `${YearFormat}${WeekFormat}D`
  | `${WeekFormat}`;

type YearFormat = 'YYYY';
type WeekFormat = 'Www' | 'ww' | 'Ww' | 'w';
