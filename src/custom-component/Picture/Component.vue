<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '@/store'

interface Props {
  element: componentItem
}

const props = defineProps<Props>()

const store = useStore()

const canvas = ref<HTMLDivElement>(null)
const drawImage = () => {
  const { width, height } = props.element
  canvas.value.width = width
  canvas.value.height = height
}

onMounted(() => {
  drawImage()
})
</script>

<template>
  <div class="overflow-hidden">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>