<template>
  <div class="topic">
    <page-search
      :config="formconfig"
      @resetEvent="handleResetEvent"
      @searchEvent="handlesearchEvent"
    ></page-search>
    <page-contnet
      ref="pageContentRef"
      pageName="topic"
      url="/topics/adminfind"
      url2="/topics/delete"
      url3="/topics/undelete"
      :contnetTableConfig="contentTableConfig"
      @createBtnClick="handleCreate"
      @updateBtnClick="handleUpdate"
    >
      <template #picture="scope">
        <el-image
          :src="scope.row.avatar_url"
          style="width: 100px; height: 100px"
          :fit="'fit'"
        ></el-image>
      </template>
    </page-contnet>
    <page-modal
      :defaultInfo="defaultInfo"
      pageName="topic"
      url1="/topics"
      url2="/topics"
      url3="/topics/adminfind"
      ref="pageModalRef"
      :pageFromConfig="modalconfig"
    >
    </page-modal>
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
import { usePageSearch } from '@/hooks/use-page-search'
export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContnet,
    PageModal
  },
  setup() {
    let [pageContentRef, handleResetEvent, handlesearchEvent] = usePageSearch()
    const [pageModalRef, defaultInfo, handleCreate, handleUpdate] =
      usePageModal()
    console.log(111)
    const handleCoverSuccess = (res: any) => {
      console.log(res)
      console.log(defaultInfo)
      defaultInfo.avatar_url = res.data.url
    }
    return {
      pageModalRef,
      formconfig,
      contentTableConfig,
      defaultInfo,
      modalconfig,
      handleCreate,
      handleUpdate,
      pageContentRef,
      handleResetEvent,
      handlesearchEvent,
      handleCoverSuccess
    }
  }
})
</script>

<style scoped></style>
