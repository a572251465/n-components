import { commonHandle } from "./helper";

export const isSymbol = (value: unknown): value is symbol =>
  commonHandle(value, "symbol");
