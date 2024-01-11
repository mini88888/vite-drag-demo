import { reactive, ref } from "vue"
import { $, decomposeComponent } from '@/utils'
import { Style, componentItem } from '@/types'

const editor = ref<Element | null>(null)

const getEditor = () => {
  console.log('getEditor', typeof $('#editor'))
  editor.value = $('#editor')
}

interface AreaData {
  style: Style,
  components: Array<componentItem>
}

const areaData = reactive<AreaData>({
  style: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  components: [],
})

const compose = () => {
  const components: Array<componentItem> = []
  areaData.components.forEach(component => {
    if (component.component != 'Group') {
      components.push(component)
    } else {
      // 如果要组合的组件中，已经存在组合数据，则需要提前拆分
      const parentStyle = { ...component.style }
      const subComponents = component.propValue
      const editorRect = (editor.value as HTMLElement)?.getBoundingClientRect()
      console.log('editorRect', editorRect);

      subComponents.forEach((component: componentItem) => {
        decomposeComponent(component, editorRect, parentStyle)
      })

      components.push(...component.propValue)
    }
  })

  const groupComponent = {
    id: generateID(),
    component: 'Group',
    label: '组合',
    icon: 'zuhe',
    ...commonAttr,
    style: {
      ...commonStyle,
      ...areaData.style,
    },
    propValue: components,
  }

  createGroupStyle(groupComponent)

  store.commit('addComponent', {
    component: groupComponent,
  })

  eventBus.$emit('hideArea')

  store.commit('batchDeleteComponent', areaData.components)
  store.commit('setCurComponent', {
    component: componentData[componentData.length - 1],
    index: componentData.length - 1,
  })

  areaData.components = []
}

export default {
  editor,
  getEditor,
  areaData,
  compose
}