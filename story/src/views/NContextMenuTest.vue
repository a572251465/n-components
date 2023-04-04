<script lang="ts" setup>
import { NContextMenu, IDataField } from "../../../packages/n-context-menu";
import "../../../packages/n-context-menu/styles/var.css";
import "../../../packages/n-context-menu/styles/index.less";
import { ref } from "vue";
const showFlag = ref<boolean>(false);

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
</script>

<template>
  <div class="context-menu-test">
    <n-context-menu v-model="showFlag" :data="data" trigger="click">
      <button>点击测试 n-context-menu</button>
    </n-context-menu>
  </div>
</template>

<style lang="less" scoped>
.context-menu-test {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
