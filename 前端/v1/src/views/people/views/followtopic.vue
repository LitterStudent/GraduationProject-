<template>
  <div class="follow">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <div class="topic-item">
      <div class="img">
        <img
          src="https://pic2.zhimg.com/v2-a13c66a27e327443841fdc6bd4860eb4_im.jpg?source=57bbeac9"
          style="width: 100%; height: 100%; border-radius: 5px"
        />
      </div>
      <div class="topic-info">
        <div class="info-title">动漫</div>
        <span style="font-size: 14px; color: #175199; margin-top: 5px"
          >900 个问题</span
        >
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
    const defaultActive = 5
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
</style>
