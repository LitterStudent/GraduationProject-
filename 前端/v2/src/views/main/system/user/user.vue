<template>
  <div class="user">
    <page-search
      v-bind:config="formconfig"
      @resetEvent="handleResetEvent"
      @searchEvent="handlesearchEvent"
    ></page-search>
    <page-contnet
      ref="pageContentRef"
      pageName="users"
      url="/users"
      url2="/users"
      :contnetTableConfig="tableconfig"
      @updateBtnClick="handleUpdate"
      @createBtnClick="handleCreate"
    >
      <template #gender="scope">
        {{ scope.row.gender == 0 ? '男' : '女' }}
      </template>
    </page-contnet>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :pageFromConfig="modalconfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { formconfig } from './config/form.config'
import { tableconfig } from './config/table.config'
import { modalconfig } from './config/modal.config'
import PageSearch from '@/components/page-search'
import PageContnet from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContnet,
    PageModal
  },
  setup() {
    let [pageContentRef, handleResetEvent, handlesearchEvent] = usePageSearch()
    // 更新时隐藏password 输入项
    const updateCb = () => {
      const passwordItem = modalconfig.formItems.find((item) => {
        return item.field === 'password'
      })
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    const createCb = () => {
      const passwordItem = modalconfig.formItems.find((item) => {
        return item.field === 'password'
      })
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    let [pageModalRef, defaultInfo, handleCreate, handleUpdate] = usePageModal(
      updateCb,
      createCb
    )
    const modalconfigRef = computed(() => {
      const store = useStore()
      const departmentItem = modalconfig.formItems.find((item) => {
        return item.field === 'departmentId'
      })
      const roleItem = modalconfig.formItems.find((item) => {
        return item.field === 'roleId'
      })

      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { label: item.name, value: item.id }
        }
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { label: item.name, value: item.id }
      })
      return modalconfig
    })
    return {
      formconfig,
      tableconfig,
      modalconfigRef,
      pageContentRef,
      handlesearchEvent,
      handleResetEvent,
      pageModalRef,
      handleUpdate,
      handleCreate,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
