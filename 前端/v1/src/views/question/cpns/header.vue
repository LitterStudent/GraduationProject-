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
              <strong class="question-header-follow-num">1555</strong>
            </div>
            <div class="question-header-browse">
              <div class="question-header-follower">被浏览</div>
              <strong class="question-header-follow-num">4,159,852</strong>
            </div>
          </div>
        </div>
        <div class="question-hader-footer">
          <el-button type="primary" color="#06f">关注问题</el-button>
          <el-button type="primary" color="#06f" plain>
            <span v-if="isAnswer" @click="handleEditAnswer">
              <el-icon style="margin-right: 5px"><edit-pen /></el-icon
              >编辑我的回答
            </span>
            <span v-else-if="isWrite" @click="handleShowMyAnswer">
              <el-icon style="margin-right: 5px"><edit-pen /></el-icon
              >查看我的回答
            </span>
            <span v-else @click="isShowEditor = true">
              <el-icon style="margin-right: 5px"><edit-pen /></el-icon>写回答
            </span>
          </el-button>
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
</template>

<script>
import { EditPen, ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import Editor from '@/components/editor/editor.vue'
import {
  createAnswerRequest,
  updateAnswerRequest,
  finUserAnswerRequest
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
  props: ['questionInfo', 'isWrite', 'isAnswer', 'answerOne'],
  setup(props) {
    const store = useStore()
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
      console.log(span.childNodes)
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
      } else {
        // 更新
        const id = props.questionInfo.question.id
        // console.log(props.answerOne)
        const res = await updateAnswerRequest(id, props.answerOne.id, {
          content
        })
        console.log(res)
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
      const userId = store.state.login.userInfo.id
      const answerRes = await finUserAnswerRequest(questionId, userId)
      console.log(`/question/${questionId}/answer/${answerRes.id}`)
      router.push(`/question/${questionId}/answer/${answerRes.id}`)
      console.log('object')
      location.replace(
        `http://localhost:8080/#question/${questionId}/answer/${answerRes.id}`
      )
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
      answerValue
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
</style>
