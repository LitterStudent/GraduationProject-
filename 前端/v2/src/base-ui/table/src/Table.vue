<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name="footer" v-if="showFooter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listCount"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    dataList: {
      type: Array,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    page: {
      type: Object,
      default: () => ({})
    },
    listCount: {
      type: Number
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:page'],
  setup(prop, { emit }) {
    // 最左侧的选择框
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }
    // 底部分页器事件
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...prop.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...prop.page, currentPage })
    }
    return { handleSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
.table {
  padding: 20px;
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .handler {
      align-items: center;
    }
  }
}
</style>
