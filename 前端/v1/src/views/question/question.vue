<template>
  <div class="quesiton">
    <question-header :questionInfo="questionInfo"></question-header>
    <div class="mian">
      <div class="answer-num">
        <h4>499个回答</h4>
      </div>
      <question-content></question-content>
      <question-content></question-content>
      <question-content></question-content>
      <question-content></question-content>
      <question-content></question-content>
    </div>
  </div>
</template>

<script>
import QuestionHeader from './cpns/header.vue'
import QuestionContent from './cpns/content.vue'
import { useRoute } from 'vue-router'
import { findQuestionRequest } from '@/service/user/user'
import { onMounted, reactive } from 'vue'
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
    onMounted(async () => {
      const res = await findQuestionRequest(questionId)
      questionInfo.question = res.question
      questionInfo.topic = res.topic
      console.log(questionInfo)
    })
    return { questionInfo }
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
