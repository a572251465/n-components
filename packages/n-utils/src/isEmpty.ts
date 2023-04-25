import { isUndefined } from "./isUndefined";
import { isNull } from "./isNull";
import { isEmptyString } from "./isEmptyString";

export const isEmpty = (value: unknown): value is boolean =>
  isUndefined(value) || isNull(value) || isEmptyString(value);
