<template>
  <div class="pie-echart">
    <echart-base :options="options"></echart-base>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import EchartBase from '@/base-ui/echart'
import { IDataType } from '../type/type'
export default defineComponent({
  components: {
    EchartBase
  },
  props: {
    pieData: Array as PropType<IDataType[]>
  },
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style></style>
