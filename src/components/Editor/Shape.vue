<script setup lang="ts">
import { computed, withDefaults, onMounted, reactive } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/store/type'
import { mod360 } from '@/utils'
import { storeToRefs } from 'pinia'

interface Props {
  active: boolean
  element: componentItem
  defaultStyle: Record<string, any>
  index: number
}
const props = withDefaults(defineProps<Props>(), {
  active: false,
  element: {},
  defaultStyle: {},
  index: 0
})

const store = useStore()

const isActive = computed(() => props.active && !props.element?.isLock)

// 选中组件
const selectCurComponent = (e: HTMLElement) => {
  // 阻止向父组件冒泡
  e.stopPropagation()
  e.preventDefault()
}

let cursors = reactive<Record<string, any>>({})

// 组件移动
const handleMouseDownOnShape = (e: MouseEvent) => {
  // console.log('handleMouseDownOnShape', e);
  store.setClickComponentStatus(true)
  e.stopPropagation()

  store.setCurComponent({
    component: props.element,
    index: props.index
  })

  if (props.element.isLock) return

  cursors = getCursor() // 根据旋转角度获取光标位置

  const { defaultStyle } = props
  const pos = { ...defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top)
  const startLeft = Number(pos.left)

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent: MouseEvent) => {
    // console.log('move', moveEvent);
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY

    pos.top = curY - startY + startTop
    pos.left = curX - startX + startLeft
    store.setShapeStyle(pos)
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

// 旋转处理
const handleRotate = () => {}

const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'] // 八个方向
const pointList2 = ['r', 'l'] // 左右两个方向
const getPointList = () => {
  return props.element.component === 'line-shape' ? pointList2 : pointList
}
const handleMouseDownOnPoint = () => {}
const getPointStyle = (point) => {
  const { width, height } = props.defaultStyle
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  const style = {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors[point]
  }

  return style
}

const initialAngle = {
  // 每个点对应的初始角度
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315
}
const angleToCursor = [
  // 每个范围的角度对应的光标
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' }
]
const getCursor = () => {
  const rotate = mod360(store.curComponent.style.rotate) // 取余 360
  const result = {}
  let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

  pointList.forEach((point) => {
    const angle = mod360(initialAngle[point] + rotate)
    const len = angleToCursor.length
    while (true) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point] = 'nw-resize'
        return
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point] = angleLimit.cursor + '-resize'
        return
      }
    }
  })

  return result
}
</script>

<template>
  <div :class="active ? 'select-none outline outline-1 outline-[#70c0ff]' : ''"
       class="absolute hover:cursor-move text-[14px]"
       @click="selectCurComponent"
       @mousedown="handleMouseDownOnShape">
    <span v-show="isActive"
          class="iconfont icon-xuanzhuan text-[20px] color-[#59c7f9] absolute top-[-34px] left-[50%] m-l-[-10px]"
          @mousedown="handleRotate"></span>
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