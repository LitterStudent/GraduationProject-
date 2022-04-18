<template>
  <div class="quesiton">
    <question-header
      :questionInfo="questionInfo"
      :isWrite="isWrite"
      :isAnswer="isAnswer"
      :answerOne="answerOne"
    ></question-header>
    <div class="main2">
      <question-content
        :item="answerOne"
        :ischeck="answerOne.status === 2"
      ></question-content>
    </div>
    <div class="mian">
      <div class="answer-num">
        <h4>{{ answerList.length }}个回答</h4>
      </div>
      <template v-for="item in answerList" :key="item.id">
        <question-content :item="item"></question-content>
      </template>
    </div>
  </div>
</template>

<script>
import QuestionHeader from './cpns/header.vue'
import QuestionContent from './cpns/content.vue'
import { useRoute } from 'vue-router'
import {
  findQuestionRequest,
  findAllAnswerRequest,
  finOneAnswerRequest,
  finUserAnswerRequest
} from '@/service/user/user'
import { onMounted, reactive, ref, watch } from 'vue'
import { formatUtcString } from '@/utils/date-format'
import { useStore } from 'vuex'
export default {
  components: {
    QuestionHeader,
    QuestionContent
  },
  created() {},
  setup() {
    const route = useRoute()
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const questionId = route.params.id
    let answerId = route.params.id2
    // console.log(answerId)
    const questionInfo = reactive({ question: {}, topic: {} })
    const answerList = reactive([])
    let answerOne = reactive({
      userInfo: {}
    })
    const isWrite = ref(false)
    const isAnswer = ref(false)

    watch(route, async () => {
      answerId = route.params.id2
      const answerListRes = await findAllAnswerRequest(questionInfo.question.id)
      answerList.length = 0
      answerListRes.forEach((item) => {
        if (item.id != answerId) {
          answerList.push(item)
        }
      })
      if (answerList.length > 0) {
        answerList.forEach((item) => {
          item.updated_at = formatUtcString(item.updated_at)
        })
      }
      const answer = await finOneAnswerRequest(questionId, answerId)
      if (answer) {
        answerOne.id = answer.id
        answerOne.content = answer.content
        answerOne.userInfo = answer.userInfo
        answerOne.comment_num = answer.comment_num
        answerOne.favorite_num = answer.favorite_num
        answerOne.updated_at = formatUtcString(answer.updated_at)
      }

      const answerRes = await finUserAnswerRequest(questionId, userId)
      if (answerRes) {
        isWrite.value = true
        if (answerRes.id == answerId) {
          isAnswer.value = true
        }
      }

      // 如果回答未被审核
      if (
        !answer &&
        answerRes &&
        answerRes.id == answerId &&
        answerRes.user_id === userId
      ) {
        console.log(answerRes)
        answerOne.status = 2
        answerOne.id = answerRes.id
        answerOne.content = answerRes.content
        answerOne.userInfo = answerRes.userInfo
        answerOne.comment_num = answerRes.comment_num
        answerOne.favorite_num = answerRes.favorite_num
        answerOne.updated_at = formatUtcString(answerRes.updated_at)
      }
    })
    onMounted(async () => {
      const questionRes = await findQuestionRequest(questionId)
      questionInfo.question = questionRes.question
      questionInfo.topic = questionRes.topic
      console.log(questionInfo)
      const answerListRes = await findAllAnswerRequest(questionInfo.question.id)
      console.log(answerListRes)
      answerListRes.forEach((item) => {
        if (item.id != answerId) {
          answerList.push(item)
        }
      })
      // console.log(answerList)
      if (answerList.length > 0) {
        answerList.forEach((item) => {
          item.updated_at = formatUtcString(item.updated_at)
        })
      }
      const answer = await finOneAnswerRequest(questionId, answerId)
      // console.log(answer)
      if (answer) {
        answerOne.id = answer.id
        answerOne.content = answer.content
        answerOne.userInfo = answer.userInfo
        answerOne.comment_num = answer.comment_num
        answerOne.favorite_num = answer.favorite_num
        answerOne.updated_at = formatUtcString(answer.updated_at)
      }

      const answerRes = await finUserAnswerRequest(questionId, userId)
      if (answerRes) {
        isWrite.value = true
        if (answerRes.id == answerId) {
          isAnswer.value = true
        }
      }

      // 如果回答未被审核
      if (
        !answer &&
        answerRes &&
        answerRes.id == answerId &&
        answerRes.user_id === userId
      ) {
        console.log(answerRes)
        answerOne.status = 2
        answerOne.id = answerRes.id
        answerOne.content = answerRes.content
        answerOne.userInfo = answerRes.userInfo
        answerOne.comment_num = answerRes.comment_num
        answerOne.favorite_num = answerRes.favorite_num
        answerOne.updated_at = formatUtcString(answerRes.updated_at)
      }
    })

    return { questionInfo, answerList, answerOne, isWrite, isAnswer }
  }
}
</script>

<style scoped>
.quesiton {
  margin-top: 50px;
}
.mian,
.main2 {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.answer-num {
  width: 900px;
  height: 49px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.anwer-one {
  width: 900px;
  height: 49px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
}
</style>
