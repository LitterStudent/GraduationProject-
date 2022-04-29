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
      <h2 class="check" v-if="article.status == 2">
        内容审核中，审核通过后会自动发布
      </h2>

      <div class="article-content" v-html="article.content"></div>

      <div class="article-date">
        <span>发布于 {{ article.updated_at }}</span>
      </div>
      <div class="article-topic">{{ article.topic.topic_name }}</div>
      <div class="contnet-footer">
        <span class="favorite" @click="handleDianZan">
          <button
            v-if="!isLock"
            :class="{
              action_button: !item.isDianZan,
              action_button2: item.isDianZan
            }"
          >
            <el-icon><caret-top /></el-icon>
            赞同{{ article.favorite_num }}
          </button>
          <button v-else class="action_button">
            <el-icon><loading /></el-icon>
            加载中
          </button>
        </span>
        <span class="comment">
          <el-icon style="vertical-align: middle"><chat-round /></el-icon>
          <!-- <button v-if="!item.comment_num" class="comment_button">
          添加评论
        </button> -->
          <button class="comment_button" @click="commentdialogVisible = true">
            {{ article.comment_num }} 条评论
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
                <el-dropdown-item @click="handleEdit(item)"
                  >修改文章</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
      <div class="column" v-if="article.column">
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
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>确认删除该篇文章？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDelete">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <comment-dialog
    v-if="commentdialogVisible"
    :articleid="article.id"
    :commentVisable="commentdialogVisible"
    @closeComent="commentdialogVisible = false"
  ></comment-dialog>
</template>

<script>
import { ChatRound, CaretTop, More, Loading } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getUserArticle } from '@/service/user/user'
import { formatUtcString } from '@/utils/date-format'
import CommentDialog from '../question/cpns/commentDialog.vue'
import {
  deleteArticle,
  getUserAllArticlelike,
  likeArticle,
  unlikeArticle
} from '@/service/user/user'
export default {
  components: {
    ChatRound,
    CaretTop,
    More,
    Loading,
    CommentDialog
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
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
      column: {},
      status: '',
      id: ''
    })
    getUserArticle(article_id).then((res) => {
      if (res.user_id == LoginUserId) {
        isWriter.value = true
      }
      article.id = article_id
      article.title = res.title
      article.cover_url = res.cover_url
      article.content = res.content
      article.pageviews = res.pageviews
      article.favorite_num = res.favorite_num
      article.comment_num = res.comment_num
      article.user = res.user
      article.topic = res.topic
      article.column = res.column
      article.status = res.status
      article.updated_at = formatUtcString(res.updated_at)
      console.log(article)
    })
    const item = reactive({
      isDianZan: false
    })
    getUserAllArticlelike(LoginUserId).then((res) => {
      if (res.findIndex((item) => item.id == article_id) != -1) {
        item.isDianZan = true
      }
    })

    const handleToWriter = (item) => {
      window.open(`/#/people/${item.id}/index`)
    }
    const handleEdit = () => {
      window.open(`/#/editor/${article_id}`)
    }
    const handleDelete = async () => {
      await deleteArticle(article_id)
      router.push(`/people/${LoginUserId}/index`)
    }
    const dialogVisible = ref(false)

    const isLock = ref(false)
    const handleDianZan = async () => {
      if (!isLock.value) {
        isLock.value = true
        item.isDianZan = !item.isDianZan
        if (item.isDianZan) {
          // 点赞文章
          await likeArticle(article_id)
          article.favorite_num++
          isLock.value = false
        } else {
          // 取消点赞
          await unlikeArticle(article_id)
          article.favorite_num--
          isLock.value = false
        }
      }
    }
    const commentdialogVisible = ref(false)
    return {
      item,
      article,
      handleToWriter,
      isWriter,
      isLock,
      handleEdit,
      handleDelete,
      dialogVisible,
      handleDianZan,
      commentdialogVisible
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
  background-color: #8590a6;
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
