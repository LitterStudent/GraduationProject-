<template>
  <div class="index">
    <div class="title">{{ me }}的动态</div>
    <div class="content-item" v-for="item in resList" :key="item.id">
      <template v-if="item.type == 0">
        <div class="action-inco">
          赞同了回答
          <span style="margin-left: 460px">{{ item.created_at }}</span>
        </div>
        <rich-content
          v-bind:item="item.answer"
          :user="item.user"
          :question="item.question"
          @click="handleClickQuestion(item)"
        ></rich-content>
      </template>
      <template v-else-if="item.type == 1">
        <div class="action-inco">
          赞同了文章
          <span style="margin-left: 460px">{{ item.created_at }}</span>
        </div>
        <rich-content
          v-bind:item="item.article"
          :user="item.user"
          @click="handleClickArticle(item)"
        ></rich-content>
      </template>
      <template v-else-if="item.type == 2">
        <div class="action-inco">
          回答了问题
          <span style="margin-left: 460px">{{ item.created_at }}</span>
        </div>
        <rich-content
          v-bind:item="item.answer"
          :user="item.user"
          :question="item.question"
          @click="handleClickQuestion(item)"
        ></rich-content>
      </template>
      <template v-else-if="item.type == 3">
        <div class="action-inco">
          创作了文章
          <span style="margin-left: 460px">{{ item.created_at }}</span>
        </div>
        <rich-content
          v-bind:item="item.article"
          :user="item.user"
          @click="handleClickArticle(item)"
        ></rich-content>
      </template>
    </div>
    <div class="content-item2" v-if="resList.length == 0">还没有任何动态</div>
  </div>
</template>

<script>
import RichContent from '../cpns/rich_content.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { getUserDynamic } from '@/service/user/user'
export default {
  components: { RichContent },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    console.log(router)
    const pageUserId = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const me = pageUserId == LoginUserId ? ref('我') : ref('他')
    const resList = reactive([])
    getUserDynamic(pageUserId).then((res) => {
      console.log(res)
      res.forEach((item) => resList.push(item))
    })
    const handleClickQuestion = (item) => {
      window.open(`/#/question/${item.question.id}/answer/${item.answer.id}`)
    }
    const handleClickArticle = (item) => {
      window.open(`/#/article/${item.article.id}`)
    }
    return {
      me,
      resList,
      handleClickQuestion,
      handleClickArticle
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
.action-inco {
  margin-top: 20px;
  margin-left: 20px;
  color: #8590a6;
  font-size: 14px;
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
.content-item2 {
  margin: 100px 0;
  text-align: center;
}
</style>
