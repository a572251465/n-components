const isPlainObject = (value) => value && typeof value === "object";

function isFullObject(value, fields, isAll) {
  if (!isPlainObject(value) || Object.keys(value).length === 0) return false;

  const args = Array.prototype.slice.call(arguments, 1);
  if (args.length === 0) return true;
  if (args.length >= 1 && !Array.isArray(fields))
    throw new Error(`params【fields】 be must array`);
  isAll = !!isAll;
  if (fields.length <= 0) return true;

  let count = 0;
  const keys = Object.keys(value);
  fields?.forEach((name) => {
    if (keys.includes(name)) count++;
  });

  if (count <= 0) return false;
  return isAll ? (count === fields.length ? true : false) : true;
}

const info = { nam: "lihh", age: 20, address: "info" };
console.log(isFullObject(info));
console.log(isFullObject(info, ["test"]));
console.log(isFullObject(info, ["age"]));
console.log(isFullObject(info, ["age"], true));
console.log(isFullObject(info, ["age,", "age1"], true));
