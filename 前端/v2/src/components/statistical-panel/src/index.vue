<template>
  <div class="statistical">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <el-icon>
          <warning></warning>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <hy-counter-up :number="panelData.price" :option="counterOption2" />
    </div>
    <div class="fotter">
      <span>
        {{ panelData.subTitle }}
        <hy-counter-up :number="panelData.number" :option="counterOption1" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyCounterUp from '@/base-ui/count-up'

export default defineComponent({
  components: {
    HyCounterUp
  },
  props: {
    panelData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  setup() {
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    }
    const counterOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: '￥' // 单位
    }
    return {
      counterOption1,
      counterOption2
    }
  }
})
</script>

<style scoped lang="less">
@h: 38px;

.statistical {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgb(179, 178, 182);

  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    // border: 1px solid red;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: -5px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .fotter {
    display: flex;
    height: @h;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
