<template>
  <div class="follow">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <template v-if="followList.length > 0">
      <div
        class="follow-item"
        v-for="item in followList"
        :key="item.id"
        @click="handleClick(item)"
      >
        <div class="item-image">
          <!-- <img
          :src="item.avatar_url"
          style="width: 100%; height: 100%; border-radius: 5px"
        /> -->
          <el-avatar
            :src="item.avatar_url"
            style="width: 100%; height: 100%; border-radius: 5px"
          />
        </div>
        <div class="item-head">
          <h2 class="item-head-title">{{ item.username }}</h2>
          <div class="item-head-line">{{ item.headline }}</div>
          <div class="item-head-meta">
            <span>{{ item.answerNum }} 回答</span>
            <span style="margin: 0 10px">{{ item.articleNum }} 文章</span>
            <span>{{ item.followerNum }} 关注者</span>
          </div>
        </div>
        <div>
          <button class="item-extra">已关注</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有关注任何人</div>
    </template>
  </div>
</template>
<script>
import AsideHeader from '../cpns/aside_header2.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  getUserFollowList,
  getUserAllAnswer,
  getUserFollowerList,
  getUserAllArticle
} from '@/service/user/user'
import { reactive } from 'vue'
export default {
  components: {
    AsideHeader
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const userId = route.params.id
    const loginUserId = store.state.login.userInfo.id
    console.log(loginUserId)
    const me = loginUserId == userId ? '我' : '他'
    const menus = [
      { index: '1', value: `${me}关注的人`, url: `/people/${userId}/follow` },
      { index: '2', value: `关注${me}的人`, url: `/people/${userId}/follower` },
      {
        index: '3',
        value: `${me}关注的问题`,
        url: `/people/${userId}/followquestion`
      },
      {
        index: '4',
        value: `${me}关注的专栏`,
        url: `/people/${userId}/followcolumn`
      },
      {
        index: '5',
        value: `${me}关注的话题`,
        url: `/people/${userId}/followtopic`
      }
    ]
    const defaultActive = '6'
    const followList = reactive([])
    getUserFollowList(userId).then((res) => {
      // console.log(res)
      res.forEach((item) => {
        followList.push(item)
      })
      followList.forEach(async (item) => {
        const followerList = await getUserFollowerList(item.id)
        const answerList = await getUserAllAnswer(item.id)
        const articleList = await getUserAllArticle(item.id)
        item.followerNum = followerList.length
        item.answerNum = answerList.length
        item.articleNum = articleList.length
        console.log(item)
      })
    })
    const handleClick = (item) => {
      console.log(item)
      console.log(route)
      window.open(`/#/people/${item.id}/index`)
    }
    return {
      menus,
      defaultActive,
      followList,
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
.follow-item {
  padding: 16px 20px;
  display: flex;
  align-items: center;
}
.item-image {
  width: 60px;
  height: 60px;
}
.item-head {
  padding: 0 10px;
}
.item-head-title {
  font-size: 18px;
  font-weight: 600;
}
.item-head-line {
  width: 480px;
  font-size: 15px;
  margin: 5px 0;
  color: #646464;
}
.item-head-meta {
  font-size: 14px;
  color: #8590a6;
}
.item-extra {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  /* background: none; */
  border: 1px solid transparent;
  border-radius: 3px;
  width: 96px;
  color: #fff;
  background-color: #8590a6;
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
