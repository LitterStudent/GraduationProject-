<template>
  <el-container>
    <el-header class="header" v-if="!isLogin">
      <nav-header @dialogVisible="handleDialog"></nav-header>
    </el-header>
    <router-view />
    <el-dialog
      width="600px"
      v-model="dialogFormVisible"
      title="Shipping address"
    >
      <template #title>
        <div class="askquestion-tile">
          <input
            placeholder="写下你的问题，准确地描述问题更容易得到解答"
            type="text"
            class="askquestion-tile-input"
            v-model="questionTitle"
          />
        </div>
      </template>
      <div class="editor-container-question">
        <editor
          ref="editorRef"
          :placeholder="'请输入问题背景，条件等详细信息（选填）'"
        />
        <div class="change-topic">
          <div v-if="!isGetTopic" @click="isGetTopic = true">
            <el-icon><zoom-in /></el-icon>绑定一个话题
          </div>
          <div v-else class="change-topic-input">
            <el-autocomplete
              v-model="topic_name"
              :fetch-suggestions="querySearch"
              popper-class="my-autocomplete"
              placeholder="请输入话题"
              @select="handleSelect"
              style="width: 100%"
            >
              <template #default="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handlCommit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import NavHeader from '@/components/nav_header_user'
import Editor from '@/components/editor/editor.vue'
import { ZoomIn } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { watch, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { getAllTopicRequest, addQuestionRequest } from '@/service/user/user'
import router from '@/router'
export default {
  components: { NavHeader, Editor, ZoomIn },
  setup() {
    const isLogin = ref(false)
    const route = useRoute()
    // 是否显示顶部header
    watch(route, () => {
      if (route.path === '/login') {
        isLogin.value = true
      } else {
        isLogin.value = false
      }
    })

    // dialog的逻辑
    const store = useStore()
    const userInfo = store.state.login.userInfo
    const dialogFormVisible = ref(false)
    const handleDialog = () => {
      dialogFormVisible.value = true
    }
    const questionTitle = ref('')
    let topicList = null
    onBeforeMount(async () => {
      const res = await getAllTopicRequest()
      topicList = res.map((item) => {
        return { id: item.id, value: item.topic_name }
      })
    })
    const isGetTopic = ref(false)
    const querySearch = async (queryString, cb) => {
      let res = topicList
      if (queryString) {
        res = topicList.filter((item) => item.value.includes(queryString))
      }
      cb(res)
    }
    const handleSelect = () => {}
    const topic_name = ref('')
    const editorRef = ref()
    const handlCommit = async () => {
      const editor = editorRef.value.editorRef
      const question_name = questionTitle.value
      const description = editor.getHtml()
      const topic = topicList.find((item) => item.value === topic_name.value)
      const topic_id = topic['id'] + ''
      const res = await addQuestionRequest({
        question_name,
        description,
        topic_id
      })
      const { id } = res
      router.push(`/question/${id}`)
    }
    return {
      isLogin,
      dialogFormVisible,
      handleDialog,
      questionTitle,
      userInfo,
      isGetTopic,
      querySearch,
      topic_name,
      handleSelect,
      editorRef,
      handlCommit
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(246, 246, 246);
}
.header {
  width: 100%;
  height: 50px !important;
  position: fixed;
  background-color: white;
  z-index: 999;
}
.askquestion-tile {
  width: 460px;
}
.askquestion-tile-input {
  margin-top: 20px;
  width: 100%;
  height: 24px;
  font-size: 18px;
  color: #121212;
  background: transparent;
  border: none;
  outline: none;
}
.editor-container-question {
  width: 100%;
  height: 150px;
}
.change-topic {
  cursor: pointer;
  padding-left: 5px;
  padding-top: 20px;
  background: none !important;
  color: #06f !important;
}
.change-topic-input {
  width: 150px;
}
</style>
