<script setup lang="ts">
import { useStore } from '@/store'

const { componentData } = useStore()
</script>

<template>
  <div class="p-2">
    <div
      v-for="(item, index) in componentData">
      <div class="flex-y-center m-b-2">
        <span class="w-[24px] h-[24px] flex-center border border-[#aaa] border-solid rounded m-r-1"><i class="iconfont text-xs" :class="item.icon"></i></span>
        <span class="text-ms">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>