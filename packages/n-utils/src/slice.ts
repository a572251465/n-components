import { equals } from "./equals";
import { isString } from "./isString";
import { isNumber } from "./isNumber";
import { isUndefined } from "./isUndefined";

function slice(value: string, start: number): string;
function slice(value: string, start: number, end: string): string;
function slice(value: string, start: number, end: number): string;
function slice(
  value: string,
  start: number,
  end: number,
  symbols: string
): string;
function slice(
  value: string,
  start: number,
  end: string | number,
  symbols: string
) {
  if (equals(arguments.length, 0)) return "";
  if (arguments.length < 2)
    throw new Error("at least two parameters are required");
  if (!isString(value)) throw new Error("first param must be string");
  if (!isNumber(start)) throw new Error("the second param must be number");
  if (arguments.length >= 3) {
    if (!isString(end) && !isNumber(end))
      throw new Error("third param must be number or string");
    if (isString(end)) {
      symbols = end;
      end = value.length;
    }
  }
  if (arguments.length >= 4) {
    if (!isString(symbols)) throw new Error("fourth params must be a string");
  }

  end = end as number;
  if (isUndefined(symbols)) return value.slice(start, end);
  const startStr = value.slice(0, start);
  const endStr = value.slice(end);
  if (startStr.length > 0 && equals(startStr, symbols))
    value = value.slice(start);
  if (endStr.length > 0 && equals(endStr, symbols))
    value = value.slice(0, value.length - symbols.length);
  return value as string;
}

export { slice };
