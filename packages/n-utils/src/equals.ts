export const equals = (...args: unknown[]): boolean => {
  if (args.length <= 1) return false;
  const firstItem = args[0];
  args = args.slice(1);
  for (const arg of args) if (arg != firstItem) return false;
  return true;
};
