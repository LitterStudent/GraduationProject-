<template>
  <div class="aside_header">
    <el-menu
      :default-active="'1'"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
    >
      <template v-for="item in menus" :key="item.index">
        <el-menu-item :index="item.index" @click="handleCilck(item)">
          {{ item.value }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: ['menus'],
  setup() {
    const router = useRouter()
    const handleCilck = (menuItem) => {
      console.log(menuItem)
      router.push({
        path: menuItem.url
      })
    }
    return { handleCilck }
  }
}
</script>

<style scoped>
.aside_header {
  width: 95%;
  height: 38px;
  color: rgb(18, 18, 18);
  font-size: 16px;
  font-weight: 500;
  display: flex;
  padding-top: 10px;
  margin-left: 10px;
  border-bottom-color: rgb(240, 242, 247);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.el-menu-demo {
  widows: 100%;
}
.el-menu-item {
  color: rgb(18, 18, 18) !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  margin-right: 25px;
  height: 30px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid rgb(0, 102, 255);
  color: black !important;
  font-weight: 700 !important;
}
.el-menu--horizontal {
  border-bottom: none !important;
}
</style>
