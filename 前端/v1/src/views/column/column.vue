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
            :src="'https://pic3.zhimg.com/v2-916a76ddd87369dc9fd5889bbd24c95c_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">「雾中风景」电影视与听</div>
        <div class="column-item-description">
          Dear Readers: In my humble opinion, Sight and Sound, plain and simple,
          are really what cinema is all about. In this column, I will share my
          understanding of VISUAL LITERACY, and how I train my EYE and HEART to
          find my unique VIEW and VOICE as a film director and Director of
          Photography. I hope it might also help you find yours. Cheers
        </div>
        <div class="column-item-status">
          <span>706 人关注</span> |
          <span> 12 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pica.zhimg.com/v2-0373541cb2767c414860c7a73cdd75ae_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">铺先生</div>
        <div class="column-item-description">
          酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多
        </div>
        <div class="column-item-status">
          <span>3,603 人关注</span> |
          <span> 458 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pic2.zhimg.com/v2-d55226572dff057fff7a9ff82316b269_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">花草和我</div>
        <div class="column-item-description">
          热爱园艺的人，也永远热爱生活。
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
            :src="'https://pic1.zhimg.com/v2-591e38683b2102e630808377dcc4a257_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">阿聪说酒</div>
        <div class="column-item-description">
          看到国内工厂酒、工业调配酒充斥市场，任何号称国外进口的红酒都标价不菲，国人对红酒之爱可谓深切，但限于文化和语言的区别无法深刻理解葡萄酒，希望我的专栏能为大家的更清楚的解释葡萄酒，让更多的人喜欢上红酒。
        </div>
        <div class="column-item-status">
          <span>236 人关注</span> |
          <span> 35 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pic2.zhimg.com/v2-1ce368fe9f7cbb5dbf65e6295975c959_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">壹娱观察</div>
        <div class="column-item-description">
          壹娱观察想做中国电影产业和泛娱乐产业的望远镜和声呐——面对产业，除了要发现新闻，我们还想探索那些深藏在冰山一角之下的新知。
        </div>
        <div class="column-item-status">
          <span>345 人关注</span> |
          <span> 134 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pic3.zhimg.com/v2-385b21a88afcdc2302ef1bb0255156a5_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">星月菩提</div>
        <div class="column-item-description">
          提供星月菩提子盘玩经验星月菩提价格及配饰搭配
        </div>
        <div class="column-item-status">
          <span>403 人关注</span> |
          <span> 58 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="column-item">
        <div class="avatar">
          <el-avatar
            style="width: 48px; height: 48px"
            :src="'https://pic1.zhimg.com/v2-6b56ead13977e1ee2b97ccbe2f264cf6_xs.jpg?source=d16d100b'"
          ></el-avatar>
        </div>
        <div class="column-item-title">单片机与嵌入式系统</div>
        <div class="column-item-description">
          兴趣使我们热爱科技，执着与努力使我们提升技能，这一切，将给我们带来更美好的生活。科技改变生活，明天会更好！
        </div>
        <div class="column-item-status">
          <span>703 人关注</span> |
          <span> 162 篇文章</span>
        </div>
        <div class="column-item-enter">
          <button class="column-item-enter-button">进入专栏</button>
        </div>
      </div>
      <div class="button-box2">
        <button class="start-button" @click="handleStartWrite">
          <el-icon style="vertical-align: middle; margin-right: 4px"
            ><refresh /></el-icon
          >换一换
        </button>
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
import { Refresh } from '@element-plus/icons-vue'
export default {
  components: {
    Refresh
  },
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
.button-box2 {
  margin: 10px 0 40px 0;
  flex: 1;
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
