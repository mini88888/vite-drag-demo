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
    <el-form>
      <el-form-item label="镜像翻转">
        <div style="clear: both;">
          <el-checkbox v-model="curComponent.propValue.flip.horizontal"
                       label="horizontal">水平翻转</el-checkbox>
          <el-checkbox v-model="curComponent.propValue.flip.vertical"
                       label="vertical">垂直翻转</el-checkbox>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>