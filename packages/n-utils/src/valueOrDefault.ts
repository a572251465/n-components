import { isEmpty } from "./isEmpty";

export const valueOrDefault = <T>(
  value: T,
  replaceValue: T,
  judgeFn = isEmpty
) => (judgeFn(value) ? replaceValue : value);
