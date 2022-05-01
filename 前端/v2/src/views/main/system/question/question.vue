<template>
  <div class="question">
    <page-search
      :config="formconfig"
      @resetEvent="handleResetEvent"
      @searchEvent="handlesearchEvent"
    ></page-search>
    <page-contnet
      ref="pageContentRef"
      pageName="question"
      url="/questions/adminfind"
      url2="/questions"
      url3="/questions/undelete"
      :contnetTableConfig="contentTableConfig"
      @updateBtnClick="handleUpdate"
      @createBtnClick="handleCreate"
    ></page-contnet>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="question"
      :pageFromConfig="modalconfig"
      url1="/questions"
      url2="/questions"
      url3="/questions/adminfind"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formconfig } from './config/form.config'
import { modalconfig } from './config/modal.config'
import { contentTableConfig } from './config/table.config'
import PageContnet from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { getAllTopic } from '@/service/main/system/system'
export default defineComponent({
  components: {
    PageContnet,
    PageSearch,
    PageModal
  },
  name: 'question',
  setup() {
    let [pageContentRef, handleResetEvent, handlesearchEvent] = usePageSearch()
    // 点击更新按钮的初始化回答
    const updateCb = async (item: any) => {
      const passwordItem = modalconfig.formItems.find((item) => {
        return item.field === 'topic_name'
      })
      const res = await getAllTopic()
      const topicList: any = res.data.map((item: any) => {
        return { label: item.topic_name, value: item.id }
      })
      passwordItem!.options = topicList
    }

    // 点击创建按钮的初始化回答
    const createCb = async () => {
      const passwordItem = modalconfig.formItems.find((item) => {
        return item.field === 'topic_name'
      })
      const res = await getAllTopic()
      const topicList: any = res.data.map((item: any) => {
        return { label: item.topic_name, value: item.id }
      })
      passwordItem!.options = topicList
    }
    let [pageModalRef, defaultInfo, handleCreate, handleUpdate] = usePageModal(
      updateCb,
      createCb
    )
    return {
      contentTableConfig,
      formconfig,
      modalconfig,
      pageContentRef,
      handleResetEvent,
      handlesearchEvent,
      pageModalRef,
      defaultInfo,
      handleCreate,
      handleUpdate
    }
  }
})
</script>

<style scoped></style>
