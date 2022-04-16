<template>
  <div class="followquestion">
    <!-- <div class="title">我的关注</div> -->
    <aside-header :menus="menus" :defaultActive="defaultActive"></aside-header>
    <div class="qestion-item">
      <h2 class="qestion-item-title">
        面对「毕业后是继续深造还是直接工作」，报告称「过半大学生欲继续深造」，如何看待这一现象？
      </h2>
      <div class="question-item-status">
        <span>2022-04-11 11:37</span>
        <span style="margin: 0 15px">101 个回答</span>
        <span>197 个关注</span>
      </div>
    </div>
    <div class="qestion-item">
      <h2 class="qestion-item-title">
        面对「毕业后是继续深造还是直接工作」，报告称「过半大学生欲继续深造」，如何看待这一现象？
      </h2>
      <div class="question-item-status">
        <span>2022-04-11 11:37</span>
        <span style="margin: 0 15px">101 个回答</span>
        <span>197 个关注</span>
      </div>
    </div>
    <div class="qestion-item">
      <h2 class="qestion-item-title">
        面对「毕业后是继续深造还是直接工作」，报告称「过半大学生欲继续深造」，如何看待这一现象？
      </h2>
      <div class="question-item-status">
        <span>2022-04-11 11:37</span>
        <span style="margin: 0 15px">101 个回答</span>
        <span>197 个关注</span>
      </div>
    </div>
    <div class="qestion-item">
      <h2 class="qestion-item-title">
        面对「毕业后是继续深造还是直接工作」，报告称「过半大学生欲继续深造」，如何看待这一现象？
      </h2>
      <div class="question-item-status">
        <span>2022-04-11 11:37</span>
        <span style="margin: 0 15px">101 个回答</span>
        <span>197 个关注</span>
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
    const defaultActive = 3
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
.qestion-item {
  padding: 16px 20px;
}
.qestion-item-title {
  font-size: 18px;
  font-weight: 600;
}
.question-item-status {
  margin-top: 10px;
  font-size: 14px;
  color: #8590a6;
}
</style>
