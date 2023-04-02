## n-wrapper

事件代理 vue 组件

> 当实际的业务中出现类似`Tooltip`组件的话，需要点击 window/ document 来隐藏。此组件`n-wrapper` 可以代替 window 来接受事件冒泡，从而告诉你何种事件被触发，决定权在您手中。避免过度的事件绑定在 window 上

简体中文 | [English](https://github.com/a572251465/n-components/blob/main/packages/n-wrapper/README-en.md)

### 下载

```shell
npm install @lihh/n-wrapper -S
```

```shell
yarn add @lihh/n-wrapper -S
```

```shell
pnpm install @lihh/n-wrapper -S
```

### 使用实例

#### n-wrapper 位置

> 需要将组件`n-wrapper` 包括在最外层，来接受事件冒泡

```vue
<script lang="ts" setup>
import { NWrapper } from "@lihh/n-wrapper";
</script>

<template>
  <n-wrapper>
    <!--  此处是root 组件。   -->
  </n-wrapper>
</template>
```

#### TS 版本 使用实例

```vue
<script lang="ts" setup>
import { ref, inject, onUnmounted } from "vue";
import {
  IWrapperInjectFn,
  IWrapperInjectFnParams,
  wrapperProvideKey,
} from "@lihh/n-wrapper";

const clickCallback = (args: IWrapperInjectFnParams) => {
  if (args[0] === "click") {
    showFlag.value = false;
  }
};

const [installFn, unInstallFn] = inject<IWrapperInjectFn>(wrapperProvideKey)!;
installFn(clickCallback);

const showFlag = ref(false);
onUnmounted(() => {
  unInstallFn(clickCallback);
});
</script>

<template>
  <div class="n-wrapper-test">
    <div @click.stop="showFlag = true" role="button" class="button">
      <span>点击 测试n-wrapper</span>
    </div>
    <div v-show="showFlag" class="dialog" @click="showFlag = false"></div>
  </div>
</template>
```

#### JS 版本 使用实例

```vue
<script setup>
import { ref, inject, onUnmounted } from "vue";
import { IWrapperInjectFn, wrapperProvideKey } from "@lihh/n-wrapper";

const clickCallback = (args) => {
  if (args[0] === "click") {
    showFlag.value = false;
  }
};

const [installFn, unInstallFn] = inject(wrapperProvideKey);
installFn(clickCallback);

const showFlag = ref(false);
onUnmounted(() => {
  unInstallFn(clickCallback);
});
</script>

<template>
  <div class="n-wrapper-test">
    <div @click.stop="showFlag = true" role="button" class="button">
      <span>点击 测试n-wrapper</span>
    </div>
    <div v-show="showFlag" class="dialog" @click="showFlag = false"></div>
  </div>
</template>
```

### 导出类型

```ts
export type IFn<T = any> = (...args: T[]) => any;
export type IWrapperInstallFn = (fn: IFn<IWrapperInjectFnParams>) => void;
export type IWrapperUninstallFn = (fn: IFn) => void;
export type IWrapperInjectFnParams = [string, Event];
// inject的结果
export type IWrapperInjectFn = {
  installFn: IWrapperInstallFn;
  unInstallFn: IWrapperUninstallFn;
};
// 提供的provideKey
export const wrapperProvideKey = Symbol() as InjectionKey<IWrapperInjectFn>;
// 组件类型
export const WrapperProps = {
  eventNames: {
    type: Array as PropType<string[]>,
    default: ["click"],
  },
  classNames: {
    type: Array as PropType<string[]>,
    default: [],
  },
};
```

### 组件类型

| 属性       | 描述           | 类型  | 默认值    |
| ---------- | -------------- | ----- | --------- |
| eventNames | 冒泡响应的事件 | Array | ["click"] |
| classNames | 组件 样式      | Array | []        |

## 更新记录

- 1.0.1 版本第一次发布
- 1.0.2 修改 README 中提示文字
- 1.0.3 将 inject 方法的返回值进行修改。`const poll = inject(wrapperProvideKey);` => `const [installFn, unInstallFn] = inject(wrapperProvideKey);` 对象转换数组

## 更多

> 致力于将每个组件单独打包为库，提供更多的可能性，如果有更多的需求请及时 issue 作者。
