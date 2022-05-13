<template>
  <div class="topic">this is topic</div>
</template>

<script>
import { watch } from 'vue-demi'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    watch(
      route,
      () => {
        const keyword = route.query.keyword
        console.log(keyword)
      },
      {
        deep: true,
        immediate: true
      }
    )
  }
}
</script>

<style></style>
