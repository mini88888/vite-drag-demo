<script setup lang="ts">
import { useStore } from '@/store'

const { componentData } = useStore()

</script>

<template>
  <div class="p-2">
    <div
      v-for="(item, index) in componentData">
      <div class="flex-y-center m-b-2">
        <span class="w-[16px] h-[16px] flex-center border border-[#aaa] border-solid m-r-1"><i class="iconfont scale-50" :class="item.icon"></i></span>
        <span class="text-xs">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>