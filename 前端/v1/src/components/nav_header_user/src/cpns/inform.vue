<template>
  <el-dropdown class="inform" trigger="click">
    <el-badge :value="noReadNum" @click="handleClick">
      <el-icon style="font-size: 26px"><bell-filled /></el-icon>
    </el-badge>
    <template #dropdown>
      <div class="container">
        <div class="inform-item" v-for="item in InformList" :key="item.id">
          <template v-if="item.type === 0">
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toUser(item)"
              >{{ item.user.username }}</span
            >
            <span>赞同了你的回答-</span>
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toAnswer(item)"
              >{{ item.question.question_name }}</span
            >
          </template>
          <template v-if="item.type === 1">
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toUser(item)"
              >{{ item.user.username }}</span
            >
            <span>赞同了你的文章-</span>
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toArticle(item)"
              >{{ item.article.title }}</span
            >
          </template>
          <template v-if="item.type === 3">
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toUser(item)"
              >{{ item.user.username }}</span
            >
            <span>评论了你的回答-</span>
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toAnswer(item)"
              >{{ item.question.question_name }}</span
            >
          </template>
          <template v-if="item.type === 4">
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toUser(item)"
              >{{ item.user.username }}</span
            >
            <span>评论了你的文章-</span>
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toArticle(item)"
              >{{ item.article.title }}</span
            >
          </template>
          <template v-if="item.type === 5">
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toUser(item)"
              >{{ item.user.username }}</span
            >
            <span>关注了你-</span>
          </template>
          <template v-if="item.type === 6">
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toUser(item)"
              >{{ item.user.username }}</span
            >
            <span>邀请你回答问题-</span>
            <span
              style="color: rgb(73, 119, 175); cursor: pointer"
              @click="toQuestion(item)"
              >{{ item.question.question_name }}</span
            >
          </template>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<script>
import { BellFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { getUserInform } from '@/service/user/user'
import { reactive, ref } from 'vue'
export default {
  components: {
    BellFilled
  },
  setup() {
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const InformList = reactive([])
    const noReadNum = ref(0)
    getUserInform(userId).then((res) => {
      let num = 0
      res.forEach((item) => {
        InformList.push(item)
        if (item.status == 0) {
          num++
        }
      })
      noReadNum.value = num
    })
    const toUser = (item) => {
      window.open(`/#/people/${item.user.id}/index`)
    }
    const toAnswer = (item) => {
      window.open(`/#/question/${item.question.id}/answer/${item.answer.id}`)
    }
    const toArticle = (item) => {
      window.open(`/#/article/${item.article.id}`)
    }
    const toQuestion = (item) => {
      window.open(`/#/question/${item.question.id}`)
    }
    const handleClick = () => {
      noReadNum.value = 0
      console.log(noReadNum.value)
    }
    return {
      InformList,
      toUser,
      toAnswer,
      toArticle,
      toQuestion,
      noReadNum,
      handleClick
    }
  }
}
</script>

<style scoped>
.container {
  width: 350px;
  height: 350px;
}
.inform-item {
  font-size: 14px;
  width: 300px;
  padding: 15px;
  border-bottom: 1px solid rgb(235, 235, 235);
}
</style>
