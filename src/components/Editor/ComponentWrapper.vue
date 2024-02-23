<script setup lang="ts">
import { getStyle, getSVGStyle } from '@/utils'
import { componentItem } from '@/types'
import { runAnimation } from '@/utils'
import { onMounted, ref } from 'vue'

const { config } = defineProps<{
  config: componentItem
}>()

const componentEl = ref<HTMLElement>(null)

onMounted(() => {
  runAnimation(componentEl.value.$el, config.animations)
})
</script>


<template>
  <div @click="onClick"
       @mouseenter="onMouseEnter">
    <component :is="config.component"
               v-if="config.component.startsWith('SVG')"
               ref="componentEl"
               class="component absolute"
               :style="getSVGStyle(config.style)"
               :prop-value="config.propValue"
               :element="config"
               :request="config.request"
               :linkage="config.linkage" />

    <component :is="config.component"
               v-else
               ref="componentEl"
               class="component absolute"
               :style="getStyle(config.style)"
               :prop-value="config.propValue"
               :element="config"
               :request="config.request"
               :linkage="config.linkage" />
  </div>
</template>

