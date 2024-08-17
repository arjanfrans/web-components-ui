export function mapEnum<T extends Record<string, string | number>, R>(
  enumObj: T,
  callback: (value: T[keyof T]) => R,
): R[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Exclude numeric keys, which are added in numeric enums
    .map((key) => callback(enumObj[key as keyof T]));
}
