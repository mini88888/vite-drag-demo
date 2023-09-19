<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/type'

interface Props {
  element: componentItem
}

const props = defineProps<Props>()

const store = useStore()

const text = ref<null>(null)
const canEdit = ref<boolean>(false)

const selectText = (element: HTMLElement) => {
  const selection = window.getSelection()
  const range = document.createRange()
  console.log(element, selection, range)

  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
}

const setEdit = (e: HTMLElement) => {
  if (props.element.isLock) return
  canEdit.value = true
  // 全选
  selectText(text.value)
}
</script>

<template>
  <div v-if="store.editMode == 'edit'">
    <div ref="text"
         class="wh-full p-[5px]"
         :style="{ verticalAlign: props.element.style?.verticalAlign }"
         tabindex="0"
         @dblclick="setEdit"
         :contenteditable="canEdit"
         v-html="props.element.propValue" />
  </div>
  <div v-else
       :style="{ verticalAlign: props.element.style?.verticalAlign }"
       v-html="element.propValue"></div>
</template>

<style scoped>
</style>