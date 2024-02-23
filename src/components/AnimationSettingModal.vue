<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useStore } from '@/store'
import eventBus from '@/utils/eventBus'

const { curIndex } = defineProps<{
  curIndex: number
}>()

const { curComponent, alterAnimation } = useStore()

const centerDialogVisible = ref<boolean>(true)
const isDisabled = ref<boolean>(false)

const emits = defineEmits<{
  (e: 'close'): void
}>()

console.log('emits', emits)

const handleCloseModal = () => {
  emits('close')
}

const handleSaveSetting = () => {
  const { isLoop, animationTime } = config
  alterAnimation({
    index: curIndex,
    data: {
      animationTime,
      isLoop
    }
  })
  eventBus.emit('stopAnimation')
  handleCloseModal()
}

const config = reactive<Record<string, any>>({})
onMounted(() => {
  const {
    label,
    animationTime,
    isLoop = false,
    value
  } = curComponent.animations[curIndex] || {}
  Object.assign(config, {
    animationTime,
    label,
    isLoop,
    value
  })
  console.log(config)
})
</script>

<template>
  <el-dialog :title="`${config.label} 动画配置`"
             v-model="centerDialogVisible"
             width="30%"
             center
             @close="handleCloseModal">
    <div class="time">
      动画时长：<el-input-number v-model="config.animationTime"
                       controls-position="right"
                       :min="0.1"
                       :precision="2"
                       :step="0.01" />
    </div>
    <div class="loop">
      是否循环：<el-switch v-model="config.isLoop"
                 active-text="是"
                 inactive-text="否"
                 :disabled="isDisabled">
      </el-switch>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleCloseModal">取 消</el-button>
      <el-button type="primary"
                 @click="handleSaveSetting">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
</style>