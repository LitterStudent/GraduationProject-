<template>
  <div class="page-content">
    <hd-table
      v-model:page="pageInfo"
      v-bind="contnetTableConfig"
      :title="contnetTableConfig.header.title"
      :dataList="dataList"
      :listCount="dataCount"
    >
      <!-- table-header -->
      <template #headerHandler>
        <el-button type="success" v-if="isCreate" @click="handleCreate">
          {{ contnetTableConfig.header.createBtn }}
        </el-button>
      </template>
      <!-- table-content -->
      <template #gender="scope">
        {{ scope.row.gender == 1 ? '女' : '男' }}
      </template>
      <template #enable="scope">
        <el-button
          plain
          size="small"
          :type="computedStatusStyle(scope.row.status)"
        >
          {{ computedStatus(scope.row.status) }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formateDate(scope.row.created_at) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formateDate(scope.row.updated_at) }}
      </template>
      <template #handler="scope">
        <el-button
          type="primary"
          size="small"
          v-if="isUpdate"
          @click="handleUpdate(scope.row)"
        >
          修改</el-button
        >
        <el-button
          :type="scope.row.status == 0 ? '' : 'danger'"
          size="small"
          v-if="isDelete"
          @click="handleDelete(scope.row, scope.row.status)"
        >
          {{ scope.row.status == 0 ? '解禁' : '禁用' }}</el-button
        >
        <el-button
          :type="scope.row.status == 2 ? 'warning' : 'success'"
          size="small"
          v-if="isCheck"
          @click="handleCheck(scope.row, scope.row.status)"
        >
          {{
            scope.row.status == 2
              ? '审核通过'
              : scope.row.status == 1
              ? '已通过'
              : '被禁用'
          }}</el-button
        >
      </template>
      <!-- 再封装一层动态插槽 让外部组件引用该表格组件时可以动态的定义字段样式 -->
      <template
        v-for="item in OtherSlotNames"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <!-- table-footer -->
    </hd-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HdTable from '@/base-ui/table'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { usePermission } from '@/hooks/use-permission'
import { checkAnswer } from '@/service/main/system/system'

export default defineComponent({
  components: {
    HdTable
  },
  props: {
    contnetTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    // 删除的url
    url2: {
      type: String,
      required: false
    },
    // 取消删除的url
    url3: {
      type: String,
      required: false
    },
    // 审核通过的url
    url4: {
      type: String,
      required: false
    }
  },
  emits: ['updateBtnClick', 'createBtnClick'],
  setup(prop, { emit }) {
    const store = useStore()
    // 0获取按钮权限
    const isCreate = usePermission(prop.pageName, 'create')
    const isUpdate = usePermission(prop.pageName, 'update')
    const isDelete = usePermission(prop.pageName, 'delete')
    const isQuery = usePermission(prop.pageName, 'query')
    const isCheck = usePermission(prop.pageName, 'check')
    // console.log(prop.pageName)
    // 1.
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => {
      getPageData()
    })
    // 2.
    const getPageData = (queryInfo: any = {}) => {
      console.log(isQuery)
      if (!isQuery) return
      let url = prop.url
      store.dispatch('system/getPageListAction', {
        pageName: prop.pageName,
        url,
        queryInfo: {
          offset: pageInfo.value.currentPage - 1,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3.
    const dataCount = computed(() => {
      return store.getters['system/pageListCount'](prop.pageName)
    })
    const dataList = computed(() =>
      store.getters[`system/pageListData`](prop.pageName)
    )
    // 4. 动态插槽
    const OtherSlotNames = prop.contnetTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'enable') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        // if (item.slotName === 'gender') return false
        return true
      }
    )
    // 5.
    const handleDelete = async (item: any, status: any) => {
      console.log(item)
      if (status == 1 || status == 2) {
        // 删除该项
        store.dispatch('system/deletePageDataAction', {
          pageName: prop.pageName,
          id: item.id,
          url: prop.url2
        })
        // 获取删除后的表格数据
        setTimeout(() => {
          getPageData()
        }, 500)
      } else if (status == 0) {
        store.dispatch('system/undeletePageDataAction', {
          pageName: prop.pageName,
          id: item.id,
          url: prop.url3
        })
        setTimeout(() => {
          getPageData()
        }, 500)
      }
    }
    // 审核
    const handleCheck = async (item: any, status: any) => {
      console.log(status)
      if (status == 0 || status == 1) {
        // 被禁用或者已经审核通过
        console.log('doNoThing')
      } else if (status == 2) {
        checkAnswer(prop.url4, item.id)
        setTimeout(() => {
          getPageData()
        }, 1000)
      }
    }
    const handleUpdate = (item: any) => {
      // console.log(22)
      emit('updateBtnClick', item)
    }

    const handleCreate = () => {
      emit('createBtnClick')
    }
    const computedStatus = (status: any) => {
      if (status == 0) {
        return '禁用'
      } else if (status == 1) {
        return '正常'
      } else if (status == 2) {
        return '待审核'
      }
    }
    const computedStatusStyle = (status: any) => {
      if (status == 0) {
        return 'warning'
      } else if (status == 1) {
        return 'primary'
      } else if (status == 2) {
        return 'success'
      }
    }

    return {
      dataList,
      getPageData,
      pageInfo,
      dataCount,
      OtherSlotNames,
      isCreate,
      isUpdate,
      isDelete,
      isCheck,
      handleDelete,
      handleUpdate,
      handleCreate,
      handleCheck,
      computedStatus,
      computedStatusStyle
    }
  }
})
</script>

<style>
.page-content {
  text-align: center;
  border-top: 20px solid #f5f5f5;
}
</style>
