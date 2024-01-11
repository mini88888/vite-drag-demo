
<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import ComponentWrapper from './ComponentWrapper.vue'
import { componentItem } from '@/types'
import { useStore } from '@/store'
import { deepCopy, getCanvasStyle, changeStyleWithScale } from '@/utils'

const { componentData, canvasStyleData } = toRefs(useStore())

const { isScreenshot } = defineProps<{
  isScreenshot: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const copyData = ref<componentItem[]>([])

const htmlToImage = () => {}

const close = () => {
  emit('close')
}

onMounted(() => {
  copyData.value = deepCopy(componentData.value)
})
</script>

<template>
  <div ref="container"
       class="wh-full fixed-center bg-[rgb(0,_0,_0,_.5)] p-[20px] z-[99]">
    <el-button v-if="!isScreenshot"
               class="absolute right-[20px] top-[20px]"
               @click="close">关闭</el-button>
    <el-button v-else
               class="close"
               @click="htmlToImage">确定</el-button>
    <div class="w-[calc(100%-40px)] h-[calc(100%-120px)] overflow-auto">
      <div class="bg-[#fff] relative m-auto"
           :style="{
                    ...getCanvasStyle(canvasStyleData),
                    width: changeStyleWithScale(canvasStyleData.width) + 'px',
                    height: changeStyleWithScale(canvasStyleData.height) + 'px',
                }">
        <ComponentWrapper v-for="(item, index) in copyData"
                          :key="index"
                          :config="item" />
      </div>
    </div>
  </div>
</template>
