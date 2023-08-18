<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Grid from './Grid.vue'
import Shape from './Shape.vue'
import { changeStyleSizeScale } from '@/utils'
import { useStore } from '@/store' 
import { getStyle } from '@/utils'
import type { Style } from '@/types'

const { 
  getEditor, 
  componentData, 
  canvasStyleData, // 画布样式
} = useStore()

const svgFilterAttrs = reactive<string[]>(['width', 'height', 'top', 'left', 'rotate'],)

// SVG样式
const getCanvasStyle = ()=>{}

// 组件样式
const getComponentStyle = (style:Style)=>{
  return getStyle(style, svgFilterAttrs)
}

onMounted(()=>{
  // 获取编辑器元素
  getEditor();
})
</script>

<template>
  <div 
    id="editor"
    class="relative"
    :style="{
      ...getCanvasStyle(canvasStyleData),
      width: changeStyleSizeScale(canvasStyleData.width) + 'px',
      height: changeStyleSizeScale(canvasStyleData.height) + 'px',
    }">
    <!-- 网格线 -->
    <Grid />
    <!--  -->
    <Shape 
      v-for="(item, index) in componentData"
      :element="item">
      <component 
        class="wh-full"
        :is="item.component"
        :element="item"
        :style="getComponentStyle(item.style)"
        />
      <!-- <component
        :is="item.component"
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyle(item.style)"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
        @input="handleInput" /> -->
    </Shape>
  </div>
</template>

<style scoped>

</style>