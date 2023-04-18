export const isHas = (obj: Record<string, unknown>, field: string) =>
  Object.prototype.hasOwnProperty.call(obj, field);
