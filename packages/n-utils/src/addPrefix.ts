export const addPrefix = (
  value: string,
  prefix: string,
  splitSymbol = "/"
): string => {
  if (!value || !prefix || !splitSymbol) return value;

  const len = splitSymbol.length;
  if (value.startsWith(splitSymbol)) value = value.slice(len);
  if (prefix.endsWith(splitSymbol)) return prefix + value;
  return prefix + splitSymbol + value;
};
