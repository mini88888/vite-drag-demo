<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from '@/store'
import AceEditor from '@/components/Editor/AceEditor.vue'
import { format } from 'echarts/core'

const { canvasStyleData } = useStore()

const isShowAceEditor = ref<boolean>(false)

const handleAceEditorChange = () => {
  isShowAceEditor.value = !isShowAceEditor.value
}
const closeEditor = () => {
  isShowAceEditor.value = !isShowAceEditor.value
}
</script>

<template>
  <div class="border-bottom flex-y-center p-x-[10px] h-[50px]">
    <el-button @click="handleAceEditorChange">JSON</el-button>
    <el-button @click="handleAceEditorChange">撤销</el-button>
    <el-button @click="handleAceEditorChange">重做</el-button>
    <el-button @click="handleAceEditorChange">插入图片</el-button>
    <el-button @click="handleAceEditorChange">预览</el-button>
    <el-button @click="handleAceEditorChange">保存</el-button>
    <el-button @click="handleAceEditorChange">清空画布</el-button>
    <el-button @click="handleAceEditorChange">组合</el-button>
    <el-button @click="handleAceEditorChange">拆分</el-button>
    <el-button @click="handleAceEditorChange">锁定</el-button>
    <el-button @click="handleAceEditorChange">解锁</el-button>
    <el-button @click="handleAceEditorChange">截图</el-button>
    <div class="m-x-2">
      画布大小：<el-input class="w-20"
                v-model="canvasStyleData.width" />*
      <el-input class="w-20"
                v-model="canvasStyleData.height" />
    </div>

  </div>
  <AceEditor v-if="isShowAceEditor"
             @closeEditor="closeEditor" />
</template>

<style scoped>
</style>
