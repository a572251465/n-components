const flattenArr = <T>(values: (T | T[])[]) => {
  return values.reduce(
    (memo, curr) => memo.concat(Array.isArray(curr) ? flattenArr(curr) : curr),
    [] as (T | T[])[][]
  );
};

// [1,2,3,4] => 1-2-3-4
// [1, [2, 3]] => 1-2-3-4
// [1, 2, [3, 4, [5]]] => 1-2-3-4-5
const flattenJoinSymbol = <T = string>(
  values: (T | T[])[],
  symbol = "-"
): string => {
  if (!Array.isArray(values)) {
    throw new Error("params【values】must be an array");
  }
  return flattenArr<T>(values).join(symbol);
};

export { flattenJoinSymbol };
