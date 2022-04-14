<template>
  <div class="user_avatar">
    <div class="info">{{ item.user_name }}回答了该问题-1小时前</div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
.user_avatar {
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.info {
  color: #8590a6;
  margin-bottom: 6px;
  height: 24px;
  font-size: 15;
}
</style>
