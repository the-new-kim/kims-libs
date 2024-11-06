import { DateUnit } from './types';

export function isDateEqual(
  dateUnit: DateUnit,
  ...dateValues: (Date | null | undefined)[]
): boolean {
  const validDates = dateValues.filter(
    (date): date is Date => date instanceof Date
  );

  if (validDates.length < 2) {
    return false;
  }

  const firstDate = validDates[0];

  switch (dateUnit) {
    case 'year':
      return validDates.every(
        (date) => date.getFullYear() === firstDate.getFullYear()
      );
    case 'month':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth()
      );
    case 'day':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate()
      );
    case 'hour':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate() &&
          date.getHours() === firstDate.getHours()
      );
    case 'minute':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate() &&
          date.getHours() === firstDate.getHours() &&
          date.getMinutes() === firstDate.getMinutes()
      );
    case 'second':
      return validDates.every(
        (date) =>
          date.getFullYear() === firstDate.getFullYear() &&
          date.getMonth() === firstDate.getMonth() &&
          date.getDate() === firstDate.getDate() &&
          date.getHours() === firstDate.getHours() &&
          date.getMinutes() === firstDate.getMinutes() &&
          date.getSeconds() === firstDate.getSeconds()
      );
    case 'millisecond':
      return validDates.every((date) => date.getTime() === firstDate.getTime());
    default:
      return false;
  }
}
