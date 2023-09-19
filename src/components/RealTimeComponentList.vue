<script setup lang="ts">
import { useStore } from '@/store'
import { log } from 'console'

const { componentData, curComponentIndex, exchangeComPos } = useStore()

// const onClick = (index: number) => {
//   setCurComponent({ component: componentData[index], index })
// }
const transformIndex = (index: T): T => {
  return componentData.length - 1 - index
}
const upComponent = (index: number) => {
  if (index < componentData.length - 1) {
    exchangeComPos(index, index + 1)
  }
}
const downComponent = (index: number) => {
  if (index > 0) {
    exchangeComPos(index, index - 1)
  }
}
const deleteComponent = (index: number) => {
  if (index < componentData.length - 1) {
    componentData.splice(index, index + 1)
  }
}
</script>

<template>
  <div class="p-2">
    <div v-for="(item, index) in componentData">
      <div class="flex-y-center p-1 hover:bg-[#eee] hover:cursor-grab relative">
        <span class="w-[16px] h-[16px] flex-center border border-[#aaa] border-solid m-r-1"><i class="iconfont scale-50"
             :class="item.icon"></i></span>
        <span class="text-xs">{{item.label}}</span>
        <div class="absolute right-[10px]">
          <span class="hover:cursor-pointer p-[3px] text-xs iconfont icon-shangfan"
                @click="upComponent(transformIndex(index))"></span>
          <span class="hover:cursor-pointer p-[3px] text-xs iconfont icon-xiafan"
                @click="downComponent(transformIndex(index))"></span>
          <span class="hover:cursor-pointer p-[3px] text-xs iconfont icon-shanchu"
                @click="deleteComponent(transformIndex(index))"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>