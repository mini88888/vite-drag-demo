import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import compose from './compose'
import type { CanvasStyleData, componentItem, Style } from '@/types'

export const useStore = defineStore('store', () => {
  // 编辑器模式 edit/preview
  const editMode = ref<string>('edit')

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

  // 当前组件
  const curComponent = ref<componentItem>()
  const curComponentIndex = ref<number>()

  // 标记当前组件
  const setCurComponent = ({ component, index }: { component: componentItem, index: number }) => {
    curComponent.value = component
    curComponentIndex.value = index
  }

  // 设置组件样式
  const setShapeStyle = ({ top, left, width, height, rotate }: Style) => {
    // console.log('curComponent', curComponent);
    let style: Record<string, any> = {}
    if (top !== undefined) style.top = Math.round(top)
    if (left !== undefined) style.left = Math.round(left)
    if (width) style.width = Math.round(width)
    if (height) style.height = Math.round(height)
    if (rotate) style.rotate = Math.round(rotate)
    Object.assign((curComponent.value as componentItem).style, style)
  }

  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  const isClickComponent = ref<boolean>(false)
  const setClickComponentStatus = (status: boolean) => {
    isClickComponent.value = status
  }

  return {
    ...compose,
    editMode,
    canvasStyleData,
    componentData,
    curComponent,
    isClickComponent,
    addComponent,
    setCurComponent,
    setShapeStyle,
    setClickComponentStatus
  }
})