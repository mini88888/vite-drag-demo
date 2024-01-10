
import { curComponent, curComponentIndex, componentData } from './state'
import type { componentItem } from '@/types'

// 标记当前组件
export const setCurComponent = ({ component, index }: { component: componentItem | null, index: number }) => {
  console.log('setCurComponent', component, index);

  curComponent.value = component
  curComponentIndex.value = index
}

export const setComponentData = (data = []) => {
  componentData.value = data
}