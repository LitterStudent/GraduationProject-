<template>
  <div class="question-content">
    <div class="authorInfo">
      <div class="infobox">
        <div class="imgbox">
          <img
            src="https://pic2.zhimg.com/3d052e71b_xs.jpg?source=1940ef5c"
            class="img"
          />
        </div>
        <div class="info">
          <div class="name">
            <strong>maomaobear </strong>
          </div>
          <div class="line">
            <span>科技盐究员</span>
          </div>
        </div>
      </div>
      <div class="agree">1,476 人赞同了该回答</div>
    </div>
    <div class="richcontent">
      <p>
        <span
          style="
            color: rgb(0, 0, 0);
            background-color: rgb(247, 248, 250);
            font-size: 14px;
            font-family: 'PingFang SC', -apple-system, Arial, 'Microsoft YaHei',
              'Microsoft JhengHei', 'Helvetica Neue', sans-serif;
          "
          >作为一个上海市民，我不明白，什么人能拿到出沪的许可。</span
        >
      </p>
      <p>
        <span
          style="
            color: rgb(0, 0, 0);
            background-color: rgb(247, 248, 250);
            font-size: 14px;
            font-family: 'PingFang SC', -apple-system, Arial, 'Microsoft YaHei',
              'Microsoft JhengHei', 'Helvetica Neue', sans-serif;
          "
          >&nbsp;能一直带着病毒出上海。&nbsp;苏州人能不能坚决点，把出上海所有的乘用车都封掉？</span
        >
      </p>
      <p>
        <span
          style="
            color: rgb(0, 0, 0);
            background-color: rgb(247, 248, 250);
            font-size: 14px;
            font-family: 'PingFang SC', -apple-system, Arial, 'Microsoft YaHei',
              'Microsoft JhengHei', 'Helvetica Neue', sans-serif;
          "
          >路口都派上民兵，只要不是送货送物资的大卡车一律禁止进出。&nbsp;</span
        >
      </p>
      <p>
        <span
          style="
            color: rgb(0, 0, 0);
            background-color: rgb(247, 248, 250);
            font-size: 14px;
            font-family: 'PingFang SC', -apple-system, Arial, 'Microsoft YaHei',
              'Microsoft JhengHei', 'Helvetica Neue', sans-serif;
          "
          >高铁站上海人全部劝返，不能劝返的全部送去酒店14天自费隔离（一天收1000块最少）。&nbsp;</span
        >
      </p>
      <p>
        <span
          style="
            color: rgb(0, 0, 0);
            background-color: rgb(247, 248, 250);
            font-size: 14px;
            font-family: 'PingFang SC', -apple-system, Arial, 'Microsoft YaHei',
              'Microsoft JhengHei', 'Helvetica Neue', sans-serif;
          "
          >这才对得起我们这些老老实实在家蹲着的上海人。这个黑锅我们普通上海人不背</span
        >
      </p>
    </div>
    <div class="updateDate">编辑于 2022-04-15 08:22</div>
    <div class="contnet-footer">
      <span>
        <button class="action_button">
          <el-icon><caret-top /></el-icon>
          赞同111111
        </button>
      </span>
      <span class="comment">
        <el-icon style="vertical-align: middle"><chat-round /></el-icon>
        <!-- <button v-if="!item.comment_num" class="comment_button">
          添加评论
        </button> -->
        <button class="comment_button">22222 条评论</button>
      </span>
    </div>
  </div>
</template>

<script>
import { ChatRound, CaretTop } from '@element-plus/icons-vue'
export default {
  components: {
    ChatRound,
    CaretTop
  }
}
</script>

<style scoped>
.question-content {
  padding: 20px;
  width: 900px;
  background-color: #fff;
  border-bottom: 1px solid #f6f6f6;
}
.authorInfo {
  /* padding: 10px; */
  height: 77px;
  font-size: 15px;
  color: #646464;
}
.richcontent {
  /* display: flex; */
}
.infobox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.imgbox {
  width: 38px;
  height: 38px;
}
.img {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.info {
  margin-left: 20px;
}
.name {
  font-size: 15px;
  font-weight: 600;
  color: rgb(68, 68, 68);
}
.agree {
  padding-top: 10px;
  color: #8590a6;
}
.updateDate {
  margin-top: 10px;
  color: #8590a6;
  font-size: 14px;
}
.contnet-footer {
  height: 34px;
  padding-top: 10px;
  /* padding: 10px 20px; */
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
