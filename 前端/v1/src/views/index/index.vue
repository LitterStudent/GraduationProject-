<template>
  <div class="home">
    <el-container class="container">
      <el-aside class="main">
        <aside-nav-header></aside-nav-header>
        <router-view />
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import AsideNavHeader from './cpns/aside_header.vue'
export default {
  name: 'Home',
  components: {
    AsideNavHeader
  },
  setup() {
    console.log(111)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 65px;
  align-content: center;
  justify-content: center;
}
.el-main {
  --el-main-padding: 0;
}
.main {
  width: 900px;
  background-color: white;
  margin-right: 10px;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}
.aside {
  width: 300px;
  background-color: white;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}
</style>
