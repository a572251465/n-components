function Person() {}
const p = new Person();
Person.prototype.name = "lihh";

console.log(Reflect.has(p, "name"));
console.log("name" in p);
console.log(Object.hasOwnProperty(p, "name"));
