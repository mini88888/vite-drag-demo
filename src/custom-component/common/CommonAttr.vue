<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { styleData, selectKey, optionMap } from '@/utils'
import type { componentItem } from '@/type'

const activeNames = ref<string>('style')

const { curComponent } = useStore()

const styleKeys = computed(() => {
  if (curComponent) {
    const curComponentStyleKeys = Object.keys(curComponent.style)
    return styleData.filter((item) => curComponentStyleKeys.includes(item.key))
  }
  return []
})

const isIncludesColor = (str: string): boolean =>
  str.toLowerCase().includes('color')
</script>

<template>
  <el-collapse class="m-b-2"
               v-model="activeNames">
    <el-collapse-item title="通用样式"
                      name="style">
      <el-form label-position="top">
        <el-form-item v-for="({ key, label }, index) in styleKeys"
                      :key="index"
                      :label="label">
          <el-color-picker v-if="isIncludesColor(key)"
                           v-model="curComponent.style[key]"></el-color-picker>
          <el-select v-else-if="selectKey.includes(key)"
                     v-model="curComponent.style[key]">
            <el-option v-for="item in optionMap[key]"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-input v-else
                    v-model.number="curComponent.style[key]"
                    type="number" />
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped>
</style>