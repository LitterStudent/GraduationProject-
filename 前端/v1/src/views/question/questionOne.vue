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
    <div class="main2">
      <question-content
        :item="answerOne"
        :ischeck="answerOne.status === 2"
        :isAnswer="isAnswer"
        @DianZan="hanleDianZan"
      ></question-content>
    </div>
    <div class="mian">
      <div class="answer-num">
        <h4>{{ answerList.length }}个回答</h4>
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
import {
  findQuestionRequest,
  findAllAnswerRequest,
  finOneAnswerRequest,
  finUserAnswerRequest,
  likeAnswer,
  unlikeAnswer,
  userlikeAnswerList
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
    const questionInfo = reactive({ question: {}, topic: {} })
    const answerList = reactive([])
    let answerOne = reactive({
      userInfo: {},
      content: ''
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
        answerOne.status = answer.status
        answerOne.question_id = answer.question_id
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

      // // 如果回答未被审核
      // if (
      //   !answer &&
      //   answerRes &&
      //   answerRes.id == answerId &&
      //   answerRes.user_id === userId
      // ) {
      //   answerOne.status = 2
      //   answerOne.id = answerRes.id
      //   answerOne.content = answerRes.content
      //   answerOne.userInfo = answerRes.userInfo
      //   answerOne.comment_num = answerRes.comment_num
      //   answerOne.favorite_num = answerRes.favorite_num
      //   answerOne.updated_at = formatUtcString(answerRes.updated_at)
      // }
    })
    onMounted(async () => {
      const userLikeAnswerList = await userlikeAnswerList(userId)
      const questionRes = await findQuestionRequest(questionId)
      questionInfo.question = questionRes.question
      questionInfo.topic = questionRes.topic
      const answerListRes = await findAllAnswerRequest(questionInfo.question.id)
      answerListRes.forEach((item) => {
        if (item.id != answerId) {
          answerList.push(item)
        }
      })
      if (answerList.length > 0) {
        answerList.forEach((item) => {
          if (userLikeAnswerList.find((answer) => item.id == answer.id)) {
            item.isDianZan = true
          }
          item.updated_at = formatUtcString(item.updated_at)
        })
      }
      const answer = await finOneAnswerRequest(questionId, answerId)
      // answer的状态为1或者2
      // console.log(answer)
      if (answer) {
        if (userLikeAnswerList.find((item) => item.id == answer.id)) {
          answerOne.isDianZan = true
        }
        answerOne.id = answer.id
        answerOne.status = answer.status
        answerOne.question_id = answer.question_id
        answerOne.content = answer.content
        answerOne.userInfo = answer.userInfo
        answerOne.comment_num = answer.comment_num
        answerOne.favorite_num = answer.favorite_num
        answerOne.updated_at = formatUtcString(answer.updated_at)
      }
      // 查找目前登录用户在该问题下的回答
      const answerRes = await finUserAnswerRequest(questionId, userId)
      if (answerRes && answerRes.status != 0) {
        isWrite.value = true //查看我的答案
        if (answerRes.id == answerId && answerRes.status != 0) {
          isAnswer.value = true //编辑我的答案
        }
      }
    })

    const handlefollow_numberDecre = () => {
      questionInfo.question.follow_number--
    }
    const handlefollow_numberIncre = () => {
      questionInfo.question.follow_number++
    }
    const hanleDianZan = async (answerItem) => {
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
      answerOne,
      isWrite,
      isAnswer,
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
