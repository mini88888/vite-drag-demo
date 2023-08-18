<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/store/type'

interface Props {
  active?: boolean
  element: componentItem
}
const props = withDefaults(defineProps<Props>(), {
  active: true,
  element: {}
})

const isActive = computed(() => props.active && !props.element?.isLock)
const getPointList = () => {}
const { canvasStyleData } = useStore()
</script>

<template>
  <div :class="active">
    <div v-for="item in (isActive ? getPointList() : [])"
         :key="item"
         class="shape-point"
         :style="getPointStyle(item)"
         @mousedown="handleMouseDownOnPoint(item, $event)">
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
</style>