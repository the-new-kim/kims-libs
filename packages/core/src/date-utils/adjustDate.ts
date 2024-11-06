import { DateUnit } from './types';

export function adjustDate(date: Date, amount: number, unit: DateUnit): Date {
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
  adjustDate(date, amount, 'year');
export const adjustMonth = (date: Date, amount: number) =>
  adjustDate(date, amount, 'month');
export const adjustDay = (date: Date, amount: number) =>
  adjustDate(date, amount, 'day');
export const adjustHour = (date: Date, amount: number) =>
  adjustDate(date, amount, 'hour');
export const adjustMinute = (date: Date, amount: number) =>
  adjustDate(date, amount, 'minute');
export const adjustSecond = (date: Date, amount: number) =>
  adjustDate(date, amount, 'second');
export const adjustMillisecond = (date: Date, amount: number) =>
  adjustDate(date, amount, 'millisecond');
