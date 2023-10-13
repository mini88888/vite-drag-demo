<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import CommonAttr from '../common/CommonAttr.vue'
import EditTable from './EditTable.vue'

const { curComponent } = useStore()

const propValue = computed(() => curComponent.propValue)
</script>

<template>
  <div class="">
    <CommonAttr></CommonAttr>
    <EditTable></EditTable>
    <el-form>
      <el-form-item label="斑马纹">
        <el-switch v-model="propValue.stripe"></el-switch>
      </el-form-item>
      <el-form-item label="表头加粗">
        <el-switch v-model="propValue.thBold"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>