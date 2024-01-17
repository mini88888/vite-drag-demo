import { reactive, ref } from "vue"
import { $, decomposeComponent, generateID, createGroupStyle, } from '@/utils'
import eventBus from '@/utils/eventBus'
import { AreaData, componentItem } from '@/types'
import { commonAttr, commonStyle } from '@/custom-component/component-list'
import { componentData, curComponent, addComponent, setCurComponent, deleteComponent } from './components'

const editor = ref<Element | null>(null)

const getEditor = () => {
  editor.value = $('#editor')
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

const batchDeleteComponent = (deleteData: Array<componentItem>) => {
  deleteData.forEach(component => {
    for (let i = 0, len = componentData.value.length; i < len; i++) {
      if (component.id == componentData.value[i].id) {
        componentData.value.splice(i, 1)
        break
      }
    }
  })
}

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

  addComponent(groupComponent)
  batchDeleteComponent(areaData.components)
  eventBus.emit('hideArea')

  setCurComponent({
    component: componentData.value[componentData.value.length - 1],
    index: componentData.value.length - 1,
  })
  Object.assign(areaData, {
    components: []
  })
}

const decompose = () => {
  const parentStyle = { ...curComponent.value?.style }
  const components = curComponent.value?.propValue
  const editorRect = (editor.value as HTMLElement).getBoundingClientRect()

  deleteComponent()
  components.forEach((component: componentItem) => {
    decomposeComponent(component, editorRect, parentStyle)
    addComponent(component)
  })
}

const setAreaData = (data: AreaData) => {
  Object.assign(areaData, data)
}

export default {
  editor,
  getEditor,
  areaData,
  compose,
  decompose,
  setAreaData,
  batchDeleteComponent
}