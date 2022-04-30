<template>
  <div class="page-search">
    <hd-form v-bind="config" v-model="formData">
      <template #header> </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleReset" size="large">重置</el-button>
          <el-button @click="handleSearch" type="primary" size="large"
            >搜索</el-button
          >
        </div>
      </template>
    </hd-form>
  </div>
</template>

<script lang="ts">
import HdForm from '@/base-ui/from'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    HdForm
  },
  props: {
    config: {
      type: Object,
      require: true
    }
  },
  emits: ['searchEvent', 'resetEvent'],
  setup(props, { emit }) {
    const propList = props.config?.formItems ?? []
    const refObj: any = {}
    propList.forEach((value: any) => {
      refObj[value.field] = ''
    })
    let formData = ref(refObj)

    const handleReset = () => {
      formData.value = refObj
      emit('resetEvent')
      // for (const key in refObj) {
      //   formData.value[key] = refObj[key]
      // }
      // console.log(formData.value.name)
    }
    const handleSearch = () => {
      emit('searchEvent', formData.value)
    }
    return { formData, handleReset, handleSearch }
  }
})
</script>

<style>
.footer {
  text-align: right;
  padding: 10px 10px;
}
</style>
