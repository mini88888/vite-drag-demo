import { ref } from "vue"
import { $ } from '@/utils'

const editor = ref<Element | null>(null)

const getEditor = () => {
  editor.value = $('#editor')
}

export default {
  editor,
  getEditor
}