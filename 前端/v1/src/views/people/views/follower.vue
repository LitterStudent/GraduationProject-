<template>
  <div class="follower">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <div class="follow-item">
      <div class="item-image">
        <img
          src="https://pic2.zhimg.com/v2-4820351241edd8f23ac32645cd53afed_im.jpg?source=32738c0c"
          style="width: 100%; height: 100%; border-radius: 5px"
        />
      </div>
      <div class="item-head">
        <h2 class="item-head-title">洹水之滨</h2>
        <div class="item-head-line">狼胥山前秋风紧，黄沙漠漠起塞声。</div>
        <div class="item-head-meta">
          <span>994 回答</span>
          <span style="margin: 0 10px">396 文章</span>
          <span>2,419 关注者</span>
        </div>
      </div>
      <div>
        <button class="item-extra">已关注</button>
      </div>
    </div>
  </div>
</template>
<script>
import AsideHeader from '../cpns/aside_header2.vue'
import { useStore } from 'vuex'
export default {
  components: {
    AsideHeader
  },
  setup() {
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const menus = [
      { index: 1, value: '我关注的人', url: `/people/${userId}/follow` },
      { index: 2, value: '关注我的人', url: `/people/${userId}/follower` },
      {
        index: 3,
        value: '我关注的问题',
        url: `/people/${userId}/followquestion`
      },
      {
        index: 4,
        value: '我关注的专栏',
        url: `/people/${userId}/followcolumn`
      },
      { index: 5, value: '我关注的话题', url: `/people/${userId}/followtopic` }
    ]
    const defaultActive = 2
    return {
      menus,
      defaultActive
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
</style>
