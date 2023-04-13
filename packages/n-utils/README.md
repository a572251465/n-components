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

#### isArray

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

#### isFunction

#### isNull

#### isNumber

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

#### isString

#### isUndefined

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

## 更新记录
> 无版本说明, 更新 README file

- 1.0.1 版本第一次发布
- 1.0.2 添加判断方法 `addPrefix`, `isArray`, `isEmpty`, `isEmptyObject`, `isEmptyString`, `isFunction`, `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isString`, `isUndefined`, `getTypes`

## 更多

> 致力于将每个组件单独打包为库，提供更多的可能性，如果有更多的需求请及时 issue 作者。
