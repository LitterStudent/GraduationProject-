<template>
  <div class="aside_header">
    <el-menu
      :default-active="'2'"
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
  setup() {
    const menus = [
      { index: '1', value: '关注', url: '/follow' },
      { index: '2', value: '推荐', url: '/' },
      { index: '3', value: '热榜', url: '/hot' }
    ]
    const router = useRouter()
    const handleCilck = (menuItem) => {
      console.log(menuItem)
      router.push({
        path: menuItem.url
      })
    }
    return { menus, handleCilck }
  }
}
</script>

<style scoped>
.aside_header {
  width: 100%;
  height: 58px;
  color: rgb(18, 18, 18);
  font-size: 16px;
  font-weight: 500;
  display: flex;
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
}
</style>
