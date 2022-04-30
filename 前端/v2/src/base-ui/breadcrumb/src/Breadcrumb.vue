<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { IBreadItem } from '../type'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadItem[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style></style>
