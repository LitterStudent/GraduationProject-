<template>
  <div class="rose-echart">
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
    roseData: Array as PropType<IDataType[]>
  },
  setup(props) {
    const options = computed(() => {
      return {
        // legend: {
        //   top: 'bottom'
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '类别数据',
            type: 'pie',
            radius: [10, 90],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style scoped></style>
