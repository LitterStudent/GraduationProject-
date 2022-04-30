<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCoolapse ? '50px' : '210px'">
        <nav-menu :collapse="isCoolapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCoolapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCoolapse.value = isFold
    }
    return { handleFoldChange, isCoolapse }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}

.page-content {
  background-color: rgb(242, 241, 246);
  height: calc(100% - 48px);
  .page-info {
    background-color: white;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
}
</style>
