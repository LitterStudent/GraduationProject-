<template>
  <div class="container-box">
    <div class="article">
      <div class="cover-box">
        <img style="width: 100%" :src="article.cover_url" alt="" />
      </div>
      <div class="title">
        <h2>{{ article.title }}</h2>
      </div>
      <div class="userInfo">
        <div class="avatar-box" @click="handleToWriter(article.user)">
          <el-avatar :src="article.user.avatar_url"></el-avatar>
        </div>
        <div class="user-status">
          <h4>{{ article.user.username }}</h4>
          <span style="font-size: 14px; color: grey">{{
            article.user.headline
          }}</span>
        </div>
      </div>
      <div style="font-size: 14px; color: rgb(130, 141, 162); margin-top: 10px">
        {{ article.favorite_num }} 人赞同了该文章
      </div>
      <div class="article-content" v-html="articleContent"></div>

      <div class="article-date">
        <span>发布于 {{ article.updated_at }}</span>
      </div>
      <div class="article-topic">{{ article.topic.topic_name }}</div>
      <div class="contnet-footer">
        <span class="favorite" @click="handleDianZan">
          <button
            :class="{
              action_button: !item.isDianZan,
              action_button2: item.isDianZan
            }"
          >
            <el-icon><caret-top /></el-icon>
            赞同{{ item.favorite_num }}
          </button>
        </span>
        <span class="comment">
          <el-icon style="vertical-align: middle"><chat-round /></el-icon>
          <!-- <button v-if="!item.comment_num" class="comment_button">
          添加评论
        </button> -->
          <button class="comment_button" @click="handleShowComment">
            {{ item.comment_num }} 条评论
          </button>
        </span>
        <span v-if="isWriter">
          <el-dropdown>
            <span class="isWriter">
              <el-icon>
                <el-icon><more /></el-icon>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="dialogVisible = true"
                  >删除文章</el-dropdown-item
                >
                <el-dropdown-item @click="dialogVisible = true"
                  >修改文章</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
      <div class="column">
        <h4 style="margin: 30px 0 20px 0">文章被以下专栏收录</h4>
        <div class="column-item">
          <h4 style="color: rgb(68, 68, 68)">{{ article.column.title }}</h4>
          <span style="font-size: 14px; color: grey">{{
            article.column.description
          }}</span>
        </div>
      </div>
      <div class="clear-box"></div>
    </div>
    111
  </div>
</template>

<script>
import { ChatRound, CaretTop, More } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getUserArticle } from '@/service/user/user'
import { formatUtcString } from '@/utils/date-format'
export default {
  components: {
    ChatRound,
    CaretTop,
    More
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const article_id = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const isWriter = ref(false)
    const article = reactive({
      title: '',
      cover_url: '',
      content: '',
      pageviews: 0,
      favorite_num: 0,
      comment_num: 0,
      updated_at: '',
      user: {},
      topic: {},
      column: {}
    })
    getUserArticle(article_id).then((res) => {
      if (res.user_id == LoginUserId) {
        isWriter.value = true
      }
      article.title = res.title
      article.cover_url = res.cover_url
      article.content = res.content
      article.pageviews = res.pageviews
      article.favorite_num = res.favorite_num
      article.comment_num = res.comment_num
      article.user = res.user
      article.topic = res.topic
      article.column = res.column
      article.updated_at = formatUtcString(res.updated_at)
      console.log(article)
    })
    const articleContent =
      '<h2 style="text-indent: 0px; text-align: start; line-height: 1.5;">一、Macro的搜索</h2><p style="text-indent: 0px; text-align: start;">ImageJ官网提供了几百个Macro的例子（如果打不开网页，需要VPN）：</p><p style="text-indent: 0px; text-align: start;"><br></p><p style="text-indent: 0px; text-align: start;"><strong>搜索Macro有两种方法：</strong></p><p style="text-indent: 0px; text-align: start;"><strong>1、直接在官网的搜索栏，本质是谷歌搜索（需要VPN）：</strong></p><p style="text-indent: 0px; text-align: start;"><br></p><p style="text-indent: 0px; text-align: start;">例如，如果需要RGB图片处理相关的Macro，在搜索栏里搜索RGB，就会得到相应结果：</p><p style="text-indent: 0px; text-align: start;"><br></p><p style="text-indent: 0px; text-align: start;"><strong>2、在Macro官网上搜索关键字，本质是浏览器搜索（不需要VPN）：</strong></p><p style="text-indent: 0px; text-align: start;">更多Macro和脚本的学习资源可以在这个网址找到：</p><p>Developer&nbsp;Resources​</p><p>imagej.nih.gov/ij/developer/index.html</p><hr/><h2 style="text-indent: 0px; text-align: start; line-height: 1.5;">二、Macro的使用和安装</h2><p style="text-indent: 0px; text-align: start;"><strong>1、Macro的使用</strong></p><p style="text-indent: 0px; text-align: start;">官网提供的文件大都是txt格式的，是为了兼容ImageJ1，打开任意一个Macro（以Animated&nbsp;Gaussian&nbsp;Blur为例）：</p><p style="text-indent: 0px; text-align: start;">在ImageJ中建立一个新的Macro（Plugins&nbsp;-&gt;&nbsp;New&nbsp;-&gt;&nbsp;Macro）：</p><p style="text-indent: 0px; text-align: start;">将所有txt中的代码复制到新的Macro中，然后点击Run就可以运行了：</p><p style="text-indent: 0px; text-align: start;">File&nbsp;-&gt;&nbsp;Save可以将这个Macro保存为.ijm文件。</p><p style="text-indent: 0px; text-align: start;"><br></p><p style="text-indent: 0px; text-align: start;"><strong>2、Macro的安装</strong></p><p style="text-indent: 0px; text-align: start;">如果平时要频繁使用到某个Macro，则可以将Macro直接安装到ImageJ中。</p><p style="text-indent: 0px; text-align: start;"><strong>（1）短暂安装（Plugins&nbsp;-&gt;&nbsp;Macro&nbsp;-&gt;&nbsp;Install）</strong></p><p style="text-indent: 0px; text-align: start;">短暂安装，即关闭ImageJ再打开后，安装的Macro会消失，不能保留。</p><p style="text-indent: 0px; text-align: start;">直接选择需要安装的.ijm文件，即可短暂安装：</p><p style="text-indent: 0px; text-align: start;"><br></p><p style="text-indent: 0px; text-align: start;"><strong>（2）长期安装（Plugins&nbsp;-&gt;&nbsp;Macros&nbsp;-&gt;&nbsp;Startup&nbsp;Macros）</strong></p><p style="text-indent: 0px; text-align: start;"><strong>如果要想每次打开ImageJ，就能在Plugins&nbsp;-&gt;&nbsp;Macros找到这个Macro，需要其它手段。</strong></p><p style="text-indent: 0px; text-align: start;"><strong>打开StartupMacros.fiji.ijm文件，把该Macro的代码添加到文件的末尾：</strong></p><p style="text-indent: 0px; text-align: start;"><strong>注意：一定要有macro&nbsp;"title"&nbsp;{&nbsp;...//Your&nbsp;code&nbsp;}，这样的结构。</strong></p><p style="text-indent: 0px; text-align: start;"><br></p><p style="text-indent: 0px; text-align: start;"><strong>这样每次打开ImageJ，就能有Animated&nbsp;Gaussian&nbsp;Blur这个Macro了：</strong></p><hr/><p style="text-indent: 0px; text-align: start;">如果对于ImageJ使用有什么问题可以私信我，或者给我发邮件：zhaoyc9@163.com<br>更多教程可以关注我的专栏：</p><p style="text-indent: 0px; text-align: start;">希望对大家有帮助~</p>'
    const item = reactive({
      isDianZan: true,
      favorite_num: 0,
      comment_num: 0
    })
    const handleToWriter = (item) => {
      window.open(`/#/people/${item.id}/index`)
    }
    return {
      item,
      articleContent,
      article,
      handleToWriter,
      isWriter
    }
  }
}
</script>

<style scoped>
.container {
  /* margin-top: 50px; */
  position: relative;
  width: 100%;
  /* height: 100%; */
  background-color: white;
}
.article {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 690px;
  margin-top: 60px;
}
.cover-box {
  width: 100%;
}
.title {
  margin: 10px 0;
}
.userInfo {
  cursor: pointer;
  display: flex;
}
.avatar-box {
  margin-right: 10px;
}
.article-content {
  margin-top: 40px;
}

.contnet-footer {
  width: 100%;
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
.action_button2 {
  line-height: 30px;
  padding: 0 17px;
  border-color: transparent;
  background: #06f;
  color: white;
  border-radius: 3px;
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
  color: grey;
  font-size: 14px;
}
.check {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  background-color: #f6f6f6;
}
.favorite {
  /* vertical-align: middle; */
}
.article-date {
  margin: 10px 0;
  font-size: 14px;
  color: grey;
}
.article-topic {
  cursor: pointer;
  margin: 10px 0;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #06f;
  border-radius: 100px;
  background-color: rgba(0, 102, 255, 0.1);
  padding: 0 12px;
}
.column-item {
  cursor: pointer;
}
.clear-box {
  height: 150px;
}

.isWriter {
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  height: 20px;
  line-height: 20px;
  margin-left: 20px;
  color: #8590a6;
}
</style>
