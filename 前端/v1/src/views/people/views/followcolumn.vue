<template>
  <div class="follow">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <template v-if="columnList.length > 0">
      <div class="column-item" v-for="item in columnList" :key="item.id">
        <h2 class="column-item-title">{{ item.title }}</h2>
        <div class="column-item-description">{{ item.description }}</div>
        <div class="column-item-status">
          <span style="margin-right: 8px">{{ item.article_num }}篇内容</span>
          <span>{{ item.favorite_num }} 赞同</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有关注任何专栏</div>
    </template>
  </div>
</template>
<script>
import AsideHeader from '../cpns/aside_header2.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getUserFollowColumn } from '@/service/user/user'
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
    const defaultActive = 4
    const columnList = reactive([])
    getUserFollowColumn(userId).then((res) => {
      res.forEach((item) => {
        columnList.push(item)
      })
    })
    return {
      menus,
      defaultActive,
      columnList
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
.column-item {
  padding: 16px 20px;
}
.column-item-title {
  font-size: 18px;
  font-weight: 600;
}
.column-item-description {
  font-size: 15px;
  color: #646464;
  margin: 5px 0;
}
.column-item-status {
  color: #8590a6;
  font-size: 14px;
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
