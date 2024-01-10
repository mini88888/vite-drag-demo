<script setup lang="ts">
import '../../../ace.config'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useStore } from '@/store'
import * as ace from 'ace-builds'
ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/')
import { VAceEditor } from 'vue3-ace-editor'
import { Search, Close } from '@element-plus/icons-vue'

const emit = defineEmits<{
  (e: 'closeEditor'): void
}>()

const { canvasStyleData, curComponent, setCanvasStyle, aceSetcurComponent } =
  useStore()

const editor = ref<any>(null)
const aceEL = ref<HTMLElement>(null)
const aceContent = ref<string>('')

const setCode = () => {
  const content = curComponent || canvasStyleData
  aceContent.value = JSON.stringify(content, null, 4)
}

const editorInit = (data) => {
  console.log('editorInit', data, editor)
  editor.value = data
  setCode()
}

const openSearchBox = () => {
  // ace.find('foo')
  editor.value.execCommand('find')
  console.log(
    'openSearchBox',
    aceEL.value
    // ace.value?.execCommand('find') || null
  )
}

const closeEditor = () => {
  emit('closeEditor')
}

const getCode = () => {
  const styleObj = JSON.parse(aceContent.value)

  if (!curComponent) {
    setCanvasStyle(styleObj)
  } else {
    aceSetcurComponent(styleObj)
  }
}

onMounted(() => {
  nextTick(() => editorInit)
})
</script>

<template>
  <div class="ace absolute h-[calc(100vh-80px)] w-[550px] top-[50px] bg-[--ace-bg-color] border-[1px] border-solid border-[#ddd] z-[99]">
    <el-button class="btn ml-[370px]"
               :icon="Search"
               @click="openSearchBox">
      查找
    </el-button>
    <el-button class="btn"
               style="margin-left: 10px;"
               :icon="Close"
               @click="closeEditor">
      关闭
    </el-button>
    <div class="ace-editor">
      <VAceEditor ref="aceEL"
                  class="editor h-[578px] bg-[#fff] mb-[15px] mt-[15px]"
                  v-model:value="aceContent"
                  @init="editorInit"
                  lang="html"
                  theme="chrome"
                  :options="{
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true,
                    fontSize: 14,
                    tabSize: 2,
                    maxLines: 34,
                    minLines: 34,
                    showPrintMargin: false,
                    highlightActiveLine: true,
                  }" />
    </div>
    <el-button type="primary"
               class="ml-[350px]"
               @click="setCode">
      重置代码
    </el-button>
    <el-button type="success"
               style="margin-left: 20px;"
               @click="getCode">
      保存提交
    </el-button>
  </div>
</template>

<style scoped>
</style>