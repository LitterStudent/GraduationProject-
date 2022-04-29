<template>
  <div class="quesiton">
    <question-header
      :questionInfo="questionInfo"
      :isWrite="isWrite"
      :isAnswer="isAnswer"
      :answerOne="answerOne"
      :questionId="questionId"
      @follow_numberDecre="handlefollow_numberDecre"
      @follow_numberIncre="handlefollow_numberIncre"
    ></question-header>
    <div class="mian">
      <div class="answer-num">
        <h4>共有 {{ answerList.length }} 个回答</h4>
      </div>
      <template v-for="item in answerList" :key="item.id">
        <question-content
          :item="item"
          @DianZan="hanleDianZan"
        ></question-content>
      </template>
    </div>
  </div>
</template>

<script>
import QuestionHeader from './cpns/header.vue'
import QuestionContent from './cpns/content.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  findQuestionRequest,
  findAllAnswerRequest,
  finUserAnswerRequest,
  likeAnswer,
  unlikeAnswer,
  userlikeAnswerList
} from '@/service/user/user'
import { onMounted, reactive, ref } from 'vue'
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
    const store = useStore()
    const userId = store.state.login.userInfo.id
    let answerOne = reactive({
      userInfo: {}
    })
    const isWrite = ref(false)
    const isAnswer = ref(false)
    onMounted(async () => {
      const userLikeAnswerList = await userlikeAnswerList(userId)
      const res = await findQuestionRequest(questionId)
      questionInfo.question = res.question
      questionInfo.topic = res.topic
      const res2 = await findAllAnswerRequest(questionInfo.question.id)
      console.log(res2)
      res2.forEach((item) => {
        answerList.push(item)
      })
      console.log(answerList)
      if (res2.length > 0) {
        answerList.forEach((item) => {
          if (userLikeAnswerList.find((answer) => item.id == answer.id)) {
            item.isDianZan = true
          }
          item.updated_at = formatUtcString(item.updated_at)
        })
      }

      const answerRes = await finUserAnswerRequest(questionId, userId)
      console.log(answerRes)
      if (answerRes.status == 1 || answerRes.status == 2) {
        isWrite.value = true
        console.log(answerRes)
        answerOne.status = answerRes.status
        answerOne.id = answerRes.id
        answerOne.content = answerRes.content
        answerOne.userInfo = answerRes.userInfo
        answerOne.comment_num = answerRes.comment_num
        answerOne.favorite_num = answerRes.favorite_num
        answerOne.updated_at = formatUtcString(answerRes.updated_at)
      }
    })

    const handlefollow_numberDecre = () => {
      questionInfo.question.follow_number--
    }
    const handlefollow_numberIncre = () => {
      questionInfo.question.follow_number++
    }
    const hanleDianZan = async (answerItem) => {
      console.log(answerItem.isDianZan)
      if (
        answerItem.isDianZan === false ||
        answerItem.isDianZan === undefined
      ) {
        // 点赞
        answerItem.isDianZan = true
        answerItem.favorite_num++
        await likeAnswer(answerItem.id)
      } else {
        // 取消点赞
        answerItem.isDianZan = false
        answerItem.favorite_num--
        await unlikeAnswer(answerItem.id)
      }
    }
    return {
      questionInfo,
      answerList,
      isWrite,
      isAnswer,
      answerOne,
      questionId,
      handlefollow_numberDecre,
      handlefollow_numberIncre,
      hanleDianZan
    }
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
