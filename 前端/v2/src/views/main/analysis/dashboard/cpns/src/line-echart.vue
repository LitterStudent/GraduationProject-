<template>
  <div class="pie-echart">
    <echart-base :options="options"></echart-base>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import EchartBase from '@/base-ui/echart'
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
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.xLabels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '分别销量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
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

<style></style>
