const equals = (...args) => {
  if (args.length <= 1) return false;
  const firstItem = args[0];
  args = args.slice(1);
  for (const arg of args) if (arg != firstItem) return false;
  return true;
};

console.log(equals(1, 1, 2));
console.log(equals({}, [], []));

const a = {};
console.log(equals(a, a, a));
console.log(equals("200", 200, 200));
console.log(equals(null, undefined)); // true