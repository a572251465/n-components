import { commonHandle } from "./helper";

export const isDate = (value: unknown): boolean => commonHandle(value, "date");
