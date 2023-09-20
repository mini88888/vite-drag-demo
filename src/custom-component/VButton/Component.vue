<script setup lang="ts">
import type { componentItem } from '@/type'

interface Props {
  element: componentItem
}

const props = defineProps<Props>()
</script>

<template>
  <button class="inline-block cursor-pointer outline-none border-[1px] border-solid border-[#ddd] text-center bg-[#fff] text-ms active:color-[#3a8ee6] active:border-[#3a8ee6] hover:color-[#3a8ee6] hover:bg-[#ecf5ff]">{{ props.element.propValue }}</button>
</template>

<style scoped></style>