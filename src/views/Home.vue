<script setup lang="ts">
import ToolBar from '@/components/ToolBar.vue'
import ComponentList from '@/components/ComponentList.vue'
import RealTimeComponentList from '@/components/RealTimeComponentList.vue'
import Editor from '@/components/Editor/index.vue'
</script>

<template>
  <div class="wh-full grid grid-rows-[50px_auto]">
    <ToolBar />
    <div class="grid grid-cols-[200px_auto_250px]">
      <!-- 左侧组件 -->
      <div class="grid grid-rows-[60%_40%] border-right">
        <ComponentList />
        <RealTimeComponentList />
      </div>
      <!-- 画布 -->
      <div>
        <Editor />
      </div>
      <!-- 右侧属性 -->
      <div class="border-left"></div>
    </div>
  </div>
</template>
<style scoped>

</style>