<template>
  <div class="column-item">
    <div class="column-item-header">
      <div class="column-item-header-box">
        <h1>ImageJ实用教程</h1>
        <span class="column-item-header-description"
          >科研图像处理一站式解决方案</span
        >
        <div class="column-item-header-footer">
          <el-avatar
            shape="square"
            :src="'https://pic2.zhimg.com/v2-e78af8b171c11931fb8073528deedca1_s.jpg?source=d16d100b'"
          ></el-avatar>
          <span class="writer-name"> Treasure琛 </span>
          <span class="article-num"> 76 篇内容</span>
        </div>
      </div>
    </div>
    <div class="column-article-content">
      <div class="column-article-content-item">
        <column-content :item="item"></column-content>
      </div>
      <div class="column-article-content-item">
        <column-content :item="item"></column-content>
      </div>
      <div class="column-article-content-item">
        <column-content :item="item"></column-content>
      </div>
      <div class="column-article-content-item">
        <column-content :item="item"></column-content>
      </div>
    </div>
  </div>
</template>

<script>
import ColumnContent from './cpns/content.vue'
export default {
  components: {
    ColumnContent
  },
  setup() {
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
      item
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
