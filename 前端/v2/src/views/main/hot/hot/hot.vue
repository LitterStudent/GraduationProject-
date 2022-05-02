<template>
  <div class="hot">
    <page-search
      :config="formconfig"
      @resetEvent="handleResetEvent"
      @searchEvent="handlesearchEvent"
    ></page-search>
    <!-- 1查询 2删除 3取消删除 -->

    <page-contnet
      pageName="hot"
      ref="pageContentRef"
      :contnetTableConfig="contentTableConfig"
      @createBtnClick="handleCreate"
      @updateBtnClick="handleUpdate"
      url="/rank/adminfind"
      url2="/rank/delete"
      url3="/rank/undelete"
    >
      <template #cover="scope">
        <el-image :src="scope.row.cover_url" cover="cover"></el-image>
      </template>
    </page-contnet>
    <!-- 1修改 2.新增 3.查询 -->
    <page-modal
      ref="pageModalRef"
      pageName="hot"
      :pageFromConfig="modalconfig"
      :defaultInfo="defaultInfo"
      url1="/rank"
      url2="/rank"
      url3="/rank/adminfind"
    ></page-modal>
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
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { getAllQuestion } from '@/service/main/system/system'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContnet,
    PageModal
  },
  setup() {
    let [pageContentRef, handleResetEvent, handlesearchEvent] = usePageSearch()
    // 点击更新按钮的初始化回答
    const updateCb = async (item: any) => {
      const passwordItem = modalconfig.formItems.find((item) => {
        return item.field === 'question_name'
      })
      const res = await getAllQuestion()
      const topicList: any = res.data.map((item: any) => {
        return { label: item.question_name, value: item.question_name }
      })
      passwordItem!.options = topicList
    }

    // 点击创建按钮的初始化回答
    const createCb = async () => {
      const passwordItem = modalconfig.formItems.find((item) => {
        return item.field === 'question_name'
      })
      const res = await getAllQuestion()
      const topicList: any = res.data.map((item: any) => {
        return { label: item.question_name, value: item.question_name }
      })
      passwordItem!.options = topicList
    }
    const [pageModalRef, defaultInfo, handleCreate, handleUpdate] =
      usePageModal(updateCb, createCb)
    return {
      pageModalRef,
      defaultInfo,
      formconfig,
      contentTableConfig,
      modalconfig,
      handleCreate,
      handleUpdate,
      pageContentRef,
      handleResetEvent,
      handlesearchEvent
    }
  }
})
</script>

<style scoped></style>
