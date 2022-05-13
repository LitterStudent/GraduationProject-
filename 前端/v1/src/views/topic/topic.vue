<template>
  <div class="topic">
    <div class="topic-header">
      <div class="img-box">
        <img :src="topic.avatar_url" class="img" />
      </div>
      <div class="topic-info">
        <span class="title">{{ topic.topic_name }}</span>
        <button
          class="fo-button"
          v-if="!isFollow"
          @click="isFollow = !isFollow"
        >
          关注话题
        </button>
        <button
          class="fo-button2"
          v-if="isFollow"
          @click="isFollow = !isFollow"
        >
          已关注
        </button>

        <div class="description">
          {{ topic.introduction }}
          <span style="color: rgb(133, 158, 197); cursor: pointer"
            >查看全部</span
          >
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="recommend-title">本话题下的内容</div>
      <template v-for="item in answerList" :key="item.user_name">
        <rich-content
          :item="item"
          @click="handleClick(item)"
          class="content-box"
        ></rich-content>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import RichContent from '../index/cpns/rich_content.vue'
import { getTopicContentList, getTopic } from '@/service/user/user'
import { useRoute } from 'vue-router'

export default {
  components: {
    RichContent
  },
  setup() {
    const answerList = reactive([])
    const route = useRoute()
    const id = route.params.id
    getTopicContentList(id).then((res) => {
      console.log(res)
      res.forEach((item) => {
        answerList.push(item)
      })
    })
    const topic = reactive({
      topic_name: '',
      introduction: '',
      avatar_url: ''
    })
    getTopic(id).then((res) => {
      console.log(res)
      topic.topic_name = res.topic_name
      topic.introduction = res.introduction.slice(0, 100) + '...'
      topic.avatar_url = res.avatar_url
    })
    const handleClick = (item) => {
      if (item.cover_url) {
        // 文章
        window.open(`/#/article/${item.id}`)
      } else {
        window.open(`/#/question/${item.question_id}/answer/${item.id}`)
      }
    }
    const isFollow = ref(false)
    return {
      answerList,
      topic,
      handleClick,
      isFollow
    }
  }
}
</script>

<style scoped>
.topic-header {
  margin-top: 60px;
  margin-left: 250px;
  width: 1100px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-box {
  padding: 10px 16px;
  width: 150px;
  /* height: 100px; */
}
.img {
  width: 100%;
  border-radius: 5px;
}
.description {
  color: rgb(100, 100, 150);
  padding-top: 10px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}
.button {
  width: 1100px;
  margin-left: 250px;
  background-color: rgb(255, 255, 255);
}
.fo-button {
  margin: 10px 20px;
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
  color: #fff;
  background-color: #06f;
}
.fo-button2 {
  margin: 10px 20px;
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
  color: #fff;
  background-color: grey;
}
.recommend {
  margin-top: 20px;
  margin-left: 250px;
  width: 1100px;
}

.content-box {
  /* margin-top: 10px; */
  background-color: rgb(255, 255, 255);
}
.recommend-title {
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
}
</style>
