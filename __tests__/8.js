const isUndefined = (value) => typeof value === "undefined";
const isString = (value) => typeof value === "string";
const isNumber = (value) => typeof value === "number";
const equals = (v1, v2) => v1 == v2;

const slice = (...args) => {
  if (equals(args.length, 0)) return "";
  if (args.length < 2) throw new Error("at least two parameters are required");
  let value = args[0];
  if (!isString(value)) throw new Error("first param must be string");
  const start = args[1];
  if (!isNumber(start)) throw new Error("the second param must be number");
  let end, symbols;
  if (args.length >= 3) {
    end = args[2];
    if (!isString(end) && !isNumber(end))
      throw new Error("third param must be number or string");
    if (isString(end)) {
      symbols = end;
      end = value.length;
    }
  }
  if (args.length >= 4) {
    symbols = args[3];
    if (!isString(symbols)) throw new Error("fourth params must be a string");
  }

  if (isUndefined(symbols)) return value.slice(start, end);
  const startStr = value.slice(0, start);
  const endStr = value.slice(end);
  if (startStr.length > 0 && equals(startStr, symbols))
    value = value.slice(start);
  if (endStr.length > 0 && equals(endStr, symbols))
    value = value.slice(0, value.length - symbols.length);
  return value;
};

// console.log(slice("/myScreen", 1, "/"));
// console.log(slice("myScreen", 1, "/"));
// console.log(slice("myScreen", 1, -1) == "myScreen".slice(1, -1));
// console.log(slice("$myScreen$", 1, -1, "$"));
// console.log(slice("$myScreen$", 2, -2, "$"));
