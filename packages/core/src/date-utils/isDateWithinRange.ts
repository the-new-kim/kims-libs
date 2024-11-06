export function isDateWithinRange(
  date: Date,
  min?: Date | null,
  max?: Date | null
) {
  if (min && date < min) return false;
  if (max && date > max) return false;
  return true;
}
