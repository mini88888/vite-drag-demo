<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useStore } from '@/store'
import * as ace from 'ace-builds'
ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/')
import { VAceEditor } from 'vue3-ace-editor'

const aceDom = ref<HTMLElement>(null)
const { canvasStyleData, curComponent } = useStore()

const aceContent = computed(() =>
  JSON.stringify(curComponent || canvasStyleData, null, 4)
)

const editorInit = (data) => {
  console.log('editorInit', data)
  // require('ace-builds/src-noconflict/ext-language_tools')
  // require('ace-builds/src-noconflict/snippets/sql')
  // require('ace-builds/src-noconflict/mode-sql')
  // require('ace-builds/src-noconflict/theme-monokai')
  // require('ace-builds/src-noconflict/mode-html')
  // require('ace-builds/src-noconflict/mode-html_elixir')
  // require('ace-builds/src-noconflict/mode-html_ruby')
  // require('ace-builds/src-noconflict/mode-javascript')
  // require('ace-builds/src-noconflict/mode-python')
  // require('ace-builds/src-noconflict/snippets/less')
  // require('ace-builds/src-noconflict/theme-chrome')
  // require('ace-builds/src-noconflict/ext-static_highlight')
  // require('ace-builds/src-noconflict/ext-beautify')
}

const openSearchBox = () => {
  console.log(
    'openSearchBox',
    ace.value
    // ace.value?.execCommand('find') || null
  )
}

onMounted(() => {
  nextTick(() => editorInit)
})
</script>

<template>
  <div class="ace absolute h-[calc(100vh-80px)] w-[550px] top-[50px] bg-[--ace-bg-color] border-[1px] border-solid border-[#ddd] z-[99]">
    <el-button class="btn ml-[370px]"
               icon="el-icon-search"
               @click="openSearchBox">
      查找
    </el-button>
    <el-button class="btn"
               style="margin-left: 10px;"
               icon="el-icon-close"
               @click="closeEditor">
      关闭
    </el-button>
    <div class="ace-editor">
      <VAceEditor ref="aceDom"
                  class="editor h-[578px] bg-[#fff] mb-[15px] mt-[15px]"
                  v-model:value="aceContent"
                  @init="editorInit"
                  lang="html"
                  theme="ace/theme/one_dark"
                  mode='ace/mode/json5'
                  :options="{
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true,
                    fontSize: 14,
                    tabSize: 2,
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