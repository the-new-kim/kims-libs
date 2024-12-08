export function isNumberWithinRange(
  number: number,
  min?: number | null,
  max?: number | null
) {
  if (typeof min === 'number' && number < min) return false;
  if (typeof max === 'number' && number > max) return false;
  return true;
}
