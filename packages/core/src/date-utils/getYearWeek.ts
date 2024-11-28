import { TIME_IN_MS } from './constants';
import { freezeDate } from './freezeDate';
import { WeekDateFormat } from './types';

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
    TIME_IN_MS.week * countFrom; // 추후 mode % 2로 업그레이드
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

function isLastWeekOfLastYear(date: Date, weekStart = 0, mode = 0) {
  const isJan = date.getMonth() === 0;
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const normalizedJan1DayIndex = normalizeDayIndex(jan1, weekStart);

  // 1. check if it is january
  if (!isJan) {
    return false;
  }

  // 1월 첫번째 주에 속하는지 확인 (월 확인은 위에서 필터하고 있음으로 생략)
  const belongsToFirstWeekOfJanuary =
    date.getDate() <= 7 - normalizedJan1DayIndex;

  // 2. mode 0
  if (mode === 0) {
    // 1월 1일의 요일이 weekStart와 같은지 확인
    // 예를 들어 weekStart가 0(일요일) 이고 그리고 1월 1일이 일요일이라면 올해에 속하게 됨
    // 그렇지 않을 경우는 1월 1일이 화요일이거나 그 이상이라는 뜻
    // 그렇다면 mode 규칙에따라 전년도 마지막 주로 취급
    const isJan1WeekStart = jan1.getDay() === weekStart;
    if (belongsToFirstWeekOfJanuary && !isJan1WeekStart) {
      return true;
    }
    return false;
  }

  // 3. mode 1
  if (mode === 1) {
    if (belongsToFirstWeekOfJanuary && normalizedJan1DayIndex > 3) {
      return true;
    }
  }

  return false;
}

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

function normalizeDayIndex(date: Date, weekStart = 0) {
  const day = date.getDay();
  const gap = day - weekStart;
  return gap < 0 ? 7 + gap : gap;
}

export interface WeekNumberOptions {
  weekStart?: number;
  mode?: 0 | 1;
  countFrom?: 0 | 1;
  format?: WeekDateFormat;
}
