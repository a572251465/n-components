import { isPlainObject } from "./isPlainObject";

export const isEmptyObject = (value: unknown) =>
  isPlainObject(value) &&
  Object.keys(value as Record<string, unknown>).length === 0;
