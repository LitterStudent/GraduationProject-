<template>
  <el-container class="people-container">
    <el-header class="people-info">
      <div class="people-cover">
        <button class="editPic" v-if="isOwner">
          <el-icon class="icon"><camera-filled /></el-icon>编辑封面图片
        </button>
        <img :src="userInfo.background_url" class="peo-pic" />
      </div>
      <div class="people-content">
        <div class="people-avatar">
          <img :src="userInfo.avatar_url" class="people-pic" />
          <!-- <el-avatar :src="userInfo.background_url" /> -->
          <div class="mask" v-if="isOwner">
            <div class="mask-text">
              <div>
                <el-icon class="mas-icon"><camera-filled /></el-icon>
              </div>
              修改我的头像
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="content-head">
            <h1>
              <span class="head-name">{{ userInfo.username }}</span>
              <span class="head-line">{{ userInfo.headline }}</span>
            </h1>
          </div>
          <div class="content-body">
            <div class="detail-item">
              <span class="detail-lable">居住地</span>
              <span class="detail-value">现居{{ userInfo.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-lable">所在行业</span>
              <span class="detail-value">{{ userInfo.business }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-lable">性别</span>
              <span class="detail-value">{{
                userInfo.gender == 0 ? '男' : '女'
              }}</span>
            </div>
          </div>
          <div class="content-footer">
            <button
              class="edit-profile"
              @click="handleEditProfile"
              v-if="isOwner"
            >
              编辑个人资料
            </button>
            <button
              class="follow-people"
              @click="handleFollow"
              v-else-if="isFollow == false"
            >
              关注 Ta
            </button>
            <button class="follow-people" @click="handleFollow" v-else>
              已经关注
            </button>
          </div>
        </div>
      </div>
    </el-header>
    <el-container class="profile-main">
      <el-aside class="main">
        <aside-header :menus="menus" :defaultActive="'1'"></aside-header>
        <router-view></router-view>
        <!-- this is aside one -->
      </el-aside>
      <el-aside class="aside">
        <div class="card">
          <div class="card-head">个人成就</div>
          <div class="card-content">
            <div class="card-item">
              <el-icon style="margin-right: 10px; font-size: 20px"
                ><star-filled
              /></el-icon>
              <span>获得 {{ userInfo.belikedNum }} 次赞同</span>
            </div>
            <div class="card-item" style="margin-top: 20px">
              <el-icon style="margin-right: 10px; font-size: 20px"
                ><edit-pen
              /></el-icon>
              <span>回答了 {{ userInfo.answerNum }} 次问题</span>
            </div>
          </div>
        </div>
        <div class="card-follow">
          <div
            class="follow-item"
            style="border-right: 1px solid #ebebeb"
            @click="handletoFollow"
          >
            <div class="follow-item-title">关注了</div>
            <div class="follow-item-num">{{ userInfo.followNum }}</div>
          </div>
          <div class="follow-item" @click="handletoFollower">
            <div class="follow-item-title">关注者</div>
            <div class="follow-item-num">{{ userInfo.followerNum }}</div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { CameraFilled, StarFilled, EditPen } from '@element-plus/icons-vue'
import AsideHeader from './cpns/aside_header.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {
  getUserInfo,
  getUserFollowList,
  getUserFollowerList,
  followUser,
  unfollowUser,
  belikedNum,
  getUserAllAnswer
} from '@/service/user/user'
import { reactive, ref } from 'vue'
export default {
  components: {
    CameraFilled,
    StarFilled,
    EditPen,
    AsideHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // console.log(store.state.login.userInfo)
    const userInfo = reactive({
      avatar_url: '',
      background_url: '',
      business: '',
      email: '',
      gender: '',
      headline: '',
      id: '',
      location: '',
      username: ''
    })
    const userId = store.state.login.userInfo.id
    const realUserId = route.params.id
    const isOwner = ref(realUserId == userId)
    const isFollow = ref(false)
    // 获取当前用户页信息
    getUserInfo(realUserId).then((res) => {
      res = res.user
      userInfo.avatar_url = res.avatar_url
      userInfo.background_url = res.background_url
      userInfo.business = res.business
      userInfo.email = res.email
      userInfo.gender = res.gender
      userInfo.headline = res.headline
      userInfo.id = res.id
      userInfo.location = res.location
      userInfo.username = res.username
      if (realUserId == userId) {
        // 更新uesrInfo
        store.commit('login/changeUserInfo', userInfo)
      }
    })
    // 用户获取的点赞数
    belikedNum(realUserId).then((res) => {
      userInfo.belikedNum = res.num
      // console.log(res)
    })
    // 用户的回答数
    getUserAllAnswer(realUserId).then((res) => {
      userInfo.answerNum = res.length
    })
    // 用户的粉丝数和关注数
    getUserFollowerList(realUserId).then((res) => {
      userInfo.followerNum = res.length
    })
    getUserFollowList(userId).then((res) => {
      const userFollowList = res
      userInfo.followNum = userFollowList.length
      // 如果当前页不是登录用户首页，就需要判断该用户是否已经被关注
      if (realUserId != userId) {
        console.log(userFollowList, realUserId)
        userFollowList.forEach((item) => {
          if (item.id == realUserId) {
            isFollow.value = true
          }
        })
      }
    })

    const menus = [
      { index: '1', value: '动态', url: `/people/${realUserId}/index` },
      { index: '2', value: '回答', url: `/people/${realUserId}/answer` },
      { index: '3', value: '提问', url: `/people/${realUserId}/question` },
      { index: '4', value: '文章', url: `/people/${realUserId}/article` },
      { index: '5', value: '专栏', url: `/people/${realUserId}/column` },
      { index: '6', value: '关注', url: `/people/${realUserId}/follow` }
    ]
    const handleEditProfile = () => {
      router.push('/editProfile')
    }

    const handleFollow = async () => {
      if (isFollow.value == false) {
        // 关注用户
        isFollow.value = true
        await followUser(realUserId)
      } else {
        isFollow.value = false
        await unfollowUser(realUserId)
      }
    }
    const handletoFollow = () => {
      router.push(`/people/${realUserId}/follow`)
    }
    const handletoFollower = () => {
      router.push(`/people/${realUserId}/follower`)
    }
    return {
      menus,
      handleEditProfile,
      handleFollow,
      userInfo,
      isOwner,
      isFollow,
      handletoFollow,
      handletoFollower
    }
  }
}
</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 20px;
  padding-right: 10px;
}
.people-container {
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-top: 50px;
}
.el-header {
  padding: 0 !important;
}
.people-info {
  margin-top: 10px;
  height: 440px;
  width: 1010px;
  /* background-color: red; */
}
.people-cover {
  position: relative;
  width: 100%;
  height: 240px;
}
.editPic {
  position: absolute;
  top: 24px;
  right: 24px;
  display: inline-block;
  color: rgba(255, 255, 255, 0.7);
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 3px;
}
.peo-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.people-content {
  background: #fff;
  width: 100%;
  height: 172px;
  position: relative;
  /* margin: 0 20px 24px; */
  padding-bottom: 30px;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}
.people-avatar {
  cursor: pointer;
  width: 160px;
  height: 160px;
  position: absolute;
  left: 20px;
  top: -25px;
  border: 4px solid #fff;
  border-radius: 8px;
}
.people-pic {
  width: 100%;
  height: 100%;
  /* border-radius: 10px; */
  object-fit: cover;
}
.mask {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: black;
  transition: opacity 0.2s ease-in;
}
.mask:hover {
  opacity: 0.4;
}
.mask-text {
  /* transition: opacity 0.2s ease-in; */
  position: absolute;
  left: 20%;
  top: 40%;
  color: white;
}
.mas-icon {
  float: left;
  font-size: 40px;
}
.profile-content {
  margin-left: 174px;
  padding-left: 32px;
  padding-top: 16px;
  width: 764px;
  height: 146px;
  /* border: 1px solid red; */
}
.head-name {
  font-size: 26px;
  font-weight: 600;
  vertical-align: middle;
}
.content-head {
  padding-bottom: 16px;
}
.head-line {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 400;
}
.detail-item {
  display: flex;
  margin-bottom: 10px;
}
.detail-lable {
  font-size: 14px;
  width: 60px;
  margin-right: 37px;
  font-weight: 600;
}
.detail-value {
  font-size: 14px;
}
.content-footer {
  display: flex;
  justify-content: flex-end;
}
.edit-profile,
.follow-people {
  color: #06f;
  border-color: #06f;
  margin-bottom: 20px;
  margin-right: 20px;
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
}
.profile-main {
  margin-top: 25px;
}
.main {
  width: 700px;
  background-color: white;
  margin-right: 10px;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}
.aside {
  /* height: 300px; */
  width: 300px;
  /* background-color: white; */
  /* box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px; */
}
.card {
  width: 100%;
  height: 163px;
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  box-sizing: border-box;
}
.card-head {
  display: flex;
  margin-left: 10px;
  align-items: center;
  height: 50px;
  font-size: 15px;
  font-weight: 600;
  color: #646464;
  border-bottom: 1px solid #f6f6f6;
}
.card-content {
  height: 90px;
  padding: 12px 0;
}
.card-item {
  padding: 6px 20px;
  width: 256px;
  height: 20px;
  color: #646464;
  font-size: 15px;
}
.card-follow {
  display: flex;
  width: 300px;
  height: 75px;
  color: #646464;
  margin-bottom: 10px;
  /* padding-bottom: 10px; */
  background: #fff;
  overflow: hidden;
  border-radius: 2px;
}
.follow-item {
  cursor: pointer;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 150px;
}
.follow-item-title {
  margin-left: 40px;
  margin-top: 15px;
}
.follow-item-num {
  padding-top: 5px;
  margin-left: 55px;
  font-size: 18px;
  font-weight: 600;
  color: black;
}
</style>
