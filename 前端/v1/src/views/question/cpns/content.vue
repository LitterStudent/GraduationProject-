<template>
  <div class="question-content">
    <div class="authorInfo">
      <div class="infobox">
        <div class="imgbox">
          <el-avatar shape="square" :src="item.userInfo.avatar_url" />
        </div>
        <div class="info">
          <div class="name">
            <strong>{{ item.userInfo.username }} </strong>
          </div>
          <div class="line">
            <span>{{ item.userInfo.headline }}</span>
          </div>
        </div>
      </div>
      <div class="agree">{{ item.favorite_num }}人赞同了该回答</div>
    </div>
    <h2 v-if="ischeck" class="check">内容审核中，审核通过后会自动发布</h2>
    <div class="richcontent" id="richcontent" v-html="itemAddStyle"></div>
    <div class="updateDate">编辑于 {{ item.updated_at }}</div>
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
      <span v-if="isAnswer">
        <el-dropdown>
          <span class="isAnswer">
            <el-icon>
              <el-icon><more /></el-icon>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialogVisible = true"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>确定永久删除该回答吗</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <comment-dialog
    v-if="commentVisable"
    :answerid="item.id"
    :commentVisable="commentVisable"
    @closeComent="commentVisable = false"
  ></comment-dialog>
</template>

<script>
import { ChatRound, CaretTop, More } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { deleteUserAnswerRequest } from '@/service/user/user'
import router from '@/router'
import CommentDialog from './commentDialog.vue'
// import { ElMessageBox } from 'element-plus'
export default {
  props: ['item', 'ischeck', 'isAnswer'],
  components: {
    ChatRound,
    CaretTop,
    More,
    CommentDialog
  },
  setup(props, { emit }) {
    const itemAddStyle = computed(() => {
      const richcontent = document.createElement('div')
      richcontent.innerHTML = props.item.content
      richcontent.childNodes.forEach((item) => {
        if (item.tagName === 'P') {
          item.setAttribute('style', 'padding: 10px 0;')
        }
      })
      return richcontent.innerHTML
    })
    const dialogVisible = ref(false)
    const handleClose = async () => {
      const quesiton_id = props.item.question_id
      const answer_id = props.item.id
      await deleteUserAnswerRequest(quesiton_id, answer_id)
      dialogVisible.value = false
      router.push(`/question/${quesiton_id}`)
    }

    // const isDianZan = ref(props.item.isDianZan)
    const handleDianZan = () => {
      emit('DianZan', props.item)
    }
    const commentVisable = ref(false)
    const handleShowComment = () => {
      console.log(commentVisable.value)
      commentVisable.value = true
    }
    return {
      itemAddStyle,
      dialogVisible,
      handleClose,
      // isDianZan,
      handleDianZan,
      commentVisable,
      handleShowComment
    }
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
  color: rgb(133, 144, 166);
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
.isAnswer {
  display: inline-block;
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  margin-left: 20px;
  color: #8590a6;
}
</style>
