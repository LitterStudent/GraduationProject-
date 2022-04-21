<template>
  <div class="column">
    <h2 class="title">随 心 写 作， 自 由 表 达</h2>
    <div class="button-box">
      <button class="start-button" @click="handleStartWrite">开始写文章</button>
    </div>
    <div class="open-column">
      <span @click="handleAppluColumn">申请开通专栏></span>
    </div>
    <h3 class="title2">专栏 · 发现</h3>
    <div class="content">
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/a3aea3450145f2fe7e8bac0f45dd2e57_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">Gogolearning教师成长学苑</div>
        <div class="column-item-description">
          关注K-12双语教育，为老师和家长提供有参考价值的资讯和方法
        </div>
        <div class="column-item-status">
          <span>6,503 人关注</span> |
          <span> 138 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      title="申请开通专栏"
      width="30%"
      center
    >
      <input
        type="text"
        v-model="columnItem.title"
        class="dilog-input"
        placeholder="请输入专栏名称"
      />
      <input
        type="text"
        v-model="columnItem.description"
        class="dilog-input2"
        placeholder="请用一句话介绍"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCommit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { createColumn } from '@/service/user/user'
export default {
  setup() {
    const centerDialogVisible = ref(false)
    const handleAppluColumn = () => {
      centerDialogVisible.value = true
    }
    const columnItem = reactive({ title: '', description: '' })
    const handleCommit = async () => {
      centerDialogVisible.value = false
      const data = {
        title: columnItem.title,
        description: columnItem.description
      }
      const res = await createColumn(data)
      console.log(res)
      //   router.push()
    }
    const handleStartWrite = () => {
      window.open('/#/editor')
    }
    return {
      centerDialogVisible,
      handleAppluColumn,
      handleCommit,
      columnItem,
      handleStartWrite
    }
  }
}
</script>

<style scoped>
.column {
  position: relative;
  margin-top: 50px;
}
.title {
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
}
.button-box {
  margin-top: 30px;
  text-align: center;
}
.start-button {
  color: #444;
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
}
.open-column {
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: rgb(16, 156, 98);
}
.title2 {
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}
.content {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 888px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.column-item {
  background-color: white;
  width: 180px;
  height: 216px;
  padding: 26px 10px 23px 10px;
  margin: 0 8px 16px 8px;
}
.avatar {
  text-align: center;
}
.column-item-title {
  text-align: center;
  height: 21px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}
.column-item-description {
  margin: 5px 0;
  font-size: 14px;
  color: grey;
  overflow: hidden;
  height: 42px;
}
.column-item-status {
  font-size: 14px;
  color: grey;
}
.column-item-enter {
  margin-top: 30px;
  text-align: center;
}
.column-item-enter-button {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
  color: #11a668;
  border-color: #11a668;
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
</style>
