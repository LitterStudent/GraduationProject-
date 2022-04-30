<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo " />
      <span v-if="!collapse" class="title">VUE3Admin</span>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      class=""
      :collapse="collapse"
      :default-active="defaultActiveMenu"
      text-color="#fff"
      background-color="#0c2135"
    >
      <template v-for="item in userMenus" :key="item.key">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <setting v-if="item.icon === 'el-icon-setting'"></setting>
                <monitor v-if="item.icon === 'el-icon-monitor'"></monitor>
                <goods v-if="item.icon === 'el-icon-goods'"></goods>
                <chat-line-round
                  v-if="item.icon === 'el-icon-chat-line-round'"
                ></chat-line-round>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleClick(subitem)"
              >
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathmapMenu } from '@/utils/map-menus'
export default defineComponent({
  name: 'nav-menu',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // vuex
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    console.log(store)
    // vue-router
    const router = useRouter()
    const handleClick = (subitem: any) => {
      router.push({
        path: subitem.url ?? '404'
      })
    }
    const route = useRoute()
    const menu = pathmapMenu(userMenus.value, route)
    const defaultActiveMenu = menu.id + ''
    // console.log(defaultActiveMenu)
    return { userMenus, handleClick, defaultActiveMenu }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin-left: 7px;
      margin-right: 25px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
