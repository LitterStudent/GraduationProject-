<template>
  <div class="column-item">
    <div class="column-item-header">
      <div class="column-item-header-box">
        <h1>{{ column.title }}</h1>
        <span class="column-item-header-description">{{
          column.description
        }}</span>
        <div class="column-item-header-footer">
          <el-avatar shape="square" :src="user.avatar_url"></el-avatar>
          <span class="writer-name"> {{ user.username }} </span>
          <span class="article-num"> {{ articleList.length }} 篇内容</span>
        </div>
      </div>
      <div class="column-item-header-controller"></div>
    </div>
    <div class="column-article-content">
      <div
        class="column-article-content-item"
        v-for="item in articleList"
        :key="item.id"
      >
        <column-content :item="item"></column-content>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import ColumnContent from './cpns/content.vue'
import { getColumnAllArticle } from '@/service/user/user'
import { reactive } from 'vue'
export default {
  components: {
    ColumnContent
  },
  setup() {
    const route = useRoute()
    const column_id = route.params.id
    const articleList = reactive([])
    const user = reactive({
      avatar_url: '',
      username: ''
    })
    const column = reactive({
      title: '',
      description: ''
    })
    getColumnAllArticle(column_id).then((res) => {
      res.articleList.forEach((item) => {
        articleList.push(item)
      })
      user.avatar_url = res.user.avatar_url
      user.username = res.user.username
      column.title = res.column.title
      column.description = res.column.description
    })
    const item = {
      title: 'ImageJ实用技巧——Western Blot定量分析深入探究(定量分析篇)',
      cover_url:
        'https://pic2.zhimg.com/v2-bf094591e3c36f5cb8673118b8d8ec22_1440w.jpg?source=172ae1',
      content:
        '说到有名，沙法克和帕慕克当仁不让是最具人气的土耳其作家。这两位从小接受精英教育，外语流利，可以用英语写作、演讲、授课，在全球拥有大量读者。沙法克和帕慕克的部分作品已翻译成中文。不过，国内对这两位小说家的介绍还不是很多。',
      favorite_num: 0,
      comment_num: 0
    }
    return {
      item,
      articleList,
      user,
      column
    }
  }
}
</script>

<style>
.column-item {
  position: relative;
  margin-top: 50px;
}
.column-item-header {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 150px;
  position: relative;
  background-color: white;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
}
.column-item-header-box {
  width: 690px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
}
.column-item-header-description {
  font-size: 20px;
  display: inline-block;
  margin: 15px 0;
}
.writer-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0 6px;
}
.column-item-header-footer {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.article-num {
  font-size: 14px;
  color: grey;
}
.column-article-content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
}
.column-article-content-item {
  width: 650px;
  padding: 16px 20px;
  border-bottom: 1px solid rgb(246, 246, 246);
}
</style>
