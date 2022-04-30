<template>
  <div class="bar-echart">
    <echart-base :options="options"></echart-base>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import EchartBase from '@/base-ui/echart'
import * as echarts from 'echarts'
export default defineComponent({
  components: {
    EchartBase
  },
  props: {
    title: String,
    xLabels: Array as PropType<string[]>,
    values: Array as PropType<any[]>
  },
  setup(props) {
    const options = computed(() => {
      return {
        xAxis: {
          data: props.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.values
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style scoped></style>
