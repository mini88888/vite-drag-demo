<script setup lang="ts">
const { show } = defineProps<{
  show: false
}>()

const emit = defineEmits<{
  (e: 'change'): void
}>()

const stopPropagation = (e: HTMLElement) => e.stopPropagation()

const hide = () => emit.change()
</script>

<template>
  <div v-if="show"
       class="modal-bg fixed-full bg-[rgba(0,0,0,.5)] z-[1001]"
       @click="hide">
    <div class="fadeInLeft animated modal w-[400px] bg-[var(--main-bg-color)] h-full"
         @click="stopPropagation">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>