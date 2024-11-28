/**
 * Normalizes a given number to ensure it falls within the range of 0 to `modulus - 1`, effectively wrapping values to keep them within bounds.
 *
 * This function takes a `value` (which may be any integer) and ensures it falls within the valid range,
 * from 0 to `modulus - 1`. Negative values and values greater than `modulus - 1` are correctly normalized to wrap around.
 *
 * @param value - The value to be normalized, which can be any integer (e.g., -3, 8, etc.).
 * @param modulus - The modulus value that defines the range (e.g., 7 for days of the week).
 * @returns A normalized value within the range of 0 to `modulus - 1`.
 *
 * @example
 * // Example 1: Normalize a positive value greater than the modulus
 * normalizeNumber(8, 7); // Returns 1 (equivalent to Monday if modulus is 7 for days of the week)
 *
 * @example
 * // Example 2: Normalize a negative value
 * normalizeNumber(-1, 7); // Returns 6 (equivalent to Saturday if modulus is 7 for days of the week)
 *
 * @example
 * // Example 3: Normalize a valid value within range
 * normalizeNumber(3, 7); // Returns 3 (equivalent to Wednesday if modulus is 7 for days of the week)
 */
export function normalizeNumber(value: number, modulus: number): number {
  // Adding +0 to avoid negative zero (-0) result
  const remainder = (value % modulus) + 0;
  return remainder < 0 ? modulus + remainder : remainder;
}
