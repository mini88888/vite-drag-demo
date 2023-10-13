<script setup lang="ts">
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LineChart
])

interface Props {
  element: componentItem
  propValue: componentItem.propValue
}

const props = defineProps<Props>()
</script>

<template>
  <v-chart ref="chart"
           class="chart"
           :option="props.propValue.option" />
</template>

<style scoped></style>