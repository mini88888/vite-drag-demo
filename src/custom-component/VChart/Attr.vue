<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import CommonAttr from '../common/CommonAttr.vue'
import type { componentItem } from '@/type'

const { curComponent } = useStore()
</script>

<template>
  <div class="">
    <CommonAttr></CommonAttr>
    <el-form label-position="top">
      <el-form-item label="内容">
        <el-input v-model="curComponent.propValue"
                  type="textarea"
                  :rows="3" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>