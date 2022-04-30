<template>
  <div class="department">
    <h2>{{ msg }}</h2>
    <page-search :config="formconfig"></page-search>
    <page-contnet
      pageName="department"
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
    console.log(111)
    let msg = 1111122334
    return {
      pageModalRef,
      formconfig,
      contentTableConfig,
      modalconfig,
      handleCreate,
      handleUpdate,
      msg
    }
  }
})
</script>

<style scoped></style>
