<template>
  <div class="article">
    <div class="title">{{ me }}的文章</div>
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
import RichContent from '../cpns/rich_content.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { getUserAllArticle, getUserInfo } from '@/service/user/user'
export default {
  components: {
    RichContent
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const pageUserId = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const me = pageUserId == LoginUserId ? ref('我') : ref('他')

    const user = reactive({
      avatar_url: '',
      username: '',
      headline: ''
    })
    const articleList = reactive([])
    getUserAllArticle(pageUserId).then((res) => {
      res.forEach((item) => {
        articleList.push(item)
      })
      console.log(articleList)
    })
    getUserInfo(pageUserId).then((res) => {
      console.log(res)
      user.avatar_url = res.user.avatar_url
      user.username = res.user.username
      user.headline = res.user.headline
    })
    const handleClick = (id) => {
      window.open(`/#/article/${id}`)
    }
    return {
      articleList,
      user,
      me,
      handleClick
    }
  }
}
</script>

<style scoped>
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(133, 144, 166);
  font-size: 16px;
}
</style>
