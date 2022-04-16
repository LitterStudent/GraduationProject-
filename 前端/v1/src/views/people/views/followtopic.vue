<template>
  <div class="follow">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <h2>这是我关注的话题</h2>
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
</style>
