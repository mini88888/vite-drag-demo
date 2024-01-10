import { ref } from 'vue'
import { curComponent, componentData } from './state'
import { setCurComponent, setComponentData } from './components'
import { deepCopy } from '@/utils'
import type { componentItem } from '@/types'


const snapshotData = ref<any[]>([]) // 编辑器快照数据
const snapshotIndex = ref<number>(-1) // 快照索引

// 设置画布默认数据 https://github.com/woai3c/visual-drag-demo/issues/92
let defaultcomponentData = ref<componentItem[]>([])
function getDefaultcomponentData() {
  return JSON.parse(JSON.stringify(defaultcomponentData.value))
}

export const undo = () => {
  if (snapshotIndex.value >= 0) {
    snapshotIndex.value--
    const componentData = deepCopy(snapshotData.value[snapshotIndex.value]) || getDefaultcomponentData()
    if (curComponent) {
      // 如果当前组件不在 componentData 中，则置空
      const needClean = !componentData.find((component: componentItem) => curComponent.value?.id === component.id)

      if (needClean) {
        setCurComponent({
          component: null,
          index: -1,
        })
      }
    }
    setComponentData(componentData)
  }
}
export const redo = () => {
  if (snapshotIndex.value < snapshotData.value.length - 1) {
    snapshotIndex.value++
    setComponentData(deepCopy(snapshotData.value[snapshotIndex.value]))
  }
}

export const recordSnapshot = () => {
  // 添加新的快照
  snapshotData.value[++snapshotIndex.value] = deepCopy(componentData.value)
  // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
  if (snapshotIndex.value < snapshotData.value.length - 1) {
    snapshotData.value = snapshotData.value.slice(0, snapshotIndex.value + 1)
  }
}