import { isUndefined } from "./isUndefined";
import { isNull } from "./isNull";
import { isEmptyString } from "./isEmptyString";

export const isEmpty = (value: unknown) =>
  isUndefined(value) || isNull(value) || isEmptyString(value);
