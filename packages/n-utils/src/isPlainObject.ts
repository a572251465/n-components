import { commonHandle } from "./helper";

export const isPlainObject = (
  value: unknown
): value is Record<string, unknown> => commonHandle(value, "object");
