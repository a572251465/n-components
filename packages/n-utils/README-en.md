## n-utils

provide common public methods

English | [简体中文](https://github.com/a572251465/n-components/blob/main/packages/n-utils/README.md)

### install

```shell
npm install @lihh/n-utils -S
```

```shell
yarn add @lihh/n-utils -S
```

```shell
pnpm install @lihh/n-utils -S
```

### API

- [flattenJoinSymbol](#flattenJoinSymbol)
- [addPrefix](#addPrefix)
- [isEmpty](#isEmpty)
- [isNotEmpty](#isNotEmpty)
- [isEmptyObject](#isEmptyObject)
- [isEmptyString](#isEmptyString)
- [isObject](#isObject)
- [isPlainObject](#isPlainObject)
- [getTypes](#getTypes)
- [isFullObject](#isFullObject)
- [equals](#equals)
- [slice](#slice)
- [other api](#simple-api)

#### flattenJoinSymbol

use example

```js
import { flattenJoinSymbol } from "@lihh/n-utils";

// [1,2,3,4] => 1-2-3-4
flattenJoinSymbol([1, 2, 3, 4], "-");
// [1, [2, 3]] => 1-2-3-4
flattenJoinSymbol([1, [2, 3]], "-");
// [1, 2, [3, 4, [5]]] => 1-2-3-4-5
flattenJoinSymbol([1, [2, 3]], "-");
```

type

```ts
export type flattenJoinSymbol<T> = {
  (values: (T | T[])[], symbol = "-"): string;
};
```

#### addPrefix

use example

```js
import { addPrefix } from "@lihh/n-utils";
const baseUrl = "/queryUserInfo";
const prefix = "/api";

// /api/queryUserInfo
addPrefix(baseUrl, prefix);
// /api/queryUserInfo
addPrefix(baseUrl, "/api/");
// /api-/queryUserInfo
addPrefix(baseUrl, prefix, "-");
```

type

```ts
export type addPrefix<T> = {
  (value: string, prefix: string, splitSymbol = "/"): string;
};
```

#### isEmpty

```js
import { isEmpty } from "@lihh/n-utils";
// true
isEmpty(null);
// true
isEmpty(undefined);
// true
isEmpty("");
// false
isEmpty(0);
```

#### isNotEmpty

```js
import { isNotEmpty } from "@lihh/n-utils";
// false
isNotEmpty(null);
// false
isNotEmpty(undefined);
// false
isNotEmpty("");
// true
isNotEmpty(0);
```

#### isEmptyObject

```js
import { isEmptyObject } from "@lihh/n-utils";

// true
isEmptyObject({});
// false
isEmptyObject({ name: xx });
// false
isEmptyObject([]);
```

#### isEmptyString

```js
import { isEmptyString } from "@lihh/n-utils";
// true
isEmptyString("");
// false
isEmptyString(false);
// false
isEmptyString(0);
```

#### isObject

```js
import { isObject } from "@lihh/n-utils";
// true
isObject({});
// true
isObject([]);
// true
isObject(null);
// false
isObject(1);
```

#### isPlainObject

```js
import { isPlainObject } from "@lihh/n-utils";
// true
isPlainObject({});
// true
isPlainObject({ age: 20 });
// false
isPlainObject([]);
// false
isPlainObject(null);
// false
isPlainObject(1);
```

#### getTypes

use example

```js
import { getTypes } from "@lihh/n-utils";
// []
getTypes();
// ["number"]
getTypes(1);
// ["boolean", "string"]
getTypes([true, "11"]);
```

type

```ts
export type getTypes = {
  (value: unknown | unknown[]): string[];
};
```

#### isFullObject

> not empty object && Whether certain attributes exist.

##### field

- value judge object，required input
- fields The existing attribute must be an array, but it does not necessarily exist
- isAll Do you want to satisfy that the value in fields exists in object value

use example

```js
import { isFullObject } from "@lihh/n-utils";

const info = { nam: "lihh", age: 20, address: "info" };
console.log(isFullObject(info)); // true
console.log(isFullObject(info, ["test"])); // false
console.log(isFullObject(info, ["age"])); // true
console.log(isFullObject(info, ["age"], true)); // true
console.log(isFullObject(info, ["age,", "age1"], true)); // false
```

type

```ts
export type isFullObject = (
  value: Record<string, unknown>,
  fields?: string[],
  isAll?: boolean
) => boolean;
```

#### equals

use example

```js
import { equals } from "@lihh/n-utils";

console.log(equals(1, 1, 2)); // false
console.log(equals({}, [], [])); // false
const a = {};
console.log(equals(a, a, a)); // true
console.log(equals("200", 200, 200)); // true
console.log(equals(null, undefined)); // true
```

type

```ts
type equals = (...args: unknown[]) => boolean;
```

#### slice

If there is a symbol present, the truncated part will only be truncated if it matches the symbol, otherwise it will not be truncated。
If there are no symbols present, the function is similar to String. prototype. slice

use example

```js
import { slice } from "@lihh/n-utils";

console.log(slice("/myScreen", 1, "/")); // myScreen
console.log(slice("/myScreen", 1, -1)); // myScree   = String.prototype.Slice
console.log(slice("/myScreen/", 1, -1, "/")); // myScreen
```

type

```ts
function slice(value: string, start: number): string;
function slice(value: string, start: number, end: string | number): string;
function slice(
  value: string,
  start: number,
  end: number,
  symbols: string
): string;
function slice(
  value: string,
  start: number,
  end?: number | string,
  symbols?: string
): string {
  // todo
}
```

#### simple api

- isDate
- isError
- isFormData
- isMath
- isRegExp
- isSymbol
- isMap
- isSet
- isString
- isUndefined
- isNumber
- isNull
- isFunction
- isArray

## update records

> no version explain, update README file

- 1.0.1 first publish
- 1.0.2 add judge function `addPrefix`, `isArray`, `isEmpty`, `isEmptyObject`, `isEmptyString`, `isFunction`, `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isString`, `isUndefined`, `getTypes`
- 1.0.11 add judge function `isDate`, `isError`, `isFormData`, `isMath`, `isRegExp`, `isSymbol`, `isMap`, `isSet`
- 1.0.32 add judge function `isFullObject`
- 1.0.34 add judge function `equals`
- 1.0.35 add return type. `(value: unknown): boolean` => `(value: unknow): value is (...args: any[]) => any`
- 1.0.36 add judge function `isNotEmpty`, `slice`

## more

> we are committed to packaging each component separately as a library, providing more possibilities. If there are more needs, please issue the author in a timely manner
