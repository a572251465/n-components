<script lang="ts" setup>
import { ref, inject } from "vue";
import {
  IFn,
  IWrapperInjectFn,
  IWrapperInjectFnParams,
  wrapperProvideKey,
} from "../../../packages/n-wrapper";

const cilckCallback = (args: IWrapperInjectFnParams) => {
  if (args[0] === "click") {
    showFlag.value = false;
  }
};

const fnPool = inject<IWrapperInjectFn>(wrapperProvideKey)!;
fnPool(cilckCallback);

const showFlag = ref(false);
</script>

<template>
  <div class="n-wrapper-test">
    <div @click.stop="showFlag = true" role="button" class="button">
      <span>点击 测试n-wrapper</span>
    </div>
    <div v-show="showFlag" class="dialog" @click="showFlag = false"></div>
  </div>
</template>

<style lang="less" scoped>
.n-wrapper-test {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: relative;

  & > .button {
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    &:active {
      background: #ccc;
    }
  }
  & > .dialog {
    position: absolute;
    left: 45%;
    top: 70px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px #ccc;
    width: 200px;
    height: 200px;
    background: #888888;
    cursor: pointer;
  }
}
</style>
