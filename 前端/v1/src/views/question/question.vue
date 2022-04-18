<template>
  <div class="quesiton">
    <question-header :questionInfo="questionInfo"></question-header>
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
import { findQuestionRequest, findAllAnswerRequest } from '@/service/user/user'
import { onMounted, reactive } from 'vue'
import { formatUtcString } from '@/utils/date-format'
export default {
  components: {
    QuestionHeader,
    QuestionContent
  },
  created() {},
  setup() {
    const route = useRoute()
    const questionId = route.params.id
    const questionInfo = reactive({ question: {}, topic: {} })
    const answerList = reactive([])
    onMounted(async () => {
      const res = await findQuestionRequest(questionId)
      questionInfo.question = res.question
      questionInfo.topic = res.topic
      console.log(questionInfo)
      const res2 = await findAllAnswerRequest(questionInfo.question.id)
      console.log(res2)
      res2.forEach((item) => {
        answerList.push(item)
      })
      console.log(answerList)
      if (res2.length > 0) {
        answerList.forEach((item) => {
          item.updated_at = formatUtcString(item.updated_at)
        })
      }
    })

    return { questionInfo, answerList }
  }
}
</script>

<style scoped>
.quesiton {
  margin-top: 50px;
}
.mian {
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
</style>
