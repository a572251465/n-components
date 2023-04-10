## n-context-menu

模拟鼠标右击，弹出功能菜单事件

> 当需要自定义`contextmenu` 的时候，这个组件将是一个不错的选择，同时支持`contextmenu`, `click` 事件触发

简体中文 | [English](https://github.com/a572251465/n-components/blob/main/packages/n-context-menu/README-en.md)

### 下载

```shell
npm install @lihh/n-context-menu -S
```

```shell
yarn add @lihh/n-context-menu -S
```

```shell
pnpm install @lihh/n-context-menu -S
```

### 使用实例

> 为了更好的绑定事件优化，当点击组件以外的任何地方来取消组件，默认支持`@lihh/n-wrapper` . 具体参数组件`@lihh/n-wrapper`

#### 传递数据 显示组件

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

#### 自定义 panel slot，来展示数据

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

### 导出类型

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

### 组件类型

| 属性                | 描述                         | 类型                        | 默认值            | 选项               | 版本  |
| ------------------- | ---------------------------- | --------------------------- | ----------------- | ------------------ | ----- |
| v-model/ modelValue | 弹出是否显示                 | boolean                     | false             | -                  | 1.0.1 |
| trigger             | 以何种方式触发组件显示       | string                      | click             | click/contextmenu  | 1.01  |
| data                | 传递显示的数据               | IDataField[]                | []                | -                  | 1.01  |
| appendToBody        | 是否将组件添加到 body 的子级 | boolean                     | false             | -                  | 1.01  |
| slotGap             | 组件距离 默认 slot 距离      | number                      | 5                 | -                  | 1.01  |
| destroyOnClose      | 关闭的时候 是否销毁 dom      | boolean                     | false             | -                  | 1.01  |
| leaveAutoClose      | 悬浮离开组件 是否自动关闭    | boolean                     | true              | -                  | 1.01  |
| position            | 可以控制组件的显示位置       | {top: number, left: number} | {top: 0, left: 0} | -                  | 1.01  |
| align               | 文字对齐方式                 | string                      | left              | left/center/ right | 1.01  |
| minWidth            | 组件显示最小宽度             | number                      | 100               | -                  | 1.01  |
| zIndex              | 组件悬浮层级                 | number                      | 10                | -                  | 1.01  |
| showArrow           | 是否显示箭头                 | boolean                     | true              | -                  | 1.01  |

### 事件

| 属性        | 描述                | 回调参数   | 版本  |
| ----------- | ------------------- | ---------- | ----- |
| on-cancel   | 弹框关闭触发事件    | -          | 1.0.1 |
| on-selected | 当选中数据 触发回调 | IDataField | 1.01  |

### `IDataField` 参数

| 属性     | 描述                   | 是否必须 | 版本  |
| -------- | ---------------------- | -------- | ----- |
| value    | 类似于 id 值，必须唯一 | 是       | 1.0.1 |
| label    | 显示内容               | 是       | 1.01  |
| isShow   | 是否显示               | 不是     | 1.01  |
| disabled | 是否禁止点击           | 不是     | 1.01  |

### 插槽

| 名称    | 描述                                                 |
| ------- | ---------------------------------------------------- |
| default | 包裹的触发元素                                       |
| panel   | 展示列表 注：跟`data` 不同时存在，插槽的优先级更高 |

## 更新记录

- 1.0.1 版本第一次发布

## 更多

> 致力于将每个组件单独打包为库，提供更多的可能性，如果有更多的需求请及时 issue 作者。
