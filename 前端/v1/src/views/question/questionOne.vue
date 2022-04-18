<template>
  <div class="mainbox">
    <question-content></question-content>
  </div>
</template>

<script>
import QuestionContent from './cpns/content.vue'

export default {
  components: {
    QuestionContent
  },
  setup() {}
}
</script>

<style scoped>
.mainbox {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
