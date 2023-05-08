import { isEmpty } from "./isEmpty";
import { equals } from "./equals";

export const isBlankEmpty = (value: unknown): value is boolean =>
  isEmpty(value) || equals(value, 0);
