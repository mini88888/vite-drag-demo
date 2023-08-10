<script setup lang="ts">
import { reactive } from 'vue'
import Grid from '@/components/Editor/Grid.vue'
import { changeStyleSizeScale } from '@/utils'

const getCanvasStyle = ()=>{}
const canvasStyleData = reactive({
  width: 1200,
  height: 768
})
</script>

<template>
  <div 
    class="relative"
    :style="{
      ...getCanvasStyle(canvasStyleData),
      width: changeStyleSizeScale(canvasStyleData.width) + 'px',
      height: changeStyleSizeScale(canvasStyleData.height) + 'px',
    }">
    <!-- 网格线 -->
    <Grid />
  </div>
</template>

<style scoped>

</style>