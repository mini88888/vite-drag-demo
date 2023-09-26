<script setup lang="ts">
interface Props {
  element: componentItem
  propValue: componentItem.propValue
}

const props = defineProps<Props>()
</script>

<template>
  <div class="overflow-auto rounded-[50%]">
    <v-text :prop-value="element.propValue"
            :element="element" />
  </div>
</template>

<style scoped></style>