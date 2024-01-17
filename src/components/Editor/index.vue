<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import Grid from './Grid.vue'
import Shape from './Shape.vue'
import { changeStyleSizeScale, getComponentRotatedStyle } from '@/utils'
import eventBus from '@/utils/eventBus'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import {
  getStyle,
  getShapeStyle,
  getSVGStyle,
  getCanvasStyle,
  isPreventDrop
} from '@/utils'
import type { Style, componentItem } from '@/types'
import Area from './Area.vue'

const store = useStore()

const {
  curComponent,
  componentData,
  canvasStyleData, // 画布样式
  editor,
  areaData
} = storeToRefs(store)

const svgFilterAttrs = ['width', 'height', 'top', 'left', 'rotate']

// 组件样式
const getComponentStyle = (style: Style) => {
  return getStyle(style, svgFilterAttrs)
}

const isShowArea = ref<boolean>(false)
const editorX = ref<number>(0)
const editorY = ref<number>(0)
const width = ref<number>(0)
const height = ref<number>(0)
// 选中区域的起点
const start = reactive<{
  x: number
  y: number
}>({
  x: 0,
  y: 0
})

const hideArea = () => {
  isShowArea.value = 0
  width.value = 0
  height.value = 0
  store.setAreaData({
    style: {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    },
    components: []
  })
}

const getSelectArea = () => {
  const result: componentItem[] = []
  // 区域起点坐标
  const { x, y } = start
  // 计算所有的组件数据，判断是否在选中区域内
  componentData.value.forEach((component: componentItem) => {
    if (component.isLock) return

    const {
      left,
      top,
      width: W,
      height: H
    } = getComponentRotatedStyle(component.style)
    console.log(
      'getSelectArea',
      left,
      top,
      W,
      H,
      x,
      y,
      component,
      width.value,
      height.value,
      x <= left,
      y <= top,
      left + W <= x + width.value,
      top + H <= y + height.value
    )

    if (
      x <= left &&
      y <= top &&
      left + W <= x + width.value &&
      top + H <= y + height.value
    ) {
      console.log('result', component)

      result.push(component)
    }
  })
  // 返回在选中区域内的所有组件
  return result
}

const createGroup = () => {
  // 获取选中区域的组件数据
  const areaData = getSelectArea()
  if (areaData.length <= 1) {
    hideArea()
    return
  }

  // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
  // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
  let top = Infinity,
    left = Infinity
  let right = -Infinity,
    bottom = -Infinity
  areaData.forEach((component) => {
    let style = {}
    console.log('component', component)
    if (component.component == 'Group') {
      component.propValue.forEach((item) => {
        const rectInfo = $(`#component${item.id}`).getBoundingClientRect()
        style.left = rectInfo.left - editorX.value
        style.top = rectInfo.top - editorY.value
        style.right = rectInfo.right - editorX.value
        style.bottom = rectInfo.bottom - editorY.value

        if (style.left < left) left = style.left
        if (style.top < top) top = style.top
        if (style.right > right) right = style.right
        if (style.bottom > bottom) bottom = style.bottom
      })
    } else {
      style = getComponentRotatedStyle(component.style)
    }

    if (style.left < left) left = style.left
    if (style.top < top) top = style.top
    if (style.right > right) right = style.right
    if (style.bottom > bottom) bottom = style.bottom
  })

  start.x = left
  start.y = top
  width.value = right - left
  height.value = bottom - top
  console.log('createGroup', areaData)

  // 设置选中区域位移大小信息和区域内的组件数据
  store.setAreaData({
    style: {
      left,
      top,
      width: width.value,
      height: height.value
    },
    components: areaData
  })
}

// 组件移动
const handleMouseDown = (e: HTMLElement) => {
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!curComponent.value || isPreventDrop(curComponent.value.component)) {
    e.preventDefault()
  }

  hideArea()

  // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
  const rectInfo = editor.value.getBoundingClientRect()
  editorX.value = rectInfo.x
  editorY.value = rectInfo.y

  const startX = e.clientX
  const startY = e.clientY
  start.x = startX - editorX.value
  start.y = startY - editorY.value
  // 展示选中区域
  isShowArea.value = true

  const move = (moveEvent: MouseEvent) => {
    width.value = Math.abs(moveEvent.clientX - startX)
    height.value = Math.abs(moveEvent.clientY - startY)
    if (moveEvent.clientX < startX) {
      start.x = moveEvent.clientX - editorX.value
    }

    if (moveEvent.clientY < startY) {
      start.y = moveEvent.clientY - editorY.value
    }
  }

  const up = (e: MouseEvent) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)

    if (e.clientX == startX && e.clientY == startY) {
      hideArea()
      return
    }

    createGroup()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

onMounted(() => {
  // 获取编辑器元素
  store.getEditor()
  eventBus.on('hideArea', () => {
    hideArea()
  })
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
      <component v-if="item.component.startsWith('SVG')"
                 class="wh-full"
                 :is="item.component"
                 :id="'component' + item.id"
                 :style="getSVGStyle(item.style)"
                 :prop-value="item.propValue"
                 :element="item"
                 :request="item.request" />
      <component v-else
                 class="wh-full"
                 :is="item.component"
                 :id="'component' + item.id"
                 :element="item"
                 :prop-value="item.propValue"
                 :style="getComponentStyle(item.style)"
                 :request="item.request" />
    </Shape>
    <!-- 选中区域 -->
    <Area v-show="isShowArea"
          :start="start"
          :width="width"
          :height="height" />
  </div>
</template>

<style scoped>
</style>