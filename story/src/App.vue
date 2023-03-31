<script setup lang="ts">
import NWrapperTest from "@/views/NWrapperTest.vue";
import { NWrapper } from "../../packages/n-wrapper";
</script>

<template>
  <n-wrapper :class-names="['test1']">
    <NWrapperTest />
    <hr />
  </n-wrapper>
</template>

<style scoped></style>
