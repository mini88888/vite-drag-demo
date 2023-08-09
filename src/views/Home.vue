<script setup lang="ts">
import ToolBar from '@/components/ToolBar.vue'
import ComponentList from '@/components/ComponentList.vue'
</script>

<template>
  <div class="wh-full grid grid-rows-[50px_auto]">
    <!-- ToolBar -->
    <ToolBar />
    <div class="grid grid-cols-[200px_auto_250px]">
      <div class="grid grid-rows-[60%_40%] border-right">
        <ComponentList />
        <div></div>
      </div>
      <div class=""></div>
      <div class=""></div>
    </div>
  </div>
</template>

<style scoped>

</style>