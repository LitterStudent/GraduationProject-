<template>
  <div class="followquestion">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <template v-if="questionList.length > 0">
      <div
        class="qestion-item"
        v-for="item in questionList"
        :key="item.id"
        @click="handleClick(item)"
      >
        <h2 class="qestion-item-title">
          {{ item.question_name }}
        </h2>
        <div class="question-item-status">
          <span>{{ item.created_at }}</span>
          <span style="margin: 0 15px">{{ item.answer_number }} 个回答</span>
          <span>{{ item.follow_number }} 个关注</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有关注任何问题</div>
    </template>
  </div>
</template>
<script>
import AsideHeader from '../cpns/aside_header2.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getUserFollowQuestionList } from '@/service/user/user'
import { reactive } from 'vue'
import { formatUtcString } from '@/utils/date-format'
export default {
  components: {
    AsideHeader
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const userId = route.params.id
    const loginUserId = store.state.login.userInfo.id
    const me = loginUserId == userId ? '我' : '他'
    const menus = [
      { index: 1, value: `${me}关注的人`, url: `/people/${userId}/follow` },
      { index: 2, value: `关注${me}的人`, url: `/people/${userId}/follower` },
      {
        index: 3,
        value: `${me}关注的问题`,
        url: `/people/${userId}/followquestion`
      },
      {
        index: 4,
        value: `${me}关注的专栏`,
        url: `/people/${userId}/followcolumn`
      },
      {
        index: 5,
        value: `${me}关注的话题`,
        url: `/people/${userId}/followtopic`
      }
    ]
    const defaultActive = '3'
    const questionList = reactive([])
    getUserFollowQuestionList(userId).then((res) => {
      res.forEach((item) => {
        item.created_at = formatUtcString(item.created_at, 'YYYY-MM-DD')
        questionList.push(item)
      })
    })
    const handleClick = (item) => {
      window.open(`/#/question/${item.id}`)
    }
    return {
      menus,
      defaultActive,
      questionList,
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
.qestion-item {
  cursor: pointer;
  padding: 16px 20px;
}
.qestion-item-title {
  font-size: 18px;
  font-weight: 600;
}
.question-item-status {
  margin-top: 10px;
  font-size: 14px;
  color: #8590a6;
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
