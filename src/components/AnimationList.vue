<script setup lang="ts">
import { reactive, ref } from 'vue'
import Modal from '@/components/Modal.vue'
import { useStore } from '@/store'
import eventBus from '@/utils/eventBus'
import animationClassData from '@/utils/animationClassData'
import AnimationSettingModal from './AnimationSettingModal.vue'
import { runAnimation } from '@/utils'
import { Setting, Close } from '@element-plus/icons-vue'

const { curComponent, addAnimation } = useStore()

const isShowAnimation = ref<boolean>(false)
const animationActiveName = ref<string>('进入')

const previewAnimate = () => {
  eventBus.emit('runAnimation')
}
const removeAnimation = () => {}

const isShowAnimationSetting = ref<boolean>(false)
const curIndex = ref<number>(-1)
const handleAnimationSetting = (index: number) => {
  isShowAnimationSetting.value = true
  curIndex.value = index
}

const itemRef = reactive<Record<string, HTMLElement>>({})
const setItemRef = (key: string, $el: HTMLElement) => {
  itemRef[key] = $el
}

const runAnimationHandle = async (animate) => {
  if (animate.pending) return

  animate.pending = true
  await runAnimation(itemRef[animate.value], [animate])

  // 防止无限触发同一元素的动画
  setTimeout(() => {
    animate.pending = false
  }, 100)
}
const addAnimationHandle = (animate) => {
  addAnimation(animate)
  isShowAnimation.value = false
}
</script>

<template>
  <div class="animation-list">
    <div class="div-animation text-center m-t-[20px]">
      <el-button @click="isShowAnimation = true">添加动画</el-button>
      <el-button @click="previewAnimate">预览动画</el-button>
      <div class="m-t-[15px]">
        <el-tag v-for="(tag, index) in curComponent.animations"
                :key="index"
                closable
                @close="removeAnimation(index)"
                class="block w-[50%] m-[auto] m-t-[10px] p-t-[3px]">
          {{ tag.label }}
          <el-icon @click="handleAnimationSetting(index)">
            <Setting class="cursor-pointer w-[14px] h-[14px]" />
          </el-icon>
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
                 :ref="(el:HTMLElement)=>setItemRef(animate.value, el)"
                 :key="animate.value"
                 class="animate"
                 @mouseenter="runAnimationHandle(animate)"
                 @click="addAnimationHandle(animate)">
              <div class="w-[100px] h-[60px] bg-[#f5f8fb] flex-center m-[0_12px] m-b-[10px] text-[12px] color-[#333] cursor-pointer rounded-[3px]">
                {{ animate.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </Modal>
    <!-- 编辑动画配置 -->
    <AnimationSettingModal v-if="isShowAnimationSetting"
                           :cur-index="curIndex"
                           @close="isShowAnimationSetting = false" />
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