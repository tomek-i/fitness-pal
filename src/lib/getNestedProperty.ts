/**
 * Retrieves a nested property from an object.
 *
 * @param {any} obj - The object to retrieve the property from.
 * @param {string} path - The path to the property, with levels separated by dots.
 * @return {*} The value of the nested property, or undefined if not found.
 */
export function getNestedProperty(obj: any, path: string) {
  if (!obj) return null
  const result = path.split(".").reduce((acc, part) => {
    return acc && acc[part]
  }, obj)

  return result
}
