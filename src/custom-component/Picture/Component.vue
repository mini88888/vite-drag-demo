<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import type { componentItem } from '@/type'

interface Props {
  element: componentItem
  propValue: componentItem.propValue
}

const props = defineProps<Props>()

const store = useStore()

const isFirst = ref<boolean>(true)
let img = reactive<HTMLDivElement>({})
let canvas = reactive<HTMLDivElement>({})
let ctx = reactive<HTMLDivElement>({})
const mirrorFlip = () => {
  const { vertical, horizontal } = props.propValue.flip
  const { width, height } = props.element.style
  const hvalue = horizontal ? -1 : 1
  const vValue = vertical ? -1 : 1

  // 清除图片
  ctx.clearRect(0, 0, width, height)
  // 平移图片
  ctx.translate(
    width / 2 - (width * hvalue) / 2,
    height / 2 - (height * vValue) / 2
  )
  // 对称镜像
  ctx.scale(hvalue, vValue)
  ctx.drawImage(img, 0, 0, width, height)
  // 还原坐标点
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
const drawImage = () => {
  const { width, height } = props.element.style
  canvas.width = width
  canvas.height = height
  if (isFirst) {
    isFirst.value = false
    img = document.createElement('img')
    img.src = props.propValue.url
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      mirrorFlip()
    }
  } else {
    mirrorFlip()
  }
}

watch(
  () => [props.element.style.width, props.element.style.height],
  () => {
    drawImage()
  }
)
watch(
  () => [props.propValue.flip.vertical, props.propValue.flip.horizontal],
  () => {
    mirrorFlip()
  }
)

onMounted(() => {
  ctx = canvas.getContext('2d')
  drawImage()
})
</script>

<template>
  <div class="overflow-hidden">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>