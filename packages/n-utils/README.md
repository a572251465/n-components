## n-utils

提供常用的方法

简体中文 | [English](https://github.com/a572251465/n-components/blob/main/packages/n-utils/README-en.md)

### 下载

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
- [isBlankEmpty](#isBlankEmpty)
- [valueOrDefault](#valueOrDefault)
- [other api](#simple-api)

#### flattenJoinSymbol

使用案例

```js
import { flattenJoinSymbol } from "@lihh/n-utils";

// [1,2,3,4] => 1-2-3-4
flattenJoinSymbol([1, 2, 3, 4], "-");
// [1, [2, 3]] => 1-2-3-4
flattenJoinSymbol([1, [2, 3]], "-");
// [1, 2, [3, 4, [5]]] => 1-2-3-4-5
flattenJoinSymbol([1, [2, 3]], "-");
```

类型

```ts
export type flattenJoinSymbol<T> = {
  (values: (T | T[])[], symbol = "-"): string;
};
```

#### addPrefix

使用案例

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

类型

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

使用案例

```js
import { getTypes } from "@lihh/n-utils";
// []
getTypes();
// ["number"]
getTypes(1);
// ["boolean", "string"]
getTypes([true, "11"]);
```

类型

```ts
export type getTypes = {
  (value: unknown | unknown[]): string[];
};
```

#### isFullObject

> 非空对象 && 是否满足某些属性存在。

##### field

- value 判断的对象，必须输入
- fields 存在的属性，必须是数组，但是不一定要存在
- isAll 是否要满足 fields 中的值 在对象 value 中存在

使用案例

```js
import { isFullObject } from "@lihh/n-utils";

const info = { nam: "lihh", age: 20, address: "info" };
console.log(isFullObject(info)); // true
console.log(isFullObject(info, ["test"])); // false
console.log(isFullObject(info, ["age"])); // true
console.log(isFullObject(info, ["age"], true)); // true
console.log(isFullObject(info, ["age,", "age1"], true)); // false
```

类型

```ts
export type isFullObject = (
  value: Record<string, unknown>,
  fields?: string[],
  isAll?: boolean
) => boolean;
```

#### equals

使用案例

```js
import { equals } from "@lihh/n-utils";

console.log(equals(1, 1, 2)); // false
console.log(equals({}, [], [])); // false
const a = {};
console.log(equals(a, a, a)); // true
console.log(equals("200", 200, 200)); // true
console.log(equals(null, undefined)); // true
```

类型

```ts
type equals = (...args: unknown[]) => boolean;
```

#### slice

如果有符号存在，被截取的部分跟符号一致才会截取，反之不截取。
如果没有符号存在，功能类似于 String.prototype.slice

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

#### isBlankEmpty

```js
import { isBlankEmpty } from "@lihh/n-utils";
// true
isBlankEmpty(null);
// true
isBlankEmpty(undefined);
// true
isBlankEmpty("");
// true    isEmpty(0) === false
isBlankEmpty(0);
```

#### valueOrDefault

- use

```js
import { valueOrDefault, isBlankEmpty } from "@lihh/n-utils";
// 1
valueOrDefault("", "1");
// 10
valueOrDefault(10, 20);
// 0
valueOrDefault(0, 10);
// 10
valueOrDefault(0, 10, isBlankEmpty);
```

- type

```ts
type valueOrDefault = <T>(
  value: T,
  replaceValue: T,
  judgeFn = isEmpty
) => boolean;
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

## 更新记录

> 无版本说明, 更新 README file

- 1.0.1 版本第一次发布
- 1.0.2 添加判断方法 `addPrefix`, `isArray`, `isEmpty`, `isEmptyObject`, `isEmptyString`, `isFunction`, `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isString`, `isUndefined`, `getTypes`
- 1.0.11 添加判断方法 `isDate`, `isError`, `isFormData`, `isMath`, `isRegExp`, `isSymbol`, `isMap`, `isSet`
- 1.0.32 添加判断方法 `isFullObject`
- 1.0.34 添加判断方法 `equals`
- 1.0.35 添加返回类型 `(value: unknown): boolean` => `(value: unknow): value is (...args: any[]) => any`
- 1.0.36 添加判断方法 `isNotEmpty`, `slice`
- 1.0.37 添加判断方法 `isBlankEmpty`, `valueOrDefault`

## 更多

> 致力于将每个组件单独打包为库，提供更多的可能性，如果有更多的需求请及时 issue 作者。
