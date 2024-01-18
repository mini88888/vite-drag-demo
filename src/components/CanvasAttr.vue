<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

const { canvasStyleData } = storeToRefs(useStore())

const options = reactive<Record<string, string>>({
  color: '颜色',
  opacity: '不透明度',
  backgroundColor: '背景色',
  fontSize: '字体大小'
})

const isIncludesColor = (str: string) => str.toLowerCase().includes('color')
</script>

<template>
  <div class="attr-container">
    <p class="text-center m-b-[10px] h-[40px] line-height-[40px] border-bottom text-[14px] color-[var(--text-color)]">画布属性</p>
    <el-form style="padding: 20px;">
      <el-form-item v-for="(key, index) in Object.keys(options)"
                    :key="index"
                    :label="options[key]">
        <el-color-picker v-if="isIncludesColor(key)"
                         v-model="canvasStyleData[key]"
                         show-alpha></el-color-picker>
        <el-input v-else
                  v-model.number="canvasStyleData[key]"
                  type="number" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>