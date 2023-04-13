import { commonHandle } from "./helper";

export const isFormData = (value: unknown): boolean =>
  commonHandle(value, "formdata");
