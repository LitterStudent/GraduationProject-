<template>
  <div class="article">
    <page-search
      v-bind:config="formconfig"
      @searchEvent="handlesearchEvent"
      @resetEvent="handleResetEvent"
    ></page-search>
    <page-contnet
      ref="pageContentRef"
      pageName="article"
      url="/article/allArticle"
      url2="/article"
      url3="/article/undelete"
      url4="/article/check"
      :contnetTableConfig="tableconfig"
      @createBtnClick="handleCreate"
      @updateBtnClick="handleUpdate"
    >
      <template #content="scope">
        <el-button type="primary" @click="handleClick(scope.row.id)"
          >查看回答</el-button
        >
      </template>
    </page-contnet>
    <page-modal
      ref="pageModalRef"
      pageName="article"
      :defaultInfo="defaultInfo"
      :pageFromConfig="modalconfig"
      url1="/users"
      url2="/users"
      url3="/article/allArticle"
    >
      <div class="tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
          :otherInfo="otherInfo"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { formconfig } from './config/form.config'
import { tableconfig } from './config/table.config'
import { modalconfig } from './config/modal.config'
import PageSearch from '@/components/page-search'
import PageContnet from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from 'vuex'
import { ElTree } from 'element-plus'
import { menusMapLeafKeys } from '@/utils/map-menus'
import { usePageSearch } from '@/hooks/use-page-search'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'article',
  components: {
    PageSearch,
    PageContnet,
    PageModal
  },
  setup() {
    let [pageContentRef, handleResetEvent, handlesearchEvent] = usePageSearch()
    // modal的配置
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const updatedataCb = (item: any) => {
      // console.log(item)
      const leafKeys = menusMapLeafKeys(item.menuList)
      // console.log(leafKeys)
      nextTick(() => {
        elTreeRef.value!.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleCreate, handleUpdate] =
      usePageModal(updatedataCb, undefined)
    const store = useStore()
    const menus = computed(() => store.state.entireMenus)
    const otherInfo = ref({})
    const handleCheckChange = (obj1: any, obj2: any) => {
      const checkedKeys = obj2.checkedKeys
      const halfCheckedKeys = obj2.halfCheckedKeys
      const menuList = [...halfCheckedKeys, ...checkedKeys]
      otherInfo.value = { menuList }
    }
    const dialogFormVisible = ref(false)
    const router = useRouter()
    const handleClick = (id: any) => {
      // dialogFormVisible.value = true
      // nextTick(() => {
      //   const container = document.querySelector('#text-content')
      //   console.log(container)
      //   container!.innerHTML = content
      // })
      router.push(`/main/system/textview/article/${id}`)
    }
    return {
      formconfig,
      tableconfig,
      pageModalRef,
      defaultInfo,
      handleCreate,
      handleUpdate,
      modalconfig,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef,
      pageContentRef,
      handleResetEvent,
      handlesearchEvent,
      handleClick,
      dialogFormVisible
    }
  }
})
</script>

<style scoped lang="less">
.tree {
  padding-left: 35px;
}
</style>
