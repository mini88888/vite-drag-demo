<script setup lang="ts">
const { start, width, height } = defineProps<{
  start: Position
  width: number
  height: number
}>()
</script>

<template>
  <div :style="{
            left: start.x + 'px',
            top: start.y + 'px',
            width: width + 'px',
            height: height + 'px',
        }"
       class="border-color-#70c0ff absolute"></div>
</template>