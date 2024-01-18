<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'
import { useStore } from '@/store'
import eventBus from '@/utils/eventBus'
import animationClassData from '@/utils/animationClassData'

const { curComponent } = useStore()

const isShowAnimation = ref<boolean>(false)
const animationActiveName = ref<string>('进入')

const previewAnimate = () => {
  eventBus.emit('runAnimation')
}
const removeAnimation = () => {}
const handleAnimationSetting = () => {}
const runAnimation = async (animate) => {
  if (animate.pending) return

  animate.pending = true
  await runAnimation(this.$refs[animate.value][0], [animate])

  // 防止无限触发同一元素的动画
  setTimeout(() => {
    animate.pending = false
  }, 100)
}
const addAnimation = () => {}
</script>

<template>
  <div class="animation-list">
    <div class="div-animation text-center m-t-[20px]">
      <el-button @click="isShowAnimation = true">添加动画</el-button>
      <el-button @click="previewAnimate">预览动画</el-button>
      <div>
        <el-tag v-for="(tag, index) in curComponent.animations"
                :key="index"
                closable
                @close="removeAnimation(index)">
          {{ tag.label }}
          <i class="cursor-pointer el-icon-setting"
             @click="handleAnimationSetting(index)"></i>
        </el-tag>
      </div>
    </div>

    <!-- 选择动画 -->
    <Modal :show="isShowAnimation">
      <el-tabs v-model="animationActiveName">
        <el-tab-pane v-for="item in animationClassData"
                     :key="item.label"
                     :label="item.label"
                     :name="item.label">
          <el-scrollbar class="animate-container">
            <div v-for="animate in item.children"
                 :ref="animate.value"
                 :key="animate.value"
                 class="animate"
                 @mouseenter="runAnimation(animate)"
                 @click="addAnimation(animate)">
              <div class="w-[100px] h-[60px] bg-[#f5f8fb] flex-center m-[0_12px] m-b-[10px] text-[12px] color-[#333] cursor-pointer rounded-[3px]">
                {{ animate.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </Modal>
  </div>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 20px;
}
</style>