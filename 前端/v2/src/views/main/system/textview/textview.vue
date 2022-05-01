<template>
  <div class="text-view">
    <div class="text-view-content">1111111111</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { getOneAnswer, getOneArticle } from '@/service/main/system/system'
export default defineComponent({
  name: 'textview',
  components: {},
  setup() {
    const route = useRoute()
    const type = route.params.type
    const answer_or_article_id = route.params.id
    if (type == 'answer') {
      getOneAnswer(answer_or_article_id).then((res) => {
        const container = document.querySelector('.text-view-content')
        container!.innerHTML = res.content
        console.log(res)
      })
      console.log(answer_or_article_id)
    } else if (type == 'article') {
      getOneArticle(answer_or_article_id).then((res) => {
        const container = document.querySelector('.text-view-content')
        container!.innerHTML = res.content
        console.log(res)
      })
    }
  }
})
</script>

<style scoped>
.text-view {
  text-align: left;
}
.text-view-content {
  padding: 50px 30px 20px 50px;
}
</style>
