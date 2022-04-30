<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="提示"
      width="30%"
      center
      destroy-on-close
    >
      <hd-form v-bind="pageFromConfig" v-model="formData"></hd-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">确定</el-button>
          <el-button type="primary" @click="handleConfirm">取消</el-button>
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
    },
    url1: {
      type: String, //修改
      required: false
    },
    url2: {
      type: String, //删除
      required: false
    },
    url3: {
      type: String, //查询
      required: false
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
          url: props.url1,
          url3: props.url3,
          editData: { ...formData, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建按钮
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          url: props.url2,
          url3: props.url3,
          createData: { ...formData, ...props.otherInfo, password: '123456' }
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
