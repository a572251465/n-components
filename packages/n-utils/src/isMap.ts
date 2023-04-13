import { commonHandle } from "./helper";

export const isMap = (value: unknown): boolean => commonHandle(value, "map");
