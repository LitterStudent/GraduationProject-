<template>
  <div class="nav_header">
    <a href="/" class="alink" style="margin: 0 200px">
      <svg
        t="1651039606485"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5246"
        width="50"
        height="50"
      >
        <path
          d="M926.72 144.896H97.28v634.88h315.904l98.816 98.816 98.816-98.816H926.72v-634.88z m-30.72 604.16h-299.52v1.536L512 835.072l-85.504-85.504v-1.024h-1.024l-0.512-0.512-0.512 0.512H128v-573.44h768v573.952z"
          fill="#0066FF"
          p-id="5247"
        ></path>
        <path
          d="M304.64 321.024h30.72v122.88h-30.72zM688.64 321.024h30.72v122.88h-30.72zM513.536 633.344c71.68 0 140.8-10.752 195.072-29.696 20.48-7.168 38.4-15.36 53.76-24.576l-15.872-26.112c-13.312 8.192-29.696 15.36-48.128 22.016-51.2 17.92-116.736 27.648-185.344 27.648-69.632 0-136.704-10.24-188.416-29.184-20.48-7.68-38.4-15.872-52.224-25.6l-17.408 25.6c15.872 10.752 35.84 20.48 58.88 29.184 55.808 19.968 126.464 30.72 199.68 30.72z"
          fill="#0066FF"
          p-id="5248"
        ></path>
      </svg>
    </a>
    <div class="search">
      <el-autocomplete
        v-model="state"
        popper-class="my-autocomplete"
        placeholder=" 搜索问题/文章/话题/用户"
        @select="handleSelect"
        style="width: 100%"
      >
        <template #suffix>
          <el-icon class="el-input__icon" @click="handleIconClick">
            <search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <div class="value">{{ item.value }}</div>
          <span class="link">{{ item.link }}</span>
        </template>
      </el-autocomplete>
    </div>
    <el-button @click="handClickQuestion" color="rgb(0, 102, 255)" round
      >提问</el-button
    >
    <el-button color="rgb(0, 102, 255)" @click="handClickColumn" round
      >专栏</el-button
    >

    <div class="info">
      <!-- 提示icon -->
      <inform></inform>
      <!-- 头像 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar shape="square" :src="avatar_url" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handlePeople">
              <template #>
                我的主页
                <el-icon> <user-filled /> </el-icon>
              </template>
            </el-dropdown-item>
            <el-dropdown-item @click="handlelogout">
              <template #>
                退出登录
                <el-icon><switch-button /></el-icon>
              </template>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Search, UserFilled, SwitchButton } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import localCache from '@/utils/cache'
import router from '@/router'
import { useStore } from 'vuex'
import Inform from './cpns/inform.vue'
export default {
  components: {
    Search,
    UserFilled,
    SwitchButton,
    Inform
  },
  emits: ['dialogVisible'],
  setup(props, { emit }) {
    const handleIconClick = (e) => {
      console.log(e)
      console.log(this)
    }
    const handlelogout = () => {
      localCache.deleteCache('token')
      router.push('/login')
    }
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const avatar_url = store.state.login.userInfo.avatar_url
    const handlePeople = () => {
      const path = `/people/${userId}/index`
      router.push(path)
    }
    const state = ref('叮当的')
    const loadAll = () => {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' }
      ]
    }
    const links = ref([])
    let timeout
    const querySearch = (queryString, cb) => {
      console.log(queryString)
      // 这里进行网络数据请求
      const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    }
    const createFilter = (queryString) => {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    }
    const handleSelect = (item) => {
      console.log(item)
    }
    onMounted(() => {
      links.value = loadAll()
    })

    const squareUrl = ref(
      'https://pica.zhimg.com/v2-c951a81312d4457f3cfec3ce2f4ea261_is.jpg?source=32738c0c'
    )

    const handClickQuestion = () => {
      console.log(props)
      emit('dialogVisible')
    }
    const handClickColumn = () => {
      window.open('/#/column')
    }
    return {
      state,
      handleSelect,
      handleIconClick,
      querySearch,
      squareUrl,
      handlelogout,
      handlePeople,
      avatar_url,
      handClickQuestion,
      handClickColumn
    }
  }
}
</script>

<style>
.nav_header {
  height: 100%;
  display: flex;
  align-items: center;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
  /* justify-content: center; */
}
.alink {
  margin-left: 120px;
  margin-right: 40px;
}

.search {
  width: 400px;
  /* margin-left: 200px; */
  margin-right: 40px;
  /* border-radius: 40px; */
}
.el-input__inner {
  height: 36px !important;
  border-radius: 99px !important;
  background-color: rgb(246, 246, 246) !important;
}
.el-input__icon {
  cursor: pointer;
}
.info {
  display: flex;
  align-items: center;
  margin-left: 400px;
  cursor: pointer;
}
.inform {
  margin-top: 5px;
  font-size: 26px;
  margin-right: 40px;
  color: rgb(133, 144, 166);
}
</style>
