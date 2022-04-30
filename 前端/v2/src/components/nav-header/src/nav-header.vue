<template>
  <div class="nav-header">
    <el-icon :size="25" class="fold-menu" @click="foldChange">
      <expand v-if="!isFold"></expand>
      <fold v-if="isFold"></fold>
    </el-icon>
    <div class="content">
      <div>
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      </div>
      <div class="avatar">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            {{ userName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLoginOut">
                退出登录
                <el-icon class="el-icon--right"><close /></el-icon>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Breadcrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { pathmapBreadcrumb } from '@/utils/map-menus'
import localStorage from '@/utils/cache'
export default defineComponent({
  components: {
    Breadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const userName = computed(() => store.state.login.userInfo.name)
    let isFold = ref(false)
    const foldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      return pathmapBreadcrumb(userMenus, route)
    })
    const handleLoginOut = () => {
      localStorage.clearCache()
      router.push('/login')
    }
    return {
      isFold,
      foldChange,
      userName,
      breadcrumbs,
      handleLoginOut
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold-menu {
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .el-dropdown-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
