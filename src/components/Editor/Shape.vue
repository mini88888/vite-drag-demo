<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/store/type'

interface Props {
  active?: boolean
  element: componentItem
  defaultStyle:Record<string, any>,
  index: number
}
const props = withDefaults(defineProps<Props>(), {
  active: true,
  element: {},
  defaultStyle: {},
  index: 0
})

const isActive = computed(() => props.active && !props.element?.isLock)

const { canvasStyleData, setCurComponent, setShapeStyle } = useStore()

// 选中组件
const selectCurComponent = (e:HTMLElement)=>{
  // 阻止向父组件冒泡
  e.stopPropagation()
  e.preventDefault()
}

// 组件移动
const handleMouseDownOnShape = (e:HTMLElement)=>{
  // console.log('handleMouseDownOnShape', e);
  e.stopPropagation()
  setCurComponent({
    component: props.element,
    index: props.index
  })
  if (props.element.isLock) return

  const { defaultStyle } = props;
  const pos = { ...defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top)
  const startLeft = Number(pos.left)
  
  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent:HTMLElement)=>{
    // console.log('move', moveEvent);
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

// 旋转处理
const handleRotate = ()=>{

}
const getPointList = () => {}
const handleMouseDownOnPoint = () => {}
console.log('active', props.active);

</script>

<template>
  <div 
  :class="active ? 'select-none outline outline-1 outline-[#70c0ff]' : ''" 
  class="absolute hover:cursor-move text-[14px]"
  @click="selectCurComponent"
  @mousedown="handleMouseDownOnShape">
    <span v-show="isActive" class="iconfont icon-xiangyouxuanzhuan" @mousedown="handleRotate"></span>
    <div v-for="item in (isActive ? getPointList() : [])"
         :key="item"
         class="absolute bg-[#fff] w-[8px] h-[8px] rounded-[50%] border border-[#59c7f9] border-solid"
         :style="getPointStyle(item)"
         @mousedown="handleMouseDownOnPoint(item, $event)">
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
</style>