<template>
  <el-container>
    <el-header class="header" v-if="!isLogin">
      <nav-header></nav-header>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
import NavHeader from '@/components/nav_header_user'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
export default {
  components: { NavHeader },
  setup() {
    const isLogin = ref(false)
    const route = useRoute()
    watch(route, () => {
      if (route.path === '/login') {
        isLogin.value = true
      } else {
        isLogin.value = false
      }
    })
    return {
      isLogin
    }
  }
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
