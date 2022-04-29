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
        <div class="column-item-header-controller">
          <div class="user" v-if="!isWriter">
            <button class="user-button">关注专栏</button>
          </div>
          <div class="writer" v-else>
            <button
              class="user-button"
              style="margin-right: 10px"
              @click="handleAddInColumn"
            >
              收纳内容
            </button>
            <button class="writer-button" @click="editDialogVisible = true">
              修改介绍
            </button>
            <el-dropdown class="more" trigger="click">
              <el-icon><more-filled /></el-icon>
              <template #dropdown>
                <el-dropdown-item
                  @click="deleteDialogVisible = true"
                  style="padding: 10px"
                  >删除专栏</el-dropdown-item
                >
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="column-article-content">
      <div
        class="column-article-content-item"
        v-for="item in articleList"
        :key="item.id"
        @click="toAnticle(item.id)"
      >
        <column-content
          :item="item"
          :isWriter="isWriter"
          @nocollect="handleNoCollect"
        ></column-content>
      </div>
    </div>
    <div class="info-box" v-if="articleList.length == 0">
      该专栏还没有任何文章...
    </div>
  </div>
  <el-dialog width="600px" v-model="addDialogVisible" title="Shipping address">
    <template #title>
      <div style="text-align: center">
        <h2 style="font-weight: 400">选择要收录的文章</h2>
        <!-- <hr style="margin-top: 5px" /> -->
      </div>
    </template>
    <div class="content">
      <div class="article-item" v-for="item in noInArticleList" :key="item.id">
        <h2>{{ item.title }}</h2>
        <div class="status">
          <span style="margin-right: 10px">{{ item.favorite_num }} 赞同 -</span>
          <span>{{ item.created_at }}</span>
        </div>
        <span
          class="article-item-button"
          v-if="!item.isCollect"
          @click="CollectArticle(item)"
          >收录</span
        >
        <span class="article-item-button2" v-else>已收录</span>
      </div>
      <div
        style="text-align: center; font-size: 18px"
        v-if="noInArticleList.length == 0"
      >
        暂时没有能收纳的文章，快去创作吧
      </div>
    </div>
  </el-dialog>
  <el-dialog width="600px" v-model="editDialogVisible" title="Shipping address">
    <template #title>
      <div style="text-align: center">
        <h2 style="font-weight: 400">修改专栏介绍</h2>
      </div>
    </template>
    <input
      type="text"
      v-model="column.title"
      class="dilog-input"
      placeholder="请输入专栏名称"
    />
    <input
      type="text"
      v-model="column.description"
      class="dilog-input2"
      placeholder="请用一句话介绍"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditCommit">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    width="600px"
    v-model="deleteDialogVisible"
    title="Shipping address"
  >
    <template #title>
      <div style="text-align: center">
        <h2 style="font-weight: 400">请确认删除该专栏？</h2>
      </div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handledeleteColumn">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import ColumnContent from './cpns/content.vue'
import {
  getColumnAllArticle,
  getArticleNoInColumn,
  collectArticletoColumn,
  deleteArticlefromColumn,
  updateColumn,
  deleteColumn
} from '@/service/user/user'
import { MoreFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    ColumnContent,
    MoreFilled
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const login_user_id = store.state.login.userInfo.id
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
      if (res.user.id == login_user_id) {
        isWriter.value = true
      }
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
    const isWriter = ref(false)

    const noInArticleList = reactive([])
    getArticleNoInColumn(column_id).then((res) => {
      res.forEach((item) => {
        item.isCollect = false
        noInArticleList.push(item)
      })
    })
    const handleAddInColumn = () => {
      addDialogVisible.value = true
    }
    const addDialogVisible = ref(false)
    const CollectArticle = async (item) => {
      articleList.push(item)
      item.isCollect = true
      const res = await collectArticletoColumn(column_id, item.id)
      console.log(res)
    }
    const handleNoCollect = async (item) => {
      const index = articleList.findIndex((item2) => item2.id == item.id)
      articleList.splice(index, 1)
      const res = await deleteArticlefromColumn(column_id, item.id)
      console.log(res)
    }
    const toAnticle = (id) => {
      window.open(`/#/article/${id}`)
    }
    const editDialogVisible = ref(false)
    const handleEditCommit = async () => {
      const res = await updateColumn(column_id, {
        title: column.title,
        description: column.description
      })
      console.log(res)
      editDialogVisible.value = false
    }
    const deleteDialogVisible = ref(false)
    const handledeleteColumn = async () => {
      console.log(111)
      deleteDialogVisible.value = false
      await deleteColumn(column_id)
      router.push(`/people/${login_user_id}/index`)
    }
    return {
      item,
      articleList,
      user,
      column,
      isWriter,
      addDialogVisible,
      handleAddInColumn,
      noInArticleList,
      CollectArticle,
      handleNoCollect,
      toAnticle,
      editDialogVisible,
      handleEditCommit,
      handledeleteColumn,
      deleteDialogVisible
    }
  }
}
</script>

<style scoped>
.column-item {
  position: relative;
  margin-top: 50px;
}
.column-item-header {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  min-height: 190px;
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
.column-item-header-controller {
  margin-top: 10px;
}
.user-button {
  color: #fff;
  background-color: #06f;
  border-color: #06f;
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid;
}

.writer-button {
  color: #06f;
  background-color: #fff;
  border-color: #06f;
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid;
}
.content {
  height: 400px;
}
.article-item {
  position: relative;
  padding: 10px;
  height: 60px;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 4px;
}
.status {
  margin-top: 10px;
}
.article-item-button {
  position: absolute;
  right: 2%;
  top: 40%;
  font-size: 16px;
  font-weight: 800;
  color: rgb(28, 119, 255);
  cursor: pointer;
}
.article-item-button2 {
  position: absolute;
  right: 2%;
  top: 40%;
  font-size: 16px;
  font-weight: 800;
  color: rgb(153, 153, 153);
  cursor: pointer;
}
.dilog-input {
  width: 100%;
  height: 28px;
  outline: none;
  font-size: 15px;
}
.dilog-input2 {
  margin-top: 40px;
  width: 100%;
  height: 28px;
  outline: none;
  font-size: 15px;
}
.more {
  vertical-align: middle;
  margin-left: 10px;
  font-size: 18px;
  color: #646464;
  cursor: pointer;
}
.info-box {
  text-align: center;
  font-weight: 500;
  font-size: 28px;
  color: #646464;
}
</style>

<style>
p {
  padding: 0;
}
</style>
