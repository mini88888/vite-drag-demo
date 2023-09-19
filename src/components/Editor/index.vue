<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Grid from './Grid.vue'
import Shape from './Shape.vue'
import { changeStyleSizeScale } from '@/utils'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getStyle, getShapeStyle } from '@/utils'
import type { Style } from '@/types'

const store = useStore()

const {
  curComponent,
  componentData,
  canvasStyleData // 画布样式
} = storeToRefs(store)

// const {  } = useStore()

const svgFilterAttrs = ['width', 'height', 'top', 'left', 'rotate']

// SVG样式
const getCanvasStyle = () => {}

// 组件样式
const getComponentStyle = (style: Style) => {
  return getStyle(style, svgFilterAttrs)
}

// 组件移动
const handleMouseDown = (e: HTMLElement) => {}

onMounted(() => {
  // 获取编辑器元素
  store.getEditor()
})
</script>

<template>
  <div id="editor"
       class="relative m-auto"
       :style="{
      ...getCanvasStyle(canvasStyleData),
      width: changeStyleSizeScale(canvasStyleData.width) + 'px',
      height: changeStyleSizeScale(canvasStyleData.height) + 'px',
    }"
       @mousedown="handleMouseDown">
    <!-- 网格线 -->
    <Grid />
    <!-- 页面组件展示 -->
    <Shape v-for="(item, index) in componentData"
           :key="item.id"
           :element="item"
           :style="getShapeStyle(item.style)"
           :defaultStyle="item.style"
           :active="item.id === (curComponent || {})?.id"
           :index="index"
           :class="{ lock: item.isLock }">
      <component class="wh-full flex-y-center"
                 :is="item.component"
                 :element="item"
                 :style="getComponentStyle(item.style)" />
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