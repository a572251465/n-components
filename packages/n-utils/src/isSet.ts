import { commonHandle } from "./helper";

export const isSet = (value: unknown): boolean => commonHandle(value, "set");
