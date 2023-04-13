import { commonHandle } from "./helper";

export const isSymbol = (value: unknown): boolean =>
  commonHandle(value, "symbol");
