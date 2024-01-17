<script setup lang="ts">
import type { componentItem } from '@/type'
import req from '@/utils/request'
import { onMounted, ref, onBeforeUnmount } from 'vue'
interface Props {
  element: componentItem
  propValue: componentItem.propValue
  request: componentItem.request
}

const { element, propValue, request } = defineProps<Props>()
const cancelRequest = ref<any>(null)

onMounted(() => {
  if (request) {
    cancelRequest.value = req(request, propValue, 'data')
  }
})

onBeforeUnmount(() => {
  request && cancelRequest()
})
</script>

<template>
  <table class="v-table">
    <tbody>
      <tr v-for="(item, index) in propValue.data"
          :key="index"
          :class="{
                    stripe: propValue.stripe && index % 2,
                    bold: propValue.thBold && index === 0
                }">
        <td v-for="(e, i) in item"
            :key="i">{{ e }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.v-table {
  border-collapse: collapse;
  table-layout: fixed;
  word-break: break-all;
  word-wrap: break-word;

  td {
    border: 1px solid #ebeef5;
    height: 40px;
    width: 60px;
    padding: 10px;
  }

  .bold {
    font-weight: bold;
  }

  .stripe {
    background-color: #fafafa;
  }
}
</style>