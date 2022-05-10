<template>
  <div class="">
    <template v-for="item in resList" :key="item.id">
      <user-avatar :item="item"></user-avatar>
      <rich-content :item="item" @click="handleClick(item)"></rich-content>
    </template>
    <templates v-if="resList.length == 0">
      <div class="info">还没有关注其他用户哦</div></templates
    >
  </div>
</template>

<script>
import RichContent from './cpns/rich_content.vue'
import UserAvatar from './cpns/user_avatar.vue'
import { getFollowUserDynamic } from '@/service/user/user'
import { useStore } from 'vuex'
import { reactive } from 'vue-demi'
export default {
  components: {
    RichContent,
    UserAvatar
  },
  setup() {
    const store = useStore()
    const resList = reactive([])
    const loginUserId = store.state.login.userInfo.id
    getFollowUserDynamic(loginUserId).then((res) => {
      res.forEach((item) => {
        resList.push(item)
      })
    })
    const handleClick = (item) => {
      if (item.type == 0 || item.type == 2) {
        window.open(`/#/question/${item.question.id}/answer/${item.answer.id}`)
      } else if (item.type == 1 || item.type == 3) {
        window.open(`/#/article/${item.article.id}`)
      }
    }
    return {
      resList,
      handleClick
    }
  }
}
</script>

<style scoped>
.info {
  height: 600px;
  font-weight: 600;
  color: grey;
}
</style>
