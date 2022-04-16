<template>
  <div class="follow">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <div class="column-item">
      <h2 class="column-item-title">游戏开发启示录</h2>
      <div class="column-item-description">聊聊游戏谈谈天</div>
      <div class="column-item-status">
        <span style="margin-right: 8px">38 篇内容</span>
        <span>4,641 赞同</span>
      </div>
    </div>
    <div class="column-item">
      <h2 class="column-item-title">游戏开发启示录</h2>
      <div class="column-item-description">聊聊游戏谈谈天</div>
      <div class="column-item-status">
        <span style="margin-right: 8px">38 篇内容</span>
        <span>4,641 赞同</span>
      </div>
    </div>
    <div class="column-item">
      <h2 class="column-item-title">游戏开发启示录</h2>
      <div class="column-item-description">聊聊游戏谈谈天</div>
      <div class="column-item-status">
        <span style="margin-right: 8px">38 篇内容</span>
        <span>4,641 赞同</span>
      </div>
    </div>
    <div class="column-item">
      <h2 class="column-item-title">游戏开发启示录</h2>
      <div class="column-item-description">聊聊游戏谈谈天</div>
      <div class="column-item-status">
        <span style="margin-right: 8px">38 篇内容</span>
        <span>4,641 赞同</span>
      </div>
    </div>
  </div>
</template>
<script>
import AsideHeader from '../cpns/aside_header2.vue'
export default {
  components: {
    AsideHeader
  },
  setup() {
    const menus = [
      { index: 1, value: '我关注的人', url: '/people/1/follow' },
      { index: 2, value: '关注我的人', url: '/people/1/follower' },
      { index: 3, value: '我关注的问题', url: '/people/1/followquestion' },
      { index: 4, value: '我关注的专栏', url: '/people/1/followcolumn' },
      { index: 5, value: '我关注的话题', url: '/people/1/followtopic' }
    ]
    const defaultActive = 4
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
</style>
