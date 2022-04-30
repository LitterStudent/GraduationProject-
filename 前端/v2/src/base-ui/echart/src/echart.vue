<template>
  <div class="base-echarts">
    <div
      ref="echartContainerRef"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import { useEcharts } from '../hook/useEchart'
export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      require: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    }
  },
  setup(props) {
    const echartContainerRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOptions } = useEcharts(echartContainerRef.value!)
      setOptions(props.options!)
      watchEffect(() => {
        setOptions(props.options!)
      })
    })
    return { echartContainerRef }
  }
})
</script>

<style></style>
