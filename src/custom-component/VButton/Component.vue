<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/type'

interface Props {
  element: componentItem
}

const props = defineProps<Props>()

const store = useStore()
</script>

<template>
  <button class="inline-block cursor-pointer outline-none border-[1px] border-solid border-[#ddd] text-center bg-[#fff] text-ms active:color-[#3a8ee6] active:border-[#3a8ee6] hover:color-[#3a8ee6] hover:bg-[#ecf5ff]">{{ props.element.propValue }}</button>
</template>

<style scoped></style>