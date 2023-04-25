import { isPlainObject } from "./isPlainObject";

export const isEmptyObject = (
  value: unknown
): value is Record<string, unknown> =>
  isPlainObject(value) &&
  Object.keys(value as Record<string, unknown>).length === 0;
