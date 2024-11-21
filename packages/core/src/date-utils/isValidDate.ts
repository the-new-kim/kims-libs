export function isValidDate(value: unknown): boolean {
  if (value === false || value === null || value === undefined) {
    return false;
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    const parsedDate = value instanceof Date ? value : new Date(value);
    return !(
      parsedDate.toString() === 'Invalid Date' || isNaN(parsedDate.getTime())
    );
  }

  return false;
}
