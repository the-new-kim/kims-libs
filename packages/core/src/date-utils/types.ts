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
