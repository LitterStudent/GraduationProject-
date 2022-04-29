<template>
  <div class="column">
    <div class="title">{{ me }}的专栏</div>
    <template v-if="columnList.length > 0">
      <div
        class="colum-item"
        v-for="item in columnList"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <h2 class="column-item-title">{{ item.title }}</h2>
        <div class="colum-item-info">
          <div class="description">{{ item.description }}</div>
          <div class="status">
            <span style="margin-right: 10px">{{ item.article_num }}篇文章</span>
            <span>{{ item.favorite_num }}个赞同</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="none-box">还没有任何专栏</div>
    </template>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { getUserAllColumn } from '@/service/user/user'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const pageUserId = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const me = pageUserId == LoginUserId ? ref('我') : ref('他')
    const columnList = reactive([])
    getUserAllColumn(pageUserId).then((res) => {
      res.forEach((item) => {
        columnList.push(item)
      })
    })
    const handleClick = (id) => {
      router.push(`/column/${id}`)
    }
    return {
      me,
      columnList,
      handleClick
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 600;
  padding: 2px 20px 2px 20px;
  border-bottom-color: rgb(240, 242, 247);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.colum-item {
  padding: 16px 20px;
}
.column-item-title {
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}
.description {
  margin: 5px 0;
  font-size: 15px;
  color: #646464;
}
.status {
  font-size: 14px;
  color: #8590a6;
}
.none-box {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(133, 144, 166);
  font-size: 16px;
}
</style>
