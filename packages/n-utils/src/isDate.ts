import { commonHandle } from "./helper";

export const isDate = (value: unknown): value is boolean =>
  commonHandle(value, "date");
