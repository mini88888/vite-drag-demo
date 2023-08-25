import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import compose from './compose'
import type { CanvasStyleData, componentItem, Style } from '@/types'

export const useStore = defineStore('store', () => {
  // 编辑器模式 edit/preview
  const editMode = ref<string>('edit')

  // 当前组件
  let curComponent = reactive<componentItem>({})
  let curComponentIndex = ref<number>(-1)

  // 画布组件样式
  const canvasStyleData = reactive<CanvasStyleData>({
    width: 1200,
    height: 740,
    scale: 100,
    color: '#000',
    opacity: 1,
    background: '#fff',
    fontSize: 14,
  })

  // 画布组件数据
  const componentData = reactive<componentItem[]>([])

  // 添加组件
  const addComponent = (component: componentItem) => {
    componentData.push(component)
  }

  // 标记当前组件
  const setCurComponent = ({ component, index }: { component: componentItem, index: number }) => {
    curComponent = component
    curComponentIndex.value = index
  }


  // 设置组件样式
  const setShapeStyle = ({ top, left, width, height, rotate }: Style) => {
    // console.log('curComponent', curComponent);

    if (top !== undefined) curComponent.style.top = Math.round(top)
    if (left !== undefined) curComponent.style.left = Math.round(left)
    if (width) curComponent.style.width = Math.round(width)
    if (height) curComponent.style.height = Math.round(height)
    if (rotate) curComponent.style.rotate = Math.round(rotate)
  }

  return {
    ...compose,
    editMode,
    canvasStyleData,
    componentData,
    addComponent,
    setCurComponent,
    setShapeStyle
  }
})