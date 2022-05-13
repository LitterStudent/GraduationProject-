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
        <hdCard class="center-echart echart-pie1" title="用户创作分析(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hdCard>
      </el-col>
      <el-col :span="10">
        <hdCard class="center-echart echart-earth" title="不同城市用户数量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hdCard>
      </el-col>
      <el-col :span="7">
        <hdCard class="center-echart echart-pie1" title="用户创作分析(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hdCard>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="10">
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
    </el-row> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import HdCard from '@/base-ui/card'
import HyStatisticalPanel from '@/components/statistical-panel'
import { PieEchart, RoseEchart, MapEchart } from './cpns'
export default defineComponent({
  name: 'dasgboard',
  components: {
    HdCard,
    PieEchart,
    RoseEchart,
    // BarEchart,
    // LineEchart,
    MapEchart,
    HyStatisticalPanel
  },
  setup() {
    const store = useStore()
    if (store.state.dashboard.categoryGoodsCount.length === 0) {
      // store.dispatch('dashboard/getDashboardDataAction')
    }

    const topPanelDatas = [
      {
        title: '近七日用户提问数',
        tips: '用户提问数',
        price: 13,
        subTitle: '问题总数： ',
        number: 766
      },
      {
        title: '近七日用户回答数',
        tips: '用户回答数',
        price: 56,
        subTitle: '回答总数： ',
        number: 422
      },
      {
        title: '近七日用户新增文章数',
        tips: '用户新增文章数',
        price: 43,
        subTitle: '销售总量： ',
        number: 233
      },
      {
        title: '近七日用户申请专栏数',
        tips: '用户申请专栏数',
        price: 6,
        subTitle: '销售总量： ',
        number: 76
      }
    ]
    const categoryGoodsCount = computed(() => {
      return [
        { name: '问题', goodsCount: 12 },
        { name: '回答', goodsCount: 56 },
        { name: '文章', goodsCount: 43 },
        { name: '专栏', goodsCount: 6 }
      ].map((item: any) => {
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
      return [
        { address: '广州', count: 12 },
        { address: '东莞', count: 12 },
        { address: '深圳', count: 3 },
        { address: '青岛', count: 2 },
        { address: '北京', count: 4 },
        { address: '杭州', count: 4 }
      ].map((item: any) => {
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
