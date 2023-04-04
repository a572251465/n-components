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

## update records

- 1.0.1 first publish

## more

> we are committed to packaging each component separately as a library, providing more possibilities. If there are more needs, please issue the author in a timely manner
