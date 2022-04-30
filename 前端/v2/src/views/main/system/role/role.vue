<template>
  <div class="role">
    <page-search
      v-bind:config="formconfig"
      @searchEvent="handlesearchEvent"
      @resetEvent="handleResetEvent"
    ></page-search>
    <page-contnet
      ref="pageContentRef"
      pageName="role"
      :contnetTableConfig="tableconfig"
      @createBtnClick="handleCreate"
      @updateBtnClick="handleUpdate"
    ></page-contnet>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :defaultInfo="defaultInfo"
      :pageFromConfig="modalconfig"
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
export default defineComponent({
  name: 'role',
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
      handlesearchEvent
    }
  }
})
</script>

<style scoped lang="less">
.tree {
  padding-left: 35px;
}
</style>
