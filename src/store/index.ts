import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import compose from './compose'
import type { CanvasStyleData, componentItem } from '@/types'

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

  return {
    ...compose,
    editMode,
    canvasStyleData,
    componentData,
    addComponent,
  }
})