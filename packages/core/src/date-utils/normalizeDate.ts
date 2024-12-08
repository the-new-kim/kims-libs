import { DATE_UNITS } from './constants';
import { DateUnit } from './types';

export function normalizeDate(date: Date, type: DateUnit = 'millisecond') {
  const typeIndex = DATE_UNITS.findIndex((u) => u === type);

  let result = '';
  const fns = [
    (d: Date) => d.getFullYear() + '',
    (d: Date) => String(d.getMonth()).padStart(2, '0'),
    (d: Date) => String(d.getDate()).padStart(2, '0'),
    (d: Date) => String(d.getHours()).padStart(2, '0'),
    (d: Date) => String(d.getMinutes()).padStart(2, '0'),
    (d: Date) => String(d.getSeconds()).padStart(2, '0'),
    (d: Date) => String(d.getMilliseconds()).padStart(3, '0'),
  ];

  for (let i = 0; i <= typeIndex; i++) {
    result += fns[i](date);
  }

  return Number(result);
}
