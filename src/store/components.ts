
import { ref } from "vue";
import type { componentItem } from '@/types'

// 画布组件数据
export const componentData = ref<componentItem[]>([])
// 当前组件
export const curComponent = ref<componentItem | null>()
export const curComponentIndex = ref<number>(-1)

// 标记当前组件
export const setCurComponent = ({ component, index }: { component: componentItem | null, index: number }) => {
  console.log('setCurComponent', component, index);

  curComponent.value = component
  curComponentIndex.value = index
}

export const setComponentData = (data = []) => {
  componentData.value = data
}

// 添加组件
export const addComponent = (component: componentItem) => {
  console.log('addComponent', component);

  componentData.value.push(component)
}

// 删除组件
export const deleteComponent = (index?: number) => {
  console.log('deleteComponent', index);

  if (index === undefined) {
    index = curComponentIndex.value
  }

  if (index == curComponentIndex.value) {
    curComponentIndex.value = -1
    curComponent.value = null
  }

  if (/\d/.test(`${index}`)) {
    componentData.value.splice(index, 1)
  }
}