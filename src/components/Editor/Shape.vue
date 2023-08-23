<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/store/type'

interface Props {
  active?: boolean
  element: componentItem
  defaultStyle:Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  active: true,
  element: {},
  defaultStyle: {}
})

const isActive = computed(() => props.active && !props.element?.isLock)
const getPointList = () => {}
const { canvasStyleData, setShapeStyle } = useStore()

// 组件移动
const handleMouseDownOnShape = (e:HTMLElement)=>{
  console.log('handleMouseDownOnShape', e);
  e.stopPropagation()

  const { defaultStyle } = props;
  console.log(defaultStyle);
  const pos = { ...defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top)
  const startLeft = Number(pos.left)

  
  
  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent:HTMLElement)=>{
    console.log('move', e);
    hasMove = true;
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    pos.top = curY - startY + startTop
    pos.left = curX - startX + startLeft
    setShapeStyle(pos)
  }

  const up = ()=>{
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

</script>

<template>
  <div 
  :class="active" 
  class="absolute hover:cursor-move"
  @mousedown="handleMouseDownOnShape">
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