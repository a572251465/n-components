const commonObj = {};

const getTypes = (value) => {
  if (!Array.isArray(value)) value = [value];
  return value.map((item) => {
    const type = commonObj.toString.call(item).toLowerCase();
    const execs = /\s+([a-z]+)/gi.exec(type);
    return execs ? execs[1] : "";
  });
};

console.log(getTypes(1));
console.log(getTypes(["", 1, {}]));
