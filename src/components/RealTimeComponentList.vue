<script setup lang="ts">
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import { log } from 'console'

const { componentData } = storeToRefs(useStore())

const { setCurComponent, upComponent, downComponent, deleteComponent } =
  useStore()

const getComponent = (index) => {
  return (
    componentData.value[componentData.value.length - 1 - index] || { icon: '' }
  )
}

const onClick = (index: number) => {
  setCurComponent({ component: componentData.value[index], index })
}
const transformIndex = (index: T): T => {
  return componentData.value.length - 1 - index
}
const upComponentHandle = (index: number) => {
  setTimeout(() => upComponent(index))
}
const downComponentHandle = (index: number) => {
  setTimeout(() => downComponent(index))
}
const deleteComponentHandle = () => {
  setTimeout(() => deleteComponent())
}
</script>

<template>
  <div class="p-2">
    <div v-for="(item, index) in componentData"
         @click="onClick(transformIndex(index))">
      <div class="flex-y-center p-1 hover:bg-[#eee] hover:cursor-grab relative">
        <span class="w-[16px] h-[16px] flex-center border border-[#aaa] border-solid m-r-1"><i class="iconfont scale-50"
             :class="`icon-${getComponent(index).icon}`"></i></span>
        <span class="text-xs">{{getComponent(index).label}}</span>
        <div class="absolute right-[10px]">
          <span class="hover:cursor-pointer p-[3px] text-xs iconfont icon-shangfan"
                @click="upComponentHandle()"></span>
          <span class="hover:cursor-pointer p-[3px] text-xs iconfont icon-xiafan"
                @click="downComponentHandle()"></span>
          <span class="hover:cursor-pointer p-[3px] text-xs iconfont icon-shanchu"
                @click="deleteComponentHandle()"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>