export const isPlainObject = (value: unknown) =>
  toString.call(value) === "[object Object]";
