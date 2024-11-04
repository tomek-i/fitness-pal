/**
 * Converts a string to a slug by replacing non-alphanumeric characters with hyphens and removing leading/trailing hyphens.
 *
 * @param {string} name - The string to be converted to a slug.
 * @return {string} The slugified string.
 */
export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
