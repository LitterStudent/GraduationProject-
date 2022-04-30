<template>
  <div class="topic">
    <page-search
      :config="formconfig"
      @resetEvent="handleResetEvent"
      @searchEvent="handlesearchEvent"
    ></page-search>
    <page-contnet
      pageName="topic"
      url="/topics/adminfind"
      url2="/users"
      url3="/users/undelete"
      :contnetTableConfig="contentTableConfig"
      @createBtnClick="handleCreate"
      @updateBtnClick="handleUpdate"
    >
      <template #picture="scope">
        <el-image
          :src="scope.row.avatar_url"
          style="width: 100px; height: 100px"
          :fit="fit"
        ></el-image>
      </template>
    </page-contnet>
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
