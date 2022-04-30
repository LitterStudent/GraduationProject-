<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <hd-form v-bind="pageFromConfig" v-model="formData"></hd-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HdForm from '@/base-ui/from'
import { useStore } from 'vuex'
export default defineComponent({
  props: {
    pageFromConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      default: ''
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    HdForm
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})
    const store = useStore()
    const handleConfirm = () => {
      if (Object.keys(props.defaultInfo).length > 0) {
        //  编辑按钮
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建按钮
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          createData: { ...formData, ...props.otherInfo }
        })
      }
      centerDialogVisible.value = false
    }
    watch(
      () => props.defaultInfo,
      (newValue: any) => {
        for (const item of props.pageFromConfig?.formItems) {
          formData.value[item.field] = newValue[item.field]
        }
      }
    )
    return { centerDialogVisible, formData, handleConfirm }
  }
})
</script>

<style></style>
