import { isEmpty } from "./isEmpty";

export const isNotEmpty = <T = unknown | null>(
  value: unknown
): value is NonNullable<T> => !isEmpty(value);
