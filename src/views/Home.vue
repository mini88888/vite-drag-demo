<script setup lang="ts">
import { useStore } from '@/store'
import { onMounted, ref } from 'vue'
import ToolBar from '@/components/ToolBar.vue'
import ComponentList from '@/components/ComponentList.vue'
import RealTimeComponentList from '@/components/RealTimeComponentList.vue'
import Editor from '@/components/Editor/index.vue'
import componentList from '@/custom-component/component-list'
import { deepCopy, generateID, changeComponentSizeWithScale } from '@/utils'
import { storeToRefs } from 'pinia'

const store = useStore()

const activeName = ref<string>('attr')

onMounted(() => {
  const { editor } = useStore()
})

// 拖动组件到画布
const handleDrop = (e: HTMLElement) => {
  // console.log('handleDrop', e)
  e.preventDefault()
  e.stopPropagation()
  const index = e.dataTransfer.getData('index')
  const rectInfo = editor.getBoundingClientRect()
  if (index) {
    const component = deepCopy(componentList[index])
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    component.id = generateID()

    changeComponentSizeWithScale(component)
    store.addComponent(component)
    store.recordSnapshot()
  }
}
const handleDragOver = (e: HTMLElement) => {
  // console.log('handleDragOver', e)
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
const handleMouseDown = (e: HTMLElement) => {
  // console.log('handleMouseDown', e)
  e.stopPropagation()
  store.setClickComponentStatus(false)
}
const deselectCurComponent = (e: HTMLElement) => {
  // console.log('deselectCurComponent', e)
  console.log('isClickComponent', store.isClickComponent)

  if (!store.isClickComponent) {
    store.setCurComponent({
      component: null,
      index: -1
    })
  }
}

const restore = () => {
  // 用保存的数据恢复画布
  if (localStorage.getItem('canvasData')) {
    store.setDefaultcomponentData(
      JSON.parse(localStorage.getItem('canvasData'))
    )
    store.setComponentData(JSON.parse(localStorage.getItem('canvasData')))
  }

  if (localStorage.getItem('canvasStyle')) {
    store.setCanvasStyle(localStorage.getItem('canvasStyle'))
  }
}

onMounted(() => restore())
</script>

<template>
  <div class="wh-full">
    <ToolBar />
    <div class="h-[calc(100%-50px)] grid grid-cols-[200px_auto_288px]">
      <!-- 左侧组件 -->
      <section class="grid grid-rows-[60%_40%]">
        <ComponentList />
        <RealTimeComponentList />
      </section>
      <!-- 画布 -->

      <section class="p-[20px] bg-[#f5f5f5] h-full overflow-hidden">
        <div class="wh-full overflow-auto"
             @drop="handleDrop"
             @dragover="handleDragOver"
             @mousedown="handleMouseDown"
             @mouseup="deselectCurComponent">
          <Editor />
        </div>
      </section>
      <!-- 右侧属性 -->
      <section class="overflow-auto">
        <el-tabs v-if="store.curComponent"
                 v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="属性"
                       name="attr">
            <component :is="store.curComponent.component + 'Attr'" />
          </el-tab-pane>
          <el-tab-pane label="动画"
                       name="animation">配置管理</el-tab-pane>
          <el-tab-pane label="事件"
                       name="events">角色管理</el-tab-pane>
        </el-tabs>
      </section>
    </div>
  </div>
</template>
<style scoped>
</style>