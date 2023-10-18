export function isValidBody<T extends Record<string, unknown>>(
  body: unknown,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}
