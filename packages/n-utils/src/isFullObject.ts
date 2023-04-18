import { isArray } from "./isArray";
import { isPlainObject } from "./isPlainObject";

export function isFullObject(
  value: Record<string, unknown>,
  fields?: string[],
  isAll?: boolean
): boolean {
  if (!isPlainObject(value) || Object.keys(value).length === 0) return false;

  const args = Array.prototype.slice.call(arguments, 1);
  if (args.length === 0) return true;
  if (args.length >= 1 && !isArray(fields))
    throw new Error(`params【fields】 be must array`);
  isAll = !!isAll;
  if (fields!.length <= 0) return true;

  let count = 0;
  const keys = Object.keys(value);
  fields?.forEach((name) => {
    if (keys.includes(name)) count++;
  });

  if (count <= 0) return false;
  return isAll ? (count === fields!.length ? true : false) : true;
}
