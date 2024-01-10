import { ref } from "vue";
import type { componentItem } from '@/types'

// 画布组件数据
export const componentData = ref<componentItem[]>([])
// 当前组件
export const curComponent = ref<componentItem | null>()
export const curComponentIndex = ref<number>(-1)

// export default {
//   componentData,
//   curComponent,
//   curComponentIndex
// }