<template>
  <div class="app">
    <!-- <router-link to="/login">login</router-link>
    <router-link to="/main">main</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 导出的组件都需要 defineComponent 进行一层包裹
export default defineComponent({
  name: 'App',
  components: {
    // ElButton
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
