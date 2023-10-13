<script setup lang="ts">
import { useStore } from '@/store'
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'

const { curComponent } = useStore()
const tableData = computed(() => curComponent.propValue.data)

const curProperty = ref<string>('')
const curTd = ref<string>('')
const canEdit = ref<boolean>('')
const preCurTd = ref<string>('') // 失焦时 curTd 值为空，这时删除会读不到值，因此用这个变量来代替，用于删除行列

// 聚焦元素
const vFocus = {
  mounted: (el: HTMLElement) => el.querySelector('input').focus()
}
const onDblclick = () => {
  canEdit.value = true
}
const onClick = (row: number, col: number) => {
  curTd.value = row + ',' + col
  preCurTd.value = curTd
}
const onBlur = () => {
  canEdit.value = false
  curTd.value = ''
}
const addRow = () => {
  tableData.value.push(new Array(this.tableData[0]?.length || 1).fill(' '))
}
const addCol = () => {}
const deleteRow = () => {}
const deleteCol = () => {}
</script>

<template>
  <div class="edit-table">
    <table @dblclick="onDblclick">
      <tbody>
        <tr v-for="(item, row) in tableData"
            :key="row">
          <td v-for="(e, col) in item"
              :key="col"
              :class="{ selected: curTd === row + ',' + col }"
              @click="onClick(row, col)">
            <el-input v-if="canEdit && curTd === row + ',' + col"
                      v-model="tableData[row][col]"
                      v-focus
                      @blur="onBlur"></el-input>
            <span v-else>{{ e }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="addRow">添加新行</button>
      <button @click="addCol">添加新列</button>
      <button @click="deleteRow">删除行</button>
      <button @click="deleteCol">删除列</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-table {
  overflow: auto;
  margin-bottom: 8px;

  & > div {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    button {
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      font-weight: 500;
      padding: 4px 10px;
      font-size: 14px;
      border-radius: 4px;
      margin-bottom: 10px;

      &:hover {
        background: #ecf5ff;
        color: #409eff;
      }
    }
  }

  table {
    border-collapse: collapse;
    word-break: break-all;
    word-wrap: break-word;
    text-align: center;
    font-size: 12px;

    td {
      border: 1px solid #ebeef5;
      height: 40px;
      min-width: 60px;
      max-width: 80px;
      padding: 10px;
    }
  }

  .selected {
    background: #ecf5ff;
    color: #409eff;
  }
}
</style>