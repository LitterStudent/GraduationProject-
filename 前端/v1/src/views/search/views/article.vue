<template>
  <div class="article">
    <div v-if="articleList.length > 0">
      <rich-content
        v-for="item in articleList"
        :key="item.id"
        :item="item"
        :user="user"
        @click="handleClick(item.id)"
      ></rich-content>
    </div>
    <template v-else>
      <div class="none-box">还没有任何文章</div>
    </template>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleList } from '@/service/user/user'

export default {
  setup() {
    const route = useRoute()
    const articleList = reactive([])
    watch(
      route,
      () => {
        const keyword = route.query.keyword
        console.log(keyword)
        getArticleList(keyword).then((res) => {
          console.log(res)
        })
      },
      {
        deep: true,
        immediate: true
      }
    )
    return {
      articleList
    }
  }
}
</script>

<style scoped>
.article {
  margin-top: 10px;
  margin-left: 350px;
}
.title {
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 600;
  padding: 2px 20px 2px 20px;
  border-bottom-color: rgb(240, 242, 247);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.article-item {
  padding: 16px 20px 16px 20px;
}
.none-box {
  height: 300px;
  margin-left: 300px;
  margin-top: 200px;
  color: rgb(133, 144, 166);
  font-size: 16px;
}
</style>
