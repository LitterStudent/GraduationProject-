<template>
  <!-- <h2>this is hot</h2> -->
  <div class="hot">
    <div
      class="hot-item"
      v-for="item in list"
      :key="item.sort"
      @click="handleClick(item.id)"
    >
      <div class="item-sort">{{ item.sort }}</div>
      <div class="item-content">
        <h2 class="content-title">{{ item.title }}</h2>
        <p class="content-description">{{ item.description }}</p>
      </div>
      <div class="item-cover">
        <img
          style="width: 100%; height: 100%; border-radius: 4px"
          :src="item.cover_url"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getRank } from '@/service/user/user'
import { reactive } from 'vue'
export default {
  setup() {
    const list = reactive([])
    getRank().then((res) => {
      console.log(res)
      res.forEach((item) => {
        list.unshift({
          sort: item.rank_num,
          title: item.question.question_name,
          description: item.question.description,
          cover_url: item.cover_url,
          id: item.question_id
        })
      })
    })
    const handleClick = (id) => {
      window.open(`/#/question/${id}`)
    }
    return {
      list,
      handleClick
    }
  }
}
</script>

<style scoped>
.hot-item {
  width: 100%;
  min-height: 120px;
  padding: 16px 16px 0 0;
  display: flex;
  border-bottom: rgb(235, 235, 235) solid 1px;
}
.item-sort {
  padding: 0 17px;
  color: rgb(255, 163, 143);
  font-size: 18px;
  font-weight: 600;
}
.content-title {
  font-size: 18px;
  line-height: 28px;
  max-height: 56px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 600;
}
.content-description {
  padding: 5px 0;
  line-height: 25px;
  margin-top: 2px;
  min-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-content {
  width: 640px;
  padding-right: 10px;
}
.item-cover {
  width: 190px;
  height: 105px;
}
</style>
