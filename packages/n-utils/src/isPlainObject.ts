import { commonHandle } from "./helper";

export const isPlainObject = (value: unknown): boolean =>
  commonHandle(value, "object");
