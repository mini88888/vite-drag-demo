<script setup lang="ts">
import componentList from '@/custom-component/component-list'
</script>

<template>
  <div class="component-list border-bottom p-2 grid grid-cols-2 gap-4 grid-rows-[repeat(auto-fill,30px)]">
    <div v-for="(item, index) in componentList" class="h-[30px] border border-[#aaa] border-solid flex-center rounded">
      <i class="iconfont text-xs" :class="item.icon"></i>
    </div>
  </div>
</template>


<style scoped>
</style>