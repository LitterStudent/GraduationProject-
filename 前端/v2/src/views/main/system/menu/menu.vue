<template>
  <div class="menu">
    <page-search :config="formconfig"></page-search>
    <page-contnet
      pageName="menu"
      :contnetTableConfig="contentTableConfig"
    ></page-contnet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/table.config'
import { formconfig } from './config/form.config'
import PageContnet from '@/components/page-content'
import PageSearch from '@/components/page-search'
export default defineComponent({
  components: {
    PageContnet,
    PageSearch
  },
  name: 'menu',
  setup() {
    return {
      contentTableConfig,
      formconfig
    }
  }
})
</script>

<style scoped></style>
