import { DateUnit } from './types';

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
