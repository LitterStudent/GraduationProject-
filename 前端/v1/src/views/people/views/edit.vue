<template>
  <el-container class="people-container">
    <el-header class="people-info">
      <div class="people-cover">
        <el-upload
          class="editPicBox"
          action="/api/upload"
          :on-success="handleBackground"
          :show-file-list="false"
        >
          <button class="editPic">
            <el-icon class="icon"><camera-filled /></el-icon>编辑封面图片
          </button>
        </el-upload>

        <img :src="userInfo.background_url" class="peo-pic" />
      </div>
      <div class="people-content">
        <el-upload
          action="/api/upload"
          :on-success="handleAvatar"
          :show-file-list="false"
        >
          <div class="people-avatar">
            <img :src="userInfo.avatar_url" class="people-pic" />
            <div class="mask">
              <div class="mask-text">
                <div>
                  <el-icon class="mas-icon"><camera-filled /></el-icon>
                </div>
                修改我的头像
              </div>
            </div>
          </div>
        </el-upload>
        <div class="profile-content">
          <div class="content-head">
            <div v-if="isShowName">
              <span class="head-name">{{ userInfo.username }}</span>
              <span class="edit-icon" @click="handleEditName">
                <el-icon><edit /></el-icon> 修改
              </span>
              <span class="exit" @click="handleExit">
                <span>返回我的主页</span>
                <el-icon style="vertical-align: middle">
                  <arrow-right-bold />
                </el-icon>
              </span>
            </div>
            <el-form v-else label-position="left">
              <el-form-item
                label="用户名"
                label-width="120px"
                class="form-item"
              >
                <input
                  type="text"
                  class="form-item-input"
                  v-model="userInfo.username"
                />
              </el-form-item>
              <el-form-item style="margin-left: 120px">
                <el-button type="primary" @click="onSubmit('Name')"
                  >保存</el-button
                >
                <el-button @click="handleCancleName">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="content-body">
            <div class="detail-item">
              <div class="box" v-if="isShowGender">
                <span class="detail-lable">性别</span>
                <span class="detail-value">{{ userInfo.gender }}</span>
                <span class="edit-icon" @click="handleEditGender">
                  <el-icon><edit /></el-icon> 修改
                </span>
              </div>
              <el-form v-else label-position="left">
                <el-form-item label="性别" label-width="120px">
                  <el-radio-group v-model="userInfo.gender">
                    <el-radio :label="'男'" value="0" />
                    <el-radio :label="'女'" value="1" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-left: 120px">
                  <el-button type="primary" @click="onSubmit('Gender')"
                    >保存</el-button
                  >
                  <el-button @click="handleCancleGender">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="detail-item">
              <div class="box" v-if="isShowHeadline">
                <span class="detail-lable">一句话介绍</span>
                <span class="detail-value">{{ userInfo.headline }}</span>
                <span class="edit-icon" @click="handleEditHeadline">
                  <el-icon><edit /></el-icon> 修改
                </span>
              </div>
              <el-form v-else label-position="left">
                <el-form-item label="一句话介绍" label-width="120px">
                  <input
                    type="text"
                    class="form-item-input"
                    v-model="userInfo.headline"
                  />
                </el-form-item>
                <el-form-item style="margin-left: 120px">
                  <el-button type="primary" @click="onSubmit('Headline')"
                    >保存</el-button
                  >
                  <el-button @click="handleCancleHeadline">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="detail-item">
              <div class="box" v-if="isShowLocation">
                <span class="detail-lable">居住地</span>
                <span class="detail-value">{{ userInfo.location }}</span>
                <span class="edit-icon" @click="handleEditLocation">
                  <el-icon><edit /></el-icon> 修改
                </span>
              </div>
              <el-form v-else label-position="left">
                <el-form-item label="居住地" label-width="120px">
                  <input
                    type="text"
                    class="form-item-input"
                    v-model="userInfo.location"
                  />
                </el-form-item>
                <el-form-item style="margin-left: 120px">
                  <el-button type="primary" @click="onSubmit('Location')"
                    >保存</el-button
                  >
                  <el-button @click="handleCancleLocation">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="detail-item">
              <div class="box" v-if="isShowBusiness">
                <span class="detail-lable">所处行业</span>
                <span class="detail-value">{{ userInfo.business }}</span>
                <span class="edit-icon" @click="handleEditBusiness">
                  <el-icon><edit /></el-icon> 修改
                </span>
              </div>
              <el-form v-else label-position="left">
                <el-form-item label="居住地" label-width="120px">
                  <input
                    type="text"
                    class="form-item-input"
                    v-model="userInfo.business"
                  />
                </el-form-item>
                <el-form-item style="margin-left: 120px">
                  <el-button type="primary" @click="onSubmit('Business')"
                    >保存</el-button
                  >
                  <el-button @click="handleCancleBusiness">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="detail-item">
              <div class="box">
                <span class="detail-lable">邮箱</span>
                <span class="detail-value">{{ userInfo.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-header>
  </el-container>
</template>

<script>
import { CameraFilled, Edit, ArrowRightBold } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
export default {
  components: {
    CameraFilled,
    Edit,
    ArrowRightBold
  },
  setup() {
    const store = useStore()
    const userInfo = reactive({ ...store.state.login.userInfo })
    console.log(userInfo.gender)
    userInfo.gender = userInfo.gender == 0 ? '男' : '女'
    const isShowName = ref(true)
    const isShowGender = ref(true)
    const isShowHeadline = ref(true)
    const isShowLocation = ref(true)
    const isShowBusiness = ref(true)
    const tempValue = ref('')
    const handleEditName = () => {
      tempValue.value = userInfo.username
      isShowName.value = false
    }
    const handleEditGender = () => {
      tempValue.value = userInfo.gender
      isShowGender.value = false
    }
    const handleEditHeadline = () => {
      tempValue.value = userInfo.headline
      isShowHeadline.value = false
    }
    const handleEditLocation = () => {
      tempValue.value = userInfo.location
      isShowLocation.value = false
    }
    const handleEditBusiness = () => {
      tempValue.value = userInfo.business
      isShowBusiness.value = false
    }
    const handleCancleName = () => {
      isShowName.value = true
      userInfo.username = tempValue.value
    }
    const handleCancleGender = () => {
      isShowGender.value = true
      userInfo.gender = tempValue.value
    }
    const handleCancleHeadline = () => {
      isShowHeadline.value = true
      userInfo.headline = tempValue.value
    }
    const handleCancleLocation = () => {
      isShowLocation.value = true
      userInfo.location = tempValue.value
    }
    const handleCancleBusiness = () => {
      isShowBusiness.value = true
      userInfo.business = tempValue.value
    }
    const onSubmit = (isShow) => {
      if (isShow) {
        if (isShow == 'Name') {
          isShowName.value = true
        } else if (isShow == 'Gender') {
          isShowGender.value = true
        } else if (isShow == 'Headline') {
          isShowHeadline.value = true
        } else if (isShow == 'Location') {
          isShowLocation.value = true
        } else if (isShow == 'Business') {
          isShowBusiness.value = true
        }
      }
      const user = { ...userInfo }
      user.gender = user.gender == '男' ? '0' : '1'
      store.dispatch('login/changeUserInfo', user)
      isShow.value = true
    }
    const handleAvatar = (res) => {
      const newAvatarurl = res.data.url
      userInfo.avatar_url = newAvatarurl
      const user = { ...userInfo }
      user.gender = user.gender == '男' ? '0' : '1'
      store.dispatch('login/changeUserInfo', user)
    }
    const handleBackground = (res) => {
      const newBackgroundUrl = res.data.url
      console.log(newBackgroundUrl)
      userInfo.background_url = newBackgroundUrl
      const user = { ...userInfo }
      user.gender = user.gender == '男' ? '0' : '1'
      store.dispatch('login/changeUserInfo', user)
    }
    const handleExit = () => {
      console.log(router)
      router.push(`/people/${userInfo.id}/index`)
    }
    return {
      isShowName,
      handleEditName,
      isShowGender,
      handleEditGender,
      isShowHeadline,
      handleEditHeadline,
      isShowLocation,
      handleEditLocation,
      isShowBusiness,
      handleEditBusiness,
      handleCancleName,
      handleCancleGender,
      handleCancleHeadline,
      handleCancleLocation,
      handleCancleBusiness,
      userInfo,
      tempValue,
      onSubmit,
      handleAvatar,
      handleBackground,
      handleExit
    }
  }
}
</script>

<style scoped>
.el-main {
  --el-main-padding: 0;
}
.el-header {
  padding: 0 !important;
}
.people-container {
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-top: 50px;
}
.people-info {
  margin-top: 10px;
  height: 410px;
  width: 1010px;
  /* background-color: red; */
}
.people-cover {
  position: relative;
  width: 100%;
  height: 240px;
}
.editPicBox {
  position: absolute;
  top: 24px;
  right: 24px;
}
.editPic {
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
  height: 862px;
  position: relative;
  /* margin: 0 20px 24px; */
  padding-bottom: 20px;
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
  /* margin-right: 20px; */
  font-size: 26px;
  font-weight: 600;
  vertical-align: middle;
}
.exit {
  cursor: pointer;
  margin-left: 420px;
  font-size: 14px;
  font-weight: 400;
  color: #8590a6;
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
  width: 764px;
  /* height: 36px; */
  padding: 30px 0;
  border-bottom: 1px solid #ebebeb;
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
.edit-profile {
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
.edit-icon {
  margin-left: 20px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  color: #175199;
}
.form-item {
  width: 420px;
}
.form-item-input {
  padding-left: 10px;
  font-size: 16px;
  width: 400px;
  height: 34px;
  outline: none;
  border: 1px rgb(235, 235, 235) solid;
  border-radius: 5px;
}
.el-input__inner {
  height: 225px !important;
  border-radius: 0 !important;
  background-color: white !important;
}
.icon {
  vertical-align: middle;
  font-size: 20px;
  padding-right: 10px;
}
</style>
