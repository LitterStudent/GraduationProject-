<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <template #title>
      <div class="comment-header">{{ commentOneList.length }}条评论</div>
    </template>
    <div class="comment-box">
      <transition-group name="commentOneList">
        <div class="comment-item" v-for="item in commentOneList" :key="item.id">
          <div class="comment-item-header">
            <el-avatar
              shape="square"
              size="small"
              :src="item.user.avatar_url"
            />
            <span class="comment-item-name">{{ item.user.username }}</span>
            <span class="comment-item-date">{{ item.updated_at }}</span>
          </div>
          <div class="comment-item-content">
            {{ item.content }}
            <span
              class="comment-item-content-replyicon"
              v-if="item.user.id != user_id"
              @click="handleReply(item)"
            >
              <el-icon><share /></el-icon>回复
            </span>
            <span
              class="comment-item-content-replyicon"
              v-else
              @click="handleDelte(item)"
            >
              <el-icon><delete /></el-icon>删除评论
            </span>
          </div>
          <transition-group name="commentOneList">
            <div
              class="comment-item-replyComment"
              v-for="item2 in item.commentReply"
              :key="item2.key"
            >
              <div class="comment-item-header">
                <el-avatar
                  shape="square"
                  size="small"
                  :src="item2.user.avatar_url"
                />
                <span class="comment-item-name">{{ item2.user.username }}</span>
                <span class="comment-item-reply">回复</span>
                <span class="comment-item-reply_user">{{
                  item2.reply_user.username
                }}</span>
                <span class="comment-item-date">{{ item2.updated_at }}</span>
              </div>
              <div class="comment-item-content">
                {{ item2.content }}
                <span
                  class="comment-item-content-replyicon"
                  @click="handleReply2(item2)"
                  v-if="item2.user.id != user_id"
                >
                  <el-icon><share /></el-icon>回复
                </span>
                <span
                  class="comment-item-content-replyicon"
                  v-else
                  @click="handleDelte2(item2)"
                >
                  <el-icon><delete /></el-icon>删除评论
                </span>
              </div>
            </div>
          </transition-group>
        </div>
      </transition-group>
    </div>
    <template #footer>
      <div class="comment-footer">
        <input
          ref="inputRef"
          type="text"
          class="comment-footer-input"
          placeholder="写下你的评论"
        />
        <button class="comment-footer-button" @click="handleCommit">
          发布
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import {
  createUserCommentone,
  createUserCommenttwo,
  getComentOneList,
  getComentTwoList,
  deleteUserCommentone
} from '@/service/user/user'
import { ElMessage } from 'element-plus'
import { formatUtcString } from '@/utils/date-format'
import { Share, Delete } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
export default {
  props: ['commentVisable', 'answerid'],
  components: {
    Share,
    Delete
  },
  setup(props, { emit }) {
    // console.log(props.commentVisable)
    const store = useStore()
    const user_id = store.state.login.userInfo.id
    const dialogFormVisible = computed({
      get() {
        return props.commentVisable
      },
      set() {
        emit('closeComent')
      }
    })
    const inputRef = ref()
    const answer_id = props.answerid
    console.log(answer_id)
    // 获取一级评论
    const commentOneList = reactive([])
    getComentOneList(answer_id).then((res) => {
      res.forEach((item) => {
        commentOneList.push(item)
      })
      getComentTwoList(answer_id).then((res) => {
        console.log(res)
        commentOneList.forEach((item) => {
          item.updated_at = formatUtcString(item.updated_at, 'YYYY-MM-DD')
          res.forEach((item2) => {
            item2.updated_at = formatUtcString(item2.updated_at, 'YYYY-MM-DD')
            if (item.id == item2.comment_id) {
              if (!item['commentReply']) {
                item['commentReply'] = [item2]
              } else {
                item['commentReply'].push(item2)
              }
            }
          })
        })
        console.log(commentOneList)
      })
    })
    // 获取二级评论
    const replyInfo = { reply_userid: '', reply_username: '', comment_id: '' }
    const handleReply = (item) => {
      // console.log(item)
      inputRef.value.placeholder = `回复 ${item.user.username}`
      replyInfo.reply_userid = item.user.id
      replyInfo.comment_id = item.id
      replyInfo.reply_username = item.user.username
      console.log(replyInfo)
      inputRef.value.focus()
    }

    const handleReply2 = (item) => {
      console.log(item)
      inputRef.value.placeholder = `回复 ${item.user.username}`
      replyInfo.reply_userid = item.user.id
      replyInfo.comment_id = item.comment_id
      replyInfo.reply_username = item.user.username
      console.log(replyInfo)
      inputRef.value.focus()
    }
    const handleDelte = async (item) => {
      const index = commentOneList.findIndex((comment) => comment.id == item.id)
      commentOneList.splice(index, 1)
      const res = await deleteUserCommentone(item.id)
      console.log(res)
    }
    const handleDelte2 = async (item) => {
      console.log(item, commentOneList)
      const index = commentOneList.findIndex(
        (comment) => comment.id == item.comment_id
      )
      const index2 = commentOneList[index]['commentReply'].findIndex(
        (commentReply) => commentReply.id == item.id
      )
      commentOneList[index]['commentReply'].splice(index2, 1)
      // const res = await deleteUserCommentone(item.id)
      // console.log(res)
    }
    const handleCommit = async () => {
      const inputValue = inputRef.value.value
      console.log(inputValue)
      console.log(answer_id)
      if (!replyInfo.reply_userid) {
        // 如果不是二级评论
        const res = await createUserCommentone(answer_id, {
          content: inputValue
        })
        res.updated_at = formatUtcString(res.updated_at, 'YYYY-MM-DD')
        commentOneList.unshift(res)
        ElMessage({
          showClose: true,
          message: '评论发布成功',
          type: 'success'
        })
        inputRef.value.value = ''
      } else {
        // 二级评论
        const { comment_id, reply_userid, reply_username } = replyInfo
        const res = await createUserCommenttwo(comment_id, {
          content: inputValue,
          reply_user_id: reply_userid + ''
        })
        console.log(res)
        const commentOne = commentOneList.find((item) => item.id == comment_id)
        if (commentOne['commentReply']) {
          commentOne['commentReply'].push(res)
        } else {
          commentOne['commentReply'] = [res]
        }
        ElMessage({
          showClose: true,
          message: '评论发布成功',
          type: 'success'
        })
        inputRef.value.value = ''
        inputRef.value.placeholder = ''
        replyInfo.reply_userid = ''
        console.log(reply_username)
      }
    }
    return {
      dialogFormVisible,
      inputRef,
      handleCommit,
      commentOneList,
      handleReply,
      handleReply2,
      handleDelte,
      handleDelte2,
      user_id
    }
  }
}
</script>

<style scoped>
.commentOneList-enter-active,
.commentOneList-leave-active {
  transition: all 1s ease;
}
.commentOneList-enter-from,
.commentOneList-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.comment-box {
  /* width: 200px; */
  height: 500px;
  background-color: white;
  overflow: auto;
}
.comment-header {
  /* box-sizing: border-box; */
  font-size: 16px;
  /* width: 45%; */
  /* height: 40px; */
  font-weight: 600;
  /* border-bottom: 1px solid #f6f6f6; */
}
.comment-item {
  /* display: flex; */
  padding-top: 20px;
  border-bottom: 1px solid #f6f6f6;
}
.comment-item-reply {
  margin-left: 5px;
  margin-right: 10px;
  color: rgb(155, 164, 182);
}
.comment-item-replyComment {
  border-top: 1px solid #f6f6f6;
  margin-left: 40px;
}
.img-box {
  width: 15px;
  height: 15px;
}
.el-dialog__body {
  padding-top: 0 !important;
}
.comment-item-header {
  display: flex;
  align-items: center;
}
.comment-item-name {
  /* justify-content: flex-end; */
}
.comment-item-date {
  flex: 1;
  text-align: right;
  margin-right: 10px;
  color: rgb(133, 144, 166);
}
.comment-item-content {
  margin-top: 5px;
  margin-left: 35px;
  margin-bottom: 10px;
}
.comment-footer {
  width: 100%;
  /* background-color: red; */
  display: flex;
  /* justify-content: flex-start; */
}
.comment-footer-input {
  width: 85%;
  height: 35px;
  padding-left: 10px;
  font-size: 16px;
  border: 1px solid rgb(133, 144, 166);
  border-radius: 4px;
  outline: none;
}
.comment-footer-button {
  background-color: rgb(0, 92, 230);
  border-radius: 5px;
  color: white;
  border: none;
  width: 15%;
  margin-left: 10px;
}

.comment-item-content-replyicon {
  margin-left: 10px;
  opacity: 0;
  cursor: pointer;
  color: rgb(118, 131, 155);
  transition: opacity 0.2s;
}
.comment-item-content-replyicon:hover {
  opacity: 1;
}
</style>
