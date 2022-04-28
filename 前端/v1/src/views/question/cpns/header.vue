<template>
  <div class="question-header">
    <el-card class="box-card">
      <template #>
        <div class="question-header-content">
          <div class="question-header-main">
            <div class="question-header-tag">
              <span>{{ questionInfo.topic.topic_name }}</span>
            </div>
            <h1 class="question-header-title">
              {{ questionInfo.question.question_name }}
            </h1>
            <div class="question-header-text">
              <span id="spantext" v-html="text"> </span>
              <button
                v-if="!isShowAll"
                class="question-header-button1"
                @click="handleShowAll"
              >
                显示全部
                <el-icon><arrow-down-bold /></el-icon>
              </button>
            </div>
          </div>
          <div class="question-header-side">
            <div class="question-header-follow">
              <div class="question-header-follower">关注者</div>
              <strong class="question-header-follow-num">{{
                questionInfo.question.follow_number
              }}</strong>
            </div>
            <div class="question-header-browse">
              <div class="question-header-follower">被浏览</div>
              <strong class="question-header-follow-num"
                >{{ questionInfo.question.pageviews }}
              </strong>
            </div>
          </div>
        </div>
        <div class="question-hader-footer">
          <el-button
            type="primary"
            color="#06f"
            v-if="!isFollow"
            @click="followQuestionfun"
          >
            关注问题
          </el-button>
          <el-button
            type="primary"
            color="rgb(118, 131, 155)"
            v-if="isFollow"
            @click="unfollowQuestionfun"
          >
            已经关注
          </el-button>
          <el-button type="primary" color="#06f" plain style="padding: 0">
            <span class="icon-button" v-if="isAnswer" @click="handleEditAnswer">
              <el-icon style="margin-right: 5px"><edit-pen /></el-icon
              >编辑我的回答
            </span>
            <span
              class="icon-button"
              v-else-if="isWrite"
              @click="handleShowMyAnswer"
            >
              <el-icon style="margin-right: 5px"><edit-pen /></el-icon
              >查看我的回答
            </span>
            <span class="icon-button" v-else @click="isShowEditor = true">
              <el-icon style="margin-right: 5px"><edit-pen /></el-icon>写回答
            </span>
          </el-button>
          <el-button
            style="padding: 17px 15px"
            @click="dialogFormVisible = true"
            >邀请用户回答</el-button
          >
          <button
            v-if="isShowAll"
            class="question-header-button"
            @click="handleShowPart"
          >
            收起
            <el-icon><arrow-up-bold /></el-icon>
          </button>
        </div>
      </template>
    </el-card>
  </div>
  <div class="editor-box" v-if="isShowEditor">
    <div class="editor-box2">
      <editor
        ref="editorRef"
        containerStyle="none"
        height="900px"
        boxstyle="width:80%; padding:0  100px"
        :answerValue="answerValue"
        :toobarexclude="[]"
      ></editor>
      <div class="editor-box2-footer">
        <el-button
          @click="handlecommitAnswer"
          style="margin-left: 620px; margin-top: 20px"
          color="rgb(0, 92, 230)"
          >发布回答</el-button
        >
      </div>
    </div>
  </div>
  <el-dialog width="600px" v-model="dialogFormVisible" title="邀请其他用户回答">
    <template #title> </template>
    <div class="container">
      <div
        class="user-item"
        v-for="item in userList"
        :key="item.id"
        @click="handleClick(item)"
      >
        <div class="item-image">
          <el-avatar
            :src="item.avatar_url"
            style="width: 100%; height: 100%; border-radius: 5px"
          />
        </div>
        <div class="item-head">
          <h2 class="item-head-title">{{ item.username }}</h2>
          <div class="item-head-line">{{ item.headline }}</div>
        </div>
        <div>
          <button
            class="item-invite"
            v-if="!item.isInvite"
            @click="inviteUser(item)"
          >
            邀请用户
          </button>
          <button class="item-invited" v-else>已邀请</button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { EditPen, ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
import { reactive, ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import Editor from '@/components/editor/editor.vue'
import {
  createAnswerRequest,
  updateAnswerRequest,
  finUserAnswerRequest,
  getUserFollowQuestionList,
  followQuestion,
  unfollowQuestion,
  getUserInviteOtherList,
  InviteUserAnswer
} from '@/service/user/user'
import router from '@/router'
import { useStore } from 'vuex'
export default {
  components: {
    EditPen,
    ArrowUpBold,
    ArrowDownBold,
    Editor
  },
  created() {},
  props: ['questionInfo', 'isWrite', 'isAnswer', 'answerOne', 'questionId'],
  setup(props, { emit }) {
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const isShowAll = ref(false)
    const isShowEditor = ref(false)
    const text = computed(() => {
      const li = document.createElement('li')
      li.innerHTML = props.questionInfo.question['description']
      return li.innerText.slice(0, 70) + '...'
    })

    const handleShowAll = () => {
      const span = document.querySelector('#spantext')
      span.innerHTML = props.questionInfo.question['description']
      span.childNodes.forEach((item) => {
        if (item.tagName === 'P') {
          item.setAttribute('style', 'padding: 10px 0;')
        }
      })
      isShowAll.value = true
    }
    const handleShowPart = () => {
      const span = document.querySelector('#spantext')
      span.innerHTML = text.value
      isShowAll.value = false
    }
    const editorRef = ref()
    const handlecommitAnswer = async () => {
      const content = editorRef.value.editorRef.getHtml()
      if (content === '<p><br></p>') {
        alert('请输入回答')
        return
      }
      if (!props.answerOne.content) {
        // 新建
        const id = props.questionInfo.question.id
        const res = await createAnswerRequest(id, { content })
        router.push(`/question/${id}/answer/${res.id}`)
        isShowEditor.value = false
      } else {
        // 更新
        const id = props.questionInfo.question.id
        const res = await updateAnswerRequest(id, props.answerOne.id, {
          content
        })
        console.log(res)
        isShowEditor.value = false
        router.push(`/question/${id}`)
      }
    }

    const answerValue = ref('<p>hello</p>')
    const handleEditAnswer = async () => {
      isShowEditor.value = true
      answerValue.value = props.answerOne.content
    }
    const handleShowMyAnswer = async () => {
      const questionId = props.questionInfo.question.id
      const answerRes = await finUserAnswerRequest(questionId, userId)
      router.push(`/question/${questionId}/answer/${answerRes.id}`)
    }

    const isFollow = ref(false)
    onMounted(async () => {
      // 查询是否已经关注问题
      const userFollowQuestionList = await getUserFollowQuestionList(userId)
      if (userFollowQuestionList.length > 0) {
        userFollowQuestionList.forEach((item) => {
          if (item.id == props.questionId && item.status == 1) {
            isFollow.value = true
          }
        })
      }

      // 查询该问题的关注人数
      // const
    })
    const follow_num = ref(props.questionInfo.question)
    const followQuestionfun = async () => {
      emit('follow_numberIncre')
      isFollow.value = true
      await followQuestion(props.questionInfo.question.id)
    }
    const unfollowQuestionfun = async () => {
      emit('follow_numberDecre')
      isFollow.value = false
      await unfollowQuestion(props.questionInfo.question.id)
    }

    const dialogFormVisible = ref(false)
    const userList = reactive([])
    getUserInviteOtherList(props.questionId).then((res) => {
      res.forEach((item) => {
        // console.log(item)
        userList.push(item)
      })
      console.log(userList)
    })
    const inviteUser = async (item) => {
      item.isInvite = true
      const res = await InviteUserAnswer(props.questionId, item.id)
      console.log(res)
    }
    return {
      handleShowAll,
      isShowAll,
      handleShowPart,
      text,
      isShowEditor,
      editorRef,
      handlecommitAnswer,
      handleEditAnswer,
      handleShowMyAnswer,
      answerValue,
      isFollow,
      followQuestionfun,
      unfollowQuestionfun,
      follow_num,
      dialogFormVisible,
      userList,
      inviteUser
    }
  }
}
</script>

<style scoped>
.question-header-content {
  display: flex;
  justify-content: flex-start;
  padding-left: 220px;
}
.question-hader-footer {
  margin-top: 10px;
  padding-left: 240px;
}
.question-header-tag {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #06f;
  border-radius: 100px;
  background-color: rgba(0, 102, 255, 0.1);
  padding: 0 12px;
}
.question-header-main {
  width: 694px;
  padding-left: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.question-header-title {
  margin-top: 12px;
  margin-bottom: 4px;
}
.question-header-text {
  cursor: pointer;
}
.question-header-button1 {
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #8590a6;
}
.question-header-button {
  margin-left: 400px;
  cursor: pointer;
  border: none;
  border-radius: 0%;
  background-color: transparent;
  color: #8590a6;
}
.QuestionHeader-side {
  width: 285px;
  flex-grow: 1;
}
.question-header-side {
  display: flex;
  margin-left: 100px;
}
.question-header-follow {
  padding-right: 25px;
  height: 50px;
  border-right: 1px solid #ebebeb;
  text-align: center;
  cursor: pointer;
}
.question-header-browse {
  padding-left: 25px;
  text-align: center;
}
.question-header-follower {
  font-size: 14px;
  color: #8590a6;
}
.question-header-follow-num {
  font-size: 18px;
  color: #121212;
  font-weight: 600;
}
.footer-follow {
  margin: 0 8px;
  color: #fff;
  background-color: #06f;
}
.editor-box {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.editor-box2 {
  background-color: rgb(251, 251, 251);
  border: 1px solid #ebebeb;
  width: 940px;
  height: 1200px;
}
.editor-box2-footer {
  border-top: 1px solid #ebebeb;
  /* box-sizing: border-box; */
  width: 750px;
  height: 100px;
  margin: 0 100px;
  background-color: white;
}
.icon-button {
  padding-top: 12px;
  display: inline-block;
  width: 110px;
  height: 30px;
}
.container {
  width: 100%;
  height: 600px;
  overflow: auto;
}
.user-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgb(246, 246, 246);
}
.item-image {
  width: 50px;
  height: 50px;
}
.item-invite {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
  color: #06f;
  border-color: #06f;
}
.item-invited {
  display: inline-block;
  padding: 0 23px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
  color: rgb(194, 200, 211);
  border-color: rgb(194, 200, 211);
}
.item-head {
  margin-left: 10px;
  width: 70%;
}
.item-head-title {
  color: black;
  margin-bottom: 4px;
}
</style>
