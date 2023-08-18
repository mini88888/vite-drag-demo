<script setup lang="ts">
import { ref } from 'vue'
import type { componentItem } from '@/type'

interface Props {
  element: componentItem
}

const props = defineProps<Props>()

const isEdit = ref<boolean>(false)

const setEdit = (e:HTMLElement)=>{
  isEdit.value = false
}
</script>

<template>
  <div class="wh-full">
    <div
      tabindex="0"
      @dblclick="setEdit"
      :contenteditable="isEdit"
      v-html="props.element.propValue" />
  </div>
</template>

<style scoped>

</style>