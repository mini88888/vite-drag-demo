<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from '@/store'
import Preview from '@/components/Editor/Preview.vue'
import AceEditor from '@/components/Editor/AceEditor.vue'
import { commonStyle, commonAttr } from '@/custom-component/component-list'
import { toast, generateID, changeComponentSizeWithScale, $ } from '@/utils'
import { fa } from 'element-plus/es/locale'

const {
  canvasStyleData,
  undo,
  redo,
  addComponent,
  recordSnapshot,
  setEditMode
} = useStore()

const isShowAceEditor = ref<boolean>(false)

const handleAceEditorChange = () => {
  isShowAceEditor.value = !isShowAceEditor.value
}
const closeEditor = () => {
  isShowAceEditor.value = !isShowAceEditor.value
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file.type.includes('image')) {
    toast('只能插入图片')
    return
  }

  const reader = new FileReader()
  reader.onload = (res) => {
    const fileResult = res.target.result
    const img = new Image()
    img.onload = () => {
      const component = {
        ...commonAttr,
        id: generateID(),
        component: 'Picture',
        label: '图片',
        icon: 'tupian',
        propValue: {
          url: fileResult,
          flip: {
            horizontal: false,
            vertical: false
          }
        },
        style: {
          ...commonStyle,
          top: 0,
          left: 0,
          width: img.width,
          height: img.height
        }
      }

      // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
      changeComponentSizeWithScale(component)

      addComponent(component)
      recordSnapshot()

      // 修复重复上传同一文件，@change 不触发的问题
      $('#input').setAttribute('type', 'text')
      $('#input').setAttribute('type', 'file')
    }

    img.src = fileResult
  }

  reader.readAsDataURL(file)
}

const isScreenshot = ref<boolean>(false)
const isShowPreview = ref<boolean>(false)

const preview = (isScreenshotVal: boolean) => {
  isScreenshot.value = isScreenshotVal
  isShowPreview.value = true
  setEditMode('preview')
}
</script>

<template>
  <div class="border-bottom flex-y-center p-x-[10px] h-[50px]">
    <el-button @click="handleAceEditorChange">JSON</el-button>
    <el-button @click="undo">撤销</el-button>
    <el-button @click="redo">重做</el-button>
    <label for="input"
           class="insert border-[1px] border-solid border-[#ddd] p-[8px_15px] text-[10px] m-x-3 cursor-pointer">
      插入图片
      <input id="input"
             type="file"
             hidden
             @change="handleFileChange" />
    </label>
    <el-button @click="preview(false)">预览</el-button>
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
  <!-- 预览 -->
  <Preview v-if="isShowPreview"
           :is-screenshot="isScreenshot"
           @close="handlePreviewChange" />
  <AceEditor v-if="isShowAceEditor"
             @closeEditor="closeEditor" />
</template>

<style scoped>
</style>
