<template>
  <div class="goods">
    <page-search :config="formconfig"></page-search>
    <pageContnet pageName="goods" :contnetTableConfig="contentTableConfig">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </pageContnet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContnet from '@/components/page-content'
import { contentTableConfig } from './config/table.config'
import { formconfig } from './config/form.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContnet,
    PageSearch
  },
  setup() {
    console.log(contentTableConfig)
    return { contentTableConfig, formconfig }
  }
})
</script>

<style scoped></style>
