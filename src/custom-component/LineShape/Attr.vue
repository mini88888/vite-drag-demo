<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import CommonAttr from '../common/CommonAttr.vue'
import type { componentItem } from '@/type'

const { curComponent } = useStore()
</script>

<template>
  <div class="">
    <CommonAttr></CommonAttr>
  </div>
</template>

<style scoped>
</style>