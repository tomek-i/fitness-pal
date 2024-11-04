/**
 * Sanitizes a number value by converting it to a valid number or returning 0 if the value is null or not a number.
 *
 * @param value - The value to be sanitized, can be a string, number, or null.
 * @returns The sanitized number value.
 */
export function sanitizeNumber(value: string | number | null) {
  if (!value) return 0
  const paramValue = Number(value)
  return isNaN(paramValue) ? 0 : paramValue
}
