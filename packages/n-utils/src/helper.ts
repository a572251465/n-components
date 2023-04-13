import { isEmpty } from "./isEmpty";
import { getTypes } from "./getTypes";

export const commonObj = {};
export const commonHandle = (value: unknown, type: string) =>
  isEmpty(value) ? false : getTypes(value)[0] === type;
