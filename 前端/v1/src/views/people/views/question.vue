<template>
  <div class="question">
    <div class="title">{{ me }}的提问</div>
    <template v-if="questionList.length > 0">
      <div
        class="question-item"
        v-for="item in questionList"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <h2 class="question-title">
          {{ item.question_name }}
        </h2>
        <div class="question-info">
          <span>{{ item.updated_at }}</span>
          <span class="question-info-m">{{ item.answer_number }}个回答</span>
          <span class="question-info-m">{{ item.follow_num }}个关注</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有任何提问</div>
    </template>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getUserAllQuestion } from '@/service/user/user'
import { formatUtcString } from '@/utils/date-format'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const pageUserId = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const me = pageUserId == LoginUserId ? ref('我') : ref('他')
    const questionList = reactive([])
    getUserAllQuestion(pageUserId).then((res) => {
      res.forEach((item) => {
        item.updated_at = formatUtcString(item.updated_at, 'YYYY-MM-DD ')
        questionList.push(item)
      })
    })
    const handleClick = (id) => {
      window.open(`/#/question/${id}`)
    }
    return {
      me,
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
.question-item {
  cursor: pointer;
  padding: 16px 20px 16px 20px;
}
.question-title {
  font-size: 18px;
  font-weight: 600;
}
.question-info {
  margin-top: 10px;
  font-size: 14px;
  color: #8590a6;
}
.question-info-m {
  margin-left: 10px;
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
