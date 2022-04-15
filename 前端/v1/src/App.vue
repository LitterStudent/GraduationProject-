<template>
  <el-container>
    <el-header class="header">
      <nav-header></nav-header>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
import NavHeader from '@/components/nav_header_user'

export default {
  components: { NavHeader }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(246, 246, 246);
}
.header {
  width: 100%;
  height: 50px !important;
  position: fixed;
  background-color: white;
  z-index: 999;
}
</style>
