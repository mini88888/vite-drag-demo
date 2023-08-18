<script setup lang="ts">
import componentList from '@/custom-component/component-list'

const handleDragStart = (e: HTMLElement) => {
  e.dataTransfer.setData('index', e.target.dataset.index)
}
</script>

<template>
  <div @dragstart="handleDragStart"
       class="component-list border-bottom p-2 grid grid-cols-2 gap-4 grid-rows-[repeat(auto-fill,30px)]">
    <div draggable="true"
         class="border border-[#aaa] border-solid flex-center rounded cursor-pointer"
         v-for="(item, index) in componentList"
         :key="item.label"
         :title="item.label"
         :data-index="index">
      <i class="iconfont text-xs"
         :class="item.icon"></i>
    </div>
  </div>
</template>


<style scoped>
</style>