<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'

interface Props {
  element: componentItem
  propValue: componentItem.propValue
}

const props = defineProps<Props>()

const points = ref<string>('')
const drawTriangle = (width: number, height: number) => {
  // 坐标点的比例集合
  const pointsArr = [
    [0.5, 0.05],
    [1, 0.95],
    [0, 0.95]
  ]

  const coordinatePoints = pointsArr.map(
    (point) => width * point[0] + ' ' + height * point[1]
  )
  points.value = coordinatePoints.toString()
}
const draw = () => {
  const { width, height } = props.element.style
  drawTriangle(width, height)
}

onMounted(() => {
  draw()
})
</script>

<template>
  <div>
    <svg version="1.1"
         baseProfile="full"
         xmlns="http://www.w3.org/2000/svg">
      <polygon ref="triangle"
               :points="points"
               :stroke="element.style.borderColor"
               :fill="element.style.backgroundColor"
               stroke-width="1" />
    </svg>
    <v-text class="absolute top-[72%] left-[50%] w-[50%] h-[40%] translate-[-50%_-50%]"
            :prop-value="element.propValue"
            :element="element" />
  </div>
</template>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>