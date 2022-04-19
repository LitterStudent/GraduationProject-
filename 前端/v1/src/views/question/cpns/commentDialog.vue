<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <template #title> <div class="comment-header">n条评论</div> </template>
    <div class="comment-box">
      <div class="comment-item">
        <div class="comment-item-header">
          <el-avatar
            shape="square"
            size="small"
            src="https://pic2.zhimg.com/v2-dc867b3349fda0128e0c712f5afdd4ef_xl.jpg?source=32738c0c"
          />
          <span class="comment-item-name">白鹭的鹭</span>
        </div>
        <div class="comment-item-content">
          [尴尬]不消费这个观点，只有小孩子才能同意。人人不消费，商铺食店都没了，你也要没。你是想回到拿着鱼叉打猎的时代？你适应不了时代，是你一个人的事，在这里发动变革呢？[尴尬][尴尬]
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-item-header">
          <el-avatar
            shape="square"
            size="small"
            src="https://pic2.zhimg.com/v2-dc867b3349fda0128e0c712f5afdd4ef_xl.jpg?source=32738c0c"
          />
          <span class="comment-item-name">白鹭的鹭</span>
        </div>
        <div class="comment-item-content">
          [尴尬]不消费这个观点，只有小孩子才能同意。人人不消费，商铺食店都没了，你也要没。你是想回到拿着鱼叉打猎的时代？你适应不了时代，是你一个人的事，在这里发动变革呢？[尴尬][尴尬]
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-item-header">
          <el-avatar
            shape="square"
            size="small"
            src="https://pic2.zhimg.com/v2-dc867b3349fda0128e0c712f5afdd4ef_xl.jpg?source=32738c0c"
          />
          <span class="comment-item-name">白鹭的鹭</span>
        </div>
        <div class="comment-item-content">
          [尴尬]不消费这个观点，只有小孩子才能同意。人人不消费，商铺食店都没了，你也要没。你是想回到拿着鱼叉打猎的时代？你适应不了时代，是你一个人的事，在这里发动变革呢？[尴尬][尴尬]
        </div>
      </div>
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
import { createUserComentList, getComentOneList } from '@/service/user/user'
import { ElMessage } from 'element-plus'
export default {
  props: ['commentVisable', 'answerid'],
  setup(props, { emit }) {
    // console.log(props.commentVisable)
    const dialogFormVisible = computed({
      get() {
        return props.commentVisable
      },
      set() {
        emit('closeComent')
      }
    })
    const inputRef = ref()
    const replyComment = ''
    const answer_id = props.answerid
    console.log(answer_id)
    // 获取一级评论
    const commentOne = reactive([])
    getComentOneList(answer_id).then((res) => {
      res.forEach((item) => {
        commentOne.push(item)
      })
      commentOne.
    })
    // 获取二级评论


    // const handle = () => {
    //   inputRef.value.placeholder = '回复叮当的'
    //   inputRef.value.focus()
    // }
    const handleCommit = async () => {
      const inputValue = inputRef.value.value
      console.log(inputValue)
      console.log(answer_id)
      if (!replyComment) {
        // 如果不是二级评论
        await createUserComentList(answer_id, {
          content: inputValue
        })
        console.log(inputRef.value)
        ElMessage({
          showClose: true,
          message: '评论发布成功',
          type: 'success'
        })
        inputRef.value.value = ''
      } else {
        // 二级评论
        console.log(replyComment)
      }
    }
    return {
      dialogFormVisible,
      inputRef,
      handleCommit
    }
  }
}
</script>

<style scoped>
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
  border-bottom: 1px solid #f6f6f6;
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
  margin: 0 10px;
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
</style>
