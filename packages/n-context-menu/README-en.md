## n-context-menu

Simulate right mouse click to pop up function menu event

> When you need to customize the 'contextmenu' event, this component will be a good choice, while supporting the triggering of 'contextmenu' and 'click' events

English | [简体中文](https://github.com/a572251465/n-components/blob/main/packages/n-context-menu/README.md)

### Install

```shell
npm install @lihh/n-context-menu -S
```

```shell
yarn add @lihh/n-context-menu -S
```

```shell
pnpm install @lihh/n-context-menu -S
```

### Using

> For better binding event optimization, when clicking anywhere outside the component to cancel it, the default support is' @ lihh/n wrapper ' Specific parameter components' @ lihh/n wrapper '. Just add the component '@ lihh/n wrapper'Transfer data display components' wrapped on the outermost side

#### import styles

> file`var.css` Store some variables. If you want to customize colors, you can overwrite the variables or implement them again

```ts
import "@lihh/n-context-menu/styles/var.css";
import "@lihh/n-context-menu/styles/index.css";
```

#### Transfer Data Display Component

```vue
<script lang="ts" setup>
import { IDataField, NContextMenu } from "@lihh/n-context-menu";
import { ref } from "vue";

const data: IDataField[] = [
  {
    label: "添加组",
    value: "1",
  },
  {
    label: "重命令",
    value: "2",
    disabled: true,
  },
  {
    label: "删除",
    value: "3",
  },
];
const showFlag = ref(false);
</script>

<template>
  <n-context-menu v-model="showFlag" :data="data" trigger="click">
    <button>点击测试 n-context-menu</button>
  </n-context-menu>
</template>
```

#### Customize panel slots to display data

```vue
<script lang="ts" setup>
import { IDataField, NContextMenu } from "@lihh/n-context-menu";
import { ref } from "vue";

const data: IDataField[] = [
  {
    label: "添加组",
    value: "1",
  },
  {
    label: "重命令",
    value: "2",
    disabled: true,
  },
  {
    label: "删除",
    value: "3",
  },
];
const showFlag = ref(false);
</script>

<template>
  <n-context-menu v-model="showFlag">
    <button>右击测试 n-context-menu</button>
    <template #panel>
      <ul>
        <li v-for="item in data" :key="item.value">{{ item.label }}</li>
      </ul>
    </template>
  </n-context-menu>
</template>
```

### export type

```ts
export type IDataField = {
  value: string;
  label: string;
  isShow?: boolean;
  disabled?: boolean;
};

export const contextMenuProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String as PropType<"contextmenu" | "click">,
    default: "contextmenu",
    validator: (value: string) => ["contextmenu", "click"].includes(value),
  },
  data: {
    type: Array as PropType<IDataField[]>,
    default: [],
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  slotGap: {
    type: Number,
    default: 5,
    validator: (value: number) => isPropNumber(value),
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  leaveAutoClose: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object as PropType<{ top: number; left: number }>,
    default: () => ({ top: 0, left: 0 }),
  },
  align: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
    validator: (value: string) => ["left", "center", "right"].includes(value),
  },
  minWidth: {
    type: Number,
    default: 100,
    validator: (value: number) => isPropNumber(value),
  },
  zIndex: {
    type: Number,
    default: 10,
    validator: (value: number) => isPropNumber(value),
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
};
```

### component type

| field               | desc                                                        | type                        | default value     | option             | version |
| ------------------- | ----------------------------------------------------------- | --------------------------- | ----------------- | ------------------ | ------- |
| v-model/ modelValue | Is the pop-up displayed                                     | boolean                     | false             | -                  | 1.0.1   |
| trigger             | How to trigger component display                            | string                      | click             | click/contextmenu  | 1.01    |
| data                | ransferring displayed data                                  | IDataField[]                | []                | -                  | 1.01    |
| appendToBody        | Do you want to add the component to the child of the body   | boolean                     | false             | -                  | 1.01    |
| slotGap             | Distance from component to default slot                     | number                      | 5                 | -                  | 1.01    |
| destroyOnClose      | Do you want to destroy the dom when closing it              | boolean                     | false             | -                  | 1.01    |
| leaveAutoClose      | Does the suspension leave the component automatically close | boolean                     | true              | -                  | 1.01    |
| position            | Can control the display position of components              | {top: number, left: number} | {top: 0, left: 0} | -                  | 1.01    |
| align               | text alignment                                              | string                      | left              | left/center/ right | 1.01    |
| minWidth            | Minimum width of component display                          | number                      | 100               | -                  | 1.01    |
| zIndex              | Component suspension level                                  | number                      | 10                | -                  | 1.01    |
| showArrow           | Show arrows or not                                          | boolean                     | true              | -                  | 1.01    |

### event

| name        | desc                                     | callback params | version |
| ----------- | ---------------------------------------- | --------------- | ------- |
| on-cancel   | Trigger event for closing the pop-up box | -               | 1.0.1   |
| on-selected | Selected data triggers callback          | IDataField      | 1.01    |

### `IDataField` params

| name     | desc                                       | required | version |
| -------- | ------------------------------------------ | -------- | ------- |
| value    | Similar to the id value, it must be unique | yes      | 1.0.1   |
| label    | dispaly content                            | yes      | 1.01    |
| isShow   | Display or not                             | no       | 1.01    |
| disabled | Prohibit clicking                          | no       | 1.01    |

### slot

| name    | desc                                                                                  |
| ------- | ------------------------------------------------------------------------------------- |
| default | Trigger elements of packages                                                          |
| panel   | Display list note: Does not exist simultaneously with `data`, slot priority is higher |

## update record

- 1.0.1 first publish
- 1.0.2 build context-menu ts file

## more

> we are committed to packaging each component separately as a library, providing more possibilities. If there are more needs, please issue the author in a timely manner
