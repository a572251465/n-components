import { commonHandle } from "./helper";

export const isError = (value: unknown): boolean =>
  commonHandle(value, "error");
