import { defineStore } from "pinia";
import { swap, toast } from '@/utils'
import { reactive, ref } from "vue";
import compose from './compose'
import layer from './layer'
import * as components from './components'
import * as snapshot from './snapshot'
import * as lock from './lock'
import * as animation from './animation'
import type { CanvasStyleData, componentItem, Style } from '@/types'

export const useStore = defineStore('store', () => {
  const { componentData, curComponent, curComponentIndex } = components

  // 编辑器模式 edit/preview
  const editMode = ref<string>('edit')

  const setEditMode = (mode: string) => {
    editMode.value = mode
  }

  // 画布组件样式
  let canvasStyleData = reactive<CanvasStyleData>({
    width: 1200,
    height: 740,
    scale: 100,
    color: '#000',
    opacity: 1,
    background: '#fff',
    fontSize: 14,
  })

  // 上移图层
  const upComponent = () => {
    // 上移图层 index，表示元素在数组中越往后
    if (curComponentIndex.value < componentData.value.length - 1) {
      swap(componentData.value, curComponentIndex.value, curComponentIndex.value + 1)
      curComponentIndex.value = curComponentIndex.value + 1
    } else {
      toast('已经到顶了')
    }
  }

  // 下移图层
  const downComponent = () => {
    // 下移图层 index，表示元素在数组中越往前
    if (curComponentIndex.value > 0) {
      swap(componentData.value, curComponentIndex.value, curComponentIndex.value - 1)
      curComponentIndex.value = curComponentIndex.value - 1
    } else {
      toast('已经到底了')
    }
  }

  // 设置组件样式
  const setShapeStyle = ({ top, left, width, height, rotate }: Style) => {
    // console.log('curComponent', curComponent);
    let style: Record<string, any> = {}
    if (top !== undefined) style.top = Math.round(top as number)
    if (left !== undefined) style.left = Math.round(left as number)
    if (width) style.width = Math.round(width as number)
    if (height) style.height = Math.round(height as number)
    if (rotate) style.rotate = Math.round(rotate as number)
    Object.assign((curComponent.value as componentItem).style, style)
  }

  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  const isClickComponent = ref<boolean>(false)
  const setClickComponentStatus = (status: boolean) => {
    isClickComponent.value = status
  }


  const setCanvasStyle = (style: CanvasStyleData, state: any) => {
    console.log('state', state);

    canvasStyleData = style
  }

  // 通过json设置组件
  const aceSetcurComponent = (compJSON: any) => {
    for (let i = 0; i < componentData.value.length; i++) {
      if (componentData.value[i].id === compJSON.id) {
        componentData.value.splice(i, 1)
      }
    }
    componentData.value.push(compJSON)
    curComponent.value = compJSON
  }


  return {
    ...components,
    ...layer,
    ...compose,
    ...snapshot,
    ...lock,
    ...animation,
    editMode,
    canvasStyleData,
    curComponent,
    curComponentIndex,
    isClickComponent,
    upComponent,
    downComponent,
    setShapeStyle,
    setCanvasStyle,
    aceSetcurComponent,
    setClickComponentStatus,
    setEditMode
  }
})