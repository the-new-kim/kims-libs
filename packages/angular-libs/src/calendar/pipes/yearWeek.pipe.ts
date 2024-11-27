import { Pipe, PipeTransform } from '@angular/core';
import { calculateYearWeek } from '@kims-libs/core';

@Pipe({
  name: 'yearWeek',
  standalone: true,
})
export class YearWeekPipe implements PipeTransform {
  transform(date: Date | string | number, mode = 0): string {
    return calculateYearWeek(date, mode);
  }
}

//////////////////////// YearWeekPipe

//   transform(value: Date, format?: 'W' | 'WW', mode = 0) {
//     value = new Date(value);
//     value.setHours(0, 0, 0, 0);
//     let result = null;
//     const firstDayOfYear = WeekDateHelper.isLastWeekOfLastYear(value)
//       ? new Date(value.getFullYear() - 1, 0, 1, 0, 0, 0)
//       : WeekDateHelper.isFirstWeekOfNextYear(value)
//       ? new Date(value.getFullYear() + 1, 0, 1, 0, 0, 0)
//       : new Date(value.getFullYear(), 0, 1, 0, 0, 0);
//     const firstWeekDayOfYear = WeekDateHelper.getNthDayOfWeek(firstDayOfYear);
//     const gapInMilliseconds = WeekDateHelper.calculateDurationBetween(firstWeekDayOfYear, value) + DateHelper.millisecondsMap.week;
//     const gapInDay = gapInMilliseconds / DateHelper.millisecondsMap.day;

//     result = Math.floor(gapInDay / 7);

//     if (!format) return result;

//     const formatMap: Record<typeof format, string> = {
//       W: result + '',
//       WW: result < 10 ? `0${result}` : result + '',
//     };

//     return formatMap[format];
//   }
// }

////////////////////////// DateHelper

// export class DateHelper {
//   static millisecondsMap = {
//     second: 1000,
//     minute: 1000 * 60,
//     hour: 1000 * 60 * 60,
//     day: 1000 * 60 * 60 * 24,
//     week: 1000 * 60 * 60 * 24 * 7,
//   } as const;
//   static sevenDays = [...Array(7).keys()] as const;
//   static twelveMonths = [...Array.from({ length: 12 }, (_, i) => i + 1)] as const;
//   static getTodayMidnight() {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return today;
//   }
// }

// export class WeekDateHelper {
//   // 월의 마지막 날짜를 반환
//   static getLastDayOfMonth(date: Date) {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   }

//   static getDayOffset(numberOfDay: number) {
//     return numberOfDay > 3 ? (7 - numberOfDay) * DateHelper.millisecondsMap.day : -numberOfDay * DateHelper.millisecondsMap.day;
//   }

//   static isFirstWeekOfNextMonth(date: Date) {
//     const lastDayOfMonth = WeekDateHelper.getLastDayOfMonth(date);
//     return lastDayOfMonth.getDay() < 3 && date.getDay() < 3;
//   }

//   static isLastWeekOfLastMonth(date: Date) {
//     return date.getDate() < 4 && date.getDay() > 3;
//   }

//   static getWeekMonth(date: Date) {
//     let month = 0;
//     const day = date.getDate();
//     if (day < 4) {
//       month = WeekDateHelper.isLastWeekOfLastMonth(date) ? date.getMonth() : date.getMonth() + 1;
//     } else {
//       month = WeekDateHelper.isFirstWeekOfNextMonth(date) ? date.getMonth() + 2 : date.getMonth() + 1;
//     }

//     return month % 12;
//   }

//   static isFirstWeekOfNextYear(date: Date) {
//     // 일요일이 12월 27일 이상 이면 다음해 첫번째주에 속함
//     return date.getMonth() >= 11 && date.getDate() > 28 && date.getDay() < 3;
//   }

//   static isLastWeekOfLastYear(date: Date) {
//     return date.getMonth() <= 0 && date.getDate() < 4 && date.getDay() > 3;
//   }

//   static getTotalWeeksInMonth(date: Date) {
//     const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const firstDayOfWeek = new Date(firstDayOfMonth.getTime() + WeekDateHelper.getDayOffset(firstDayOfMonth.getDay()));

//     const lastDayOfMonth = WeekDateHelper.getLastDayOfMonth(date);
//     const lastDay = lastDayOfMonth.getDay();

//     // 일요일 ~ 화요일 사이는 월 마지막 날을 그냥 뺀 날짜
//     // 수요일 ~ 토요일 사이는 {월 마지막 날 + (7일 - 월 마지막 날)}
//     const lastDayOfWeek = lastDay >= 3 ? new Date(lastDayOfMonth.getTime() + (7 - lastDay) * DateHelper.millisecondsMap.day) : new Date(lastDayOfMonth.getTime() + WeekDateHelper.getDayOffset(lastDay));

//     const totalWeeksInMonth = (lastDayOfWeek.getTime() - firstDayOfWeek.getTime()) / DateHelper.millisecondsMap.week;

//     return [...Array.from({ length: totalWeeksInMonth }, (_, i) => i + 1)];
//   }

//   static calculateDurationBetween(startDate: Date, endDate: Date) {
//     return Math.abs(endDate.getTime() - startDate.getTime());
//   }

//   static translateYearWeekToDate(year: number, week: number, firstDayOfWeek = 0) {
//     let date = new Date();

//     let firstDayOfYear = new Date(year, 0, 1, 0, 0, 0);
//     if (WeekDateHelper.isLastWeekOfLastYear(firstDayOfYear)) {
//       const durationInDay = 7 - firstDayOfYear.getDay();
//       firstDayOfYear = WeekDateHelper.getNthDayOfWeek(new Date(firstDayOfYear.getTime() + durationInDay * DateHelper.millisecondsMap.day), firstDayOfWeek);
//     } else {
//       firstDayOfYear = WeekDateHelper.getNthDayOfWeek(firstDayOfYear, firstDayOfWeek);
//     }

//     date = new Date(firstDayOfYear.getTime() + (week - 1) * DateHelper.millisecondsMap.week);

//     return date;
//   }

//   /**
//    * 주의 n번째 날짜를 구하는 함수
//    * @param date 타겟날짜
//    * @param firstDayOfWeek 주시작 기준 요일 (0:일요일 ~ 6:토요일)
//    * @param nthDay firstDayOfWeek을 기준으로 n번째 날짜 (0:주첫번째 ~ 6:주마지막)
//    * @returns Date
//    */
//   static getNthDayOfWeek(date: Date, nthDay = 0, firstDayOfWeek = 0) {
//     let gapInDay = date.getDay() - firstDayOfWeek;
//     if (gapInDay < 0) {
//       gapInDay += 7;
//     }
//     return new Date(date.getTime() - (gapInDay - (nthDay % 7)) * DateHelper.millisecondsMap.day);
//   }

//   static getWeekYear(date: Date) {
//     if (WeekDateHelper.isLastWeekOfLastYear(date)) {
//       return date.getFullYear() - 1;
//     }
//     if (WeekDateHelper.isFirstWeekOfNextYear(date)) {
//       return date.getFullYear() + 1;
//     }

//     return date.getFullYear();
//   }
// }
