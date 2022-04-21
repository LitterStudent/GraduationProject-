<template>
  <div class="user_avatar">
    <div class="user_avatar_pic">
      <div class="pic-box">
        <el-avatar
          :src="user.avatar_url"
          alt=""
          style="width: 100%; height: 100%;"
        ></el-avatar>
      </div>
      <span class="pic-name">{{ user.name }} </span>
      <span>,</span>
      <span class="pic-line">{{ user.line }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'user']
}
</script>

<style scoped>
.user_avatar {
  margin-top: 15px;
  /* margin-left: 20px; */
  /* margin-bottom: 10px; */
}

.user_avatar_pic {
  display: flex;
  align-items: center;
}
.pic-box {
  width: 24px;
  height: 24px;
}
.pic-name {
  margin-left: 10px;
  font-weight: 600;
}
.pic-line {
  margin-left: 10px;
  font-size: 14px;
  color: #646464;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
