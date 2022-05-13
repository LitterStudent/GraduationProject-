<template>
  <div class="follow">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <template v-if="topicList.length > 0">
      <div
        class="topic-item"
        v-for="item in topicList"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <div class="img">
          <!-- <img
          :src="item.avatar_url"
          style="width: 100%; height: 100%; border-radius: 5px"
        /> -->
          <el-avatar
            :src="item.avatar_url"
            style="width: 100%; height: 100%; border-radius: 5px"
          ></el-avatar>
        </div>
        <div class="topic-info">
          <div class="info-title">{{ item.topic_name }}</div>
          <span style="font-size: 14px; color: #175199; margin-top: 5px"
            >{{ item.question_num }} 个问题</span
          >
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有关注任何话题</div>
    </template>
  </div>
</template>
<script>
import AsideHeader from '../cpns/aside_header2.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getUserFollowTopic } from '@/service/user/user'
import { reactive } from 'vue'
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
    const defaultActive = '5'
    const topicList = reactive([])
    getUserFollowTopic(userId).then((res) => {
      res.forEach((item) => {
        topicList.push(item)
      })
    })
    const handleClick = (id) => {
      window.open(`/#/topic/${id}`)
    }
    return {
      menus,
      defaultActive,
      topicList,
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
.topic-item {
  padding: 16px 20px;
  display: flex;
  align-items: center;
}
.img {
  width: 60px;
  height: 60px;
}
.topic-info {
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
}
.info-title {
  cursor: pointer;
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
