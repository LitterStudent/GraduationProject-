<template>
  <div class="container">
    <h2 class="title">
      <template v-if="item.article">{{ item.article.title }}</template>
      <template v-else-if="item.answer">{{
        item.question.question_name
      }}</template>
    </h2>
    <div class="rich_content">
      <div class="cover" v-if="item.article">
        <img class="pic" :src="item.article.cover_url" />
      </div>
      <div class="content">
        <span class="text" v-if="item.article">
          {{ item.article.content }}
        </span>
        <span class="text" v-else-if="item.answer">
          {{ item.answer.content }}
        </span>
        <button class="content_button">阅读全文</button>
      </div>
      <div class="action">
        <span>
          <button class="action_button">
            <el-icon><caret-top /></el-icon>
            赞同<span v-if="item.article">{{ item.article.favorite_num }}</span>
            <span v-else-if="item.answer">{{ item.answer.favorite_num }}</span>
          </button>
        </span>
        <span class="comment">
          <el-icon style="vertical-align: middle"><chat-round /></el-icon>
          <button v-if="!item.comment_num" class="comment_button">
            添加评论
          </button>
          <button v-else class="comment_button">
            <span v-if="item.article">{{ item.article.comment_num }}</span>
            <span v-else-if="item.answer">{{ item.answer.comment_num }}</span>
            条评论
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { CaretTop, ChatRound } from '@element-plus/icons-vue'
export default {
  components: {
    CaretTop,
    ChatRound
  },
  props: ['item'],
  setup() {}
}
</script>

<style scoped>
.container {
  padding: 10px 20px 10px 20px;
  border-bottom: 1px solid rgb(240, 242, 247);
}
.title {
  cursor: pointer;
  font-size: 18px;
  color: rgb(18, 18, 18);
}
.title:hover {
  color: #175199;
}
.content {
  max-height: 100px;
  cursor: pointer;
  font-size: 15px;
  color: rgb(18, 18, 18);
  line-height: 25.05px;
  margin-top: 9px;
}
.text {
}
.cover {
  position: relative;
  width: 190px;
  height: 105px;
  float: left;
  margin-right: 18px;
  margin-bottom: 4px;
  border-radius: 4px;
  overflow: hidden;
  transform: translateZ(0);
}

.pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content:hover {
  color: #646464;
}
.content_button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  border-radius: 0;
  margin-left: 4px;
  color: #175199;
  font-size: 14px;
}
.action {
  padding-top: 10px;
  clear: both;
  /* margin-top: 10px; */
}
.action_button {
  line-height: 30px;
  padding: 0 12px;
  border-color: transparent;
  background: rgba(0, 102, 255, 0.1);
  color: #06f;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}
.comment {
  cursor: pointer;
  margin-left: 30px;
  background-color: rgba(0, 0, 0, 0);
  color: rgb(133, 144, 166);
  font-size: 18px;
}
.comment_button {
  cursor: pointer;
  border-color: transparent;
  background-color: rgba(0, 0, 0, 0);
  color: rgb(133, 144, 166);
  font-size: 14px;
}
</style>
