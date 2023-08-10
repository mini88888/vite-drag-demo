<script setup lang="ts">
import componentList from '@/custom-component/component-list'

const handleDragStart = (e)=>{
  console.log('event',e);
  
}
</script>

<template>
  <div 
    @dragstart="handleDragStart"
    class="component-list border-bottom p-2 grid grid-cols-2 gap-4 grid-rows-[repeat(auto-fill,30px)]">
    <div 
      v-for="(item, index) in componentList" 
      :key="item.label"
      class="border border-[#aaa] border-solid flex-center rounded cursor-pointer"
      :title="item.label"
      draggable>
      <i class="iconfont text-xs" :class="item.icon"></i>
    </div>
  </div>
</template>


<style scoped>
</style>