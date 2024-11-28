import {
  adjustDate,
  adjustYear,
  adjustMonth,
  adjustDay,
  adjustHour,
  adjustMinute,
  adjustSecond,
  adjustMillisecond,
} from './adjustDate';
import { DateUnit } from './types';

describe('adjustDate', () => {
  it('adjusts the year correctly', () => {
    const date = new Date(2020, 0, 1);
    const adjustedDate = adjustYear(date, 3);
    expect(adjustedDate.getFullYear()).toBe(2023);
  });

  it('adjusts the month correctly', () => {
    const date = new Date(2020, 0, 1);
    const adjustedDate = adjustMonth(date, 2);
    expect(adjustedDate.getMonth()).toBe(2);
  });

  it('adjusts the day correctly', () => {
    const date = new Date(2020, 0, 1);
    const adjustedDate = adjustDay(date, 10);
    expect(adjustedDate.getDate()).toBe(11);
  });

  it('adjusts the hour correctly', () => {
    const date = new Date(2020, 0, 1, 5);
    const adjustedDate = adjustHour(date, 5);
    expect(adjustedDate.getHours()).toBe(10);
  });

  it('adjusts the minute correctly', () => {
    const date = new Date(2020, 0, 1, 0, 30);
    const adjustedDate = adjustMinute(date, 15);
    expect(adjustedDate.getMinutes()).toBe(45);
  });

  it('adjusts the second correctly', () => {
    const date = new Date(2020, 0, 1, 0, 0, 30);
    const adjustedDate = adjustSecond(date, 30);
    expect(adjustedDate.getSeconds()).toBe(0);
    expect(adjustedDate.getMinutes()).toBe(1);
  });

  it('adjusts the millisecond correctly', () => {
    const date = new Date(2020, 0, 1, 0, 0, 0, 500);
    const adjustedDate = adjustMillisecond(date, 600);
    expect(adjustedDate.getMilliseconds()).toBe(100);
    expect(adjustedDate.getSeconds()).toBe(1);
  });

  it('throws an error for an invalid unit', () => {
    const date = new Date(2020, 0, 1);
    expect(() => adjustDate('invalid' as unknown as DateUnit, date, 1)).toThrow(
      'Invalid unit'
    );
  });
});
