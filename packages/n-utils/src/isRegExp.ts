import { commonHandle } from "./helper";

export const isRegExp = (value: unknown): boolean =>
  commonHandle(value, "regexp");
