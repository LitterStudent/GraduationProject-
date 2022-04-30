<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="(item, index) in topPanelDatas" :key="index">
        <el-col :md="12" :lg="6" :xl="6">
          <hy-statistical-panel class="digital-panel-row" :panel-data="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <hdCard class="center-echart echart-pie1" title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hdCard>
      </el-col>
      <el-col :span="10">
        <hdCard class="center-echart echart-earth" title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hdCard>
      </el-col>
      <el-col :span="7">
        <hdCard class="center-echart echart-pie1" title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hdCard>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <hdCard title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hdCard>
      </el-col>
      <el-col :span="12">
        <hdCard title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hdCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import HdCard from '@/base-ui/card'
import HyStatisticalPanel from '@/components/statistical-panel'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from './cpns'
export default defineComponent({
  name: 'dasgboard',
  components: {
    HdCard,
    PieEchart,
    RoseEchart,
    BarEchart,
    LineEchart,
    MapEchart,
    HyStatisticalPanel
  },
  setup() {
    const store = useStore()
    if (store.state.dashboard.categoryGoodsCount.length === 0) {
      store.dispatch('dashboard/getDashboardDataAction')
    }

    const topPanelDatas = [
      {
        title: '销量1',
        tips: '苹果的销量',
        price: 124541,
        subTitle: '销售总量： ',
        number: 8233
      },
      {
        title: '销量2',
        tips: '苹果的销量',
        price: 24541,
        subTitle: '销售总量： ',
        number: 3133
      },
      {
        title: '销量3',
        tips: '苹果的销量',
        price: 4541,
        subTitle: '销售总量： ',
        number: 233
      },
      {
        title: '销量4',
        tips: '苹果的销量',
        price: 424541,
        subTitle: '销售总量： ',
        number: 1233
      }
    ]
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale2 = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale2) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor2 = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor2) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      topPanelDatas,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  .digital-panel-row {
    height: 130px;
    margin-bottom: 20px;
    overflow: hidden;
    text-align: left;
  }

  .center-echart {
    height: 450px;
    margin: 0 0 20px 0;
  }

  .bottom-echart {
    height: 290px;
  }
}
</style>
