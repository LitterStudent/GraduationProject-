<template>
  <div class="question-search">
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
          <span>{{ item.created_at }}</span>
          <span class="question-info-m">{{ item.answer_number }}个回答</span>
          <span class="question-info-m">{{ item.follow_number }}个关注</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有相关的提问</div>
    </template>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getQuestionList } from '@/service/user/user'
export default {
  setup() {
    const route = useRoute()
    let questionList = reactive([])
    let currentPage = 1
    watch(
      route,
      async () => {
        const keyword = route.query.keyword
        const resultList = await getQuestionList(keyword, currentPage)
        // questionList = reactive([])
        questionList.length = 0
        resultList.forEach((item) => {
          questionList.push(item)
        })
      },
      {
        deep: true,
        immediate: true
      }
    )
    const handleClick = (id) => {
      window.open(`/#/question/${id}`)
    }
    return {
      questionList,
      handleClick
    }
  }
}
</script>

<style scoped>
.question-search {
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
.question-item {
  width: 800px;
  margin: 10px 0;
  background: rgb(255, 255, 255);
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
  margin: 300px;
  /* width: 100%; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  color: rgb(133, 144, 166);
  font-size: 16px;
}
</style>
