<script setup lang="ts">
interface Props {
  element: componentItem
  propValue: componentItem.propValue
  request: componentItem.request
}

const { propValue, element } = defineProps<Props>()
</script>

<template>
  <div class="group">
    <div>
      <component :is="item.component"
                 v-for="item in propValue"
                 :id="'component' + item.id"
                 :key="item.id"
                 class="component"
                 :style="item.groupStyle"
                 :prop-value="item.propValue"
                 :element="item"
                 :request="item.request" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;

    .component {
      position: absolute;
    }
  }
}
</style>