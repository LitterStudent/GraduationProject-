<template>
  <div class="search">
    <div class="search-header">
      <aside-header :menus="menus"></aside-header>
    </div>
  </div>
  <div class="search-result">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AsideHeader from './cpns/aside_header.vue'
export default {
  components: {
    AsideHeader
  },
  setup() {
    const route = useRoute()
    const menus = computed(() => {
      const keyword = route.query.keyword
      const menus = [
        {
          index: '1',
          value: '问题',
          url: `/search/question?keyword=${keyword}`
        },
        {
          index: '2',
          value: '文章',
          url: `/search/article?keyword=${keyword}`
        },
        {
          index: '3',
          value: '话题',
          url: `/search/topic?keyword=${keyword}`
        },
        {
          index: '4',
          value: '专栏',
          url: `/search/column?keyword=${keyword}`
        },
        {
          index: '5',
          value: '用户',
          url: `/search/user?keyword=${keyword}`
        }
      ]
      return menus
    })
    return {
      menus
    }
  }
}
</script>

<style scoped>
.search {
  width: 100%;
  /* margin-left: 400px; */
  margin-top: 60px;
  background-color: rgb(255, 255, 255);
}
.search-header {
  /* width: 100%; */
  margin-left: 360px;
  /* background-color: red; */
}
.search-result {
  /* width: 70%; */
  /* margin-left: 550px; */
}
</style>
