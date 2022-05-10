<template>
  <div class="user_avatar">
    <div class="user_avatar_info" @click="handleClickUser">
      {{ item.user2.username }}
      <template v-if="item.type == 0">赞同了该回答</template>
      <template v-else-if="item.type == 1">赞同了该文章</template>
      <template v-else-if="item.type == 2">回答了该问题</template>
      <template v-else-if="item.type == 3">创作了该文章</template>
    </div>
    <div class="user_avatar_pic" @click="handleClickUser2">
      <div class="pic-box">
        <el-avatar
          :src="item.user.avatar_url"
          style="width: 100%; height: 100%"
        ></el-avatar>
      </div>
      <span class="pic-name">{{ item.user.username }} </span>
      <span>,</span>
      <span class="pic-line">{{ item.user.headline }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  setup(props) {
    const handleClickUser = () => {
      window.open(`/#/people/${props.item.user2.id}/index`)
    }
    const handleClickUser2 = () => {
      window.open(`/#/people/${props.item.user.id}/index`)
    }
    return {
      handleClickUser,
      handleClickUser2
    }
  }
}
</script>

<style scoped>
.user_avatar {
  margin-top: 15px;
  margin-left: 20px;
  /* margin-bottom: 10px; */
}
.user_avatar_info {
  cursor: pointer;
  color: #8590a6;
  margin-bottom: 6px;
  height: 24px;
  font-size: 15;
}
.user_avatar_pic {
  cursor: pointer;
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
