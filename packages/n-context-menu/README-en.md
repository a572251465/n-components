## n-wrapper

event proxy vue component

> When a component similar to `Tooltip` appears in the actual business, you need to click Window/Document to hide it. This component `n-wrapper` can accept event bubbles instead of window, thereby telling you which event is triggered and the decision is in your hands. Avoid excessive event binding on windows

English | [简体中文](https://github.com/a572251465/n-components/blob/main/packages/n-wrapper/README.md)

### install

```shell
npm install @lihh/n-wrapper -S
```

```shell
yarn add @lihh/n-wrapper -S
```

```shell
pnpm install @lihh/n-wrapper -S
```

### use example

#### n-wrapper use location

> The component `n-wrapper` needs to be included in the outermost layer to accept event bubbles

```vue
<script lang="ts" setup>
import { NWrapper } from "@lihh/n-wrapper";
</script>

<template>
  <n-wrapper>
    <!--  root component   -->
  </n-wrapper>
</template>
```

#### TS use example

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

const pool = inject<IWrapperInjectFn>(wrapperProvideKey)!;
pool.installFn(clickCallback);

const showFlag = ref(false);
onUnmounted(() => {
  pool.unInstallFn(clickCallback);
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

#### JS use example

```vue
<script setup>
import { ref, inject, onUnmounted } from "vue";
import { IWrapperInjectFn, wrapperProvideKey } from "@lihh/n-wrapper";

const clickCallback = (args) => {
  if (args[0] === "click") {
    showFlag.value = false;
  }
};

const pool = inject(wrapperProvideKey);
pool.installFn(clickCallback);

const showFlag = ref(false);
onUnmounted(() => {
  pool.unInstallFn(clickCallback);
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

### export types

```ts
export type IFn<T = any> = (...args: T[]) => any;
export type IWrapperInstallFn = (fn: IFn<IWrapperInjectFnParams>) => void;
export type IWrapperUninstallFn = (fn: IFn) => void;
export type IWrapperInjectFnParams = [string, Event];
export type IWrapperInjectFn = [IWrapperInstallFn, IWrapperUninstallFn];
export const wrapperProvideKey = Symbol() as InjectionKey<IWrapperInjectFn>;
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

### component type

| field      | desc                  | type  | value     | version |
| ---------- | --------------------- | ----- | --------- | ------- |
| eventNames | bubble response event | Array | ["click"] | 1.0.1   |
| classNames | component event       | Array | []        | 1.0.1   |

## update record

- 1.0.1 first publish
- 1.0.2 text modification in README
- 1.0.3 Modify the return value of the inject method。`const poll = inject(wrapperProvideKey);` => `const [installFn, unInstallFn] = inject(wrapperProvideKey);` Object conversion array
- 1.0.4 export type modification in README
- 1.0.5 component type add field【version】 in README

## more

> we are committed to packaging each component separately as a library, providing more possibilities. If there are more needs, please issue the author in a timely manner
