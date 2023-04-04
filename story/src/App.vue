<script setup lang="ts">
import NWrapperTest from "@/views/NWrapperTest.vue";
import { NWrapper } from "../../packages/n-wrapper";
import NContextMenuTest from "@/views/NContextMenuTest.vue";
</script>

<template>
  <n-wrapper :class-names="['test1']">
    <NWrapperTest />
    <hr />
    <NContextMenuTest />
    <hr />
  </n-wrapper>
</template>

<style scoped></style>
