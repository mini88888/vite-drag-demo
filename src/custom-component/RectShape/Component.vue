<script setup lang="ts">
interface Props {
  element: componentItem
  propValue: componentItem.propValue
}

const props = defineProps<Props>()
</script>

<template>
  <div class="overflow-auto">
    <v-text :prop-value="props.element.propValue"
            :element="props.element" />
  </div>
</template>

<style scoped></style>