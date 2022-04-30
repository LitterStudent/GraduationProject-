<template>
  <div class="category">
    <page-search :config="formconfig"></page-search>
    <page-contnet
      pageName="category"
      :contnetTableConfig="contentTableConfig"
      @createBtnClick="handleCreate"
      @updateBtnClick="handleUpdate"
    ></page-contnet>
    <page-modal ref="pageModalRef" :pageFromConfig="modalconfig"></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContnet from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { formconfig } from './config/form.config'
import { contentTableConfig } from './config/table.config'
import { modalconfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContnet,
    PageModal
  },
  setup() {
    const [pageModalRef, defaultInfo, handleCreate, handleUpdate] =
      usePageModal()
    return {
      pageModalRef,
      formconfig,
      contentTableConfig,
      modalconfig,
      handleCreate,
      handleUpdate
    }
  }
})
</script>

<style scoped></style>
