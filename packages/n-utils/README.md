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

## 更新记录

- 1.0.1 版本第一次发布

## 更多

> 致力于将每个组件单独打包为库，提供更多的可能性，如果有更多的需求请及时 issue 作者。
