<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from '@/store'

const { canvasStyleData } = useStore()
</script>

<template>
  <div class="border-bottom flex-y-center p-x-[10px] h-[50px]">
    <el-button>JSON</el-button>
    <el-button>撤销</el-button>
    <el-button>重做</el-button>
    <el-button>插入图片</el-button>
    <el-button>预览</el-button>
    <el-button>保存</el-button>
    <el-button>清空画布</el-button>
    <el-button>组合</el-button>
    <el-button>拆分</el-button>
    <el-button>锁定</el-button>
    <el-button>解锁</el-button>
    <el-button>截图</el-button>
    <div class="m-x-2">
      画布大小：<el-input class="w-20"
                v-model="canvasStyleData.width" />*
      <el-input class="w-20"
                v-model="canvasStyleData.height" />
    </div>

  </div>
</template>

<style scoped>
</style>
