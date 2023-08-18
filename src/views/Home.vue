<script setup lang="ts">
import { useStore } from '@/store'
import { onMounted } from 'vue'
import ToolBar from '@/components/ToolBar.vue'
import ComponentList from '@/components/ComponentList.vue'
import RealTimeComponentList from '@/components/RealTimeComponentList.vue'
import Editor from '@/components/Editor/index.vue'
import componentList from '@/custom-component/component-list'
 const { addComponent } = useStore()

onMounted(()=>{
  const { editor } = useStore()
})

// 拖动组件到画布
const handleDrop = (e: HTMLElement) => {
  console.log(e)
  e.preventDefault()
  e.stopPropagation()
  const index = e.dataTransfer.getData('index')
  const rectInfo = editor.getBoundingClientRect()
  if (index) {
    const component = componentList[index];
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    
    addComponent(component)
  }
}
const handleDragOver = (e: HTMLElement) => {
  // console.log(e)
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
const handleMouseDown = (e: HTMLElement) => {
  // console.log(e)
}
const deselectCurComponent = (e: HTMLElement) => {
  // console.log(e)
}
</script>

<template>
  <div class="wh-full grid grid-rows-[50px_auto]">
    <ToolBar />
    <div class="grid grid-cols-[200px_auto_288px]">
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
      <section class=""></section>
    </div>
  </div>
</template>
<style scoped>
</style>