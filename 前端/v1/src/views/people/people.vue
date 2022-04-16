<template>
  <el-container class="people-container">
    <el-header class="people-info">
      <div class="people-cover">
        <button class="editPic">
          <el-icon class="icon"><camera-filled /></el-icon>编辑封面图片
        </button>
        <img
          src="https://pic1.zhimg.com/80/v2-2711607b1fcf406f12a878f0ac9dd8a1_r.jpg?source=32738c0c"
          class="peo-pic"
        />
      </div>
      <div class="people-content">
        <div class="people-avatar">
          <img
            src="https://pic1.zhimg.com/v2-c951a81312d4457f3cfec3ce2f4ea261_xl.jpg?source=32738c0c"
            class="people-pic"
          />
          <div class="mask">
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
              <span class="head-name">Musiciandd</span>
              <span class="head-line">nihhhhhhhhhhhhhhhhh</span>
            </h1>
          </div>
          <div class="content-body">
            <div class="detail-item">
              <span class="detail-lable">居住地</span>
              <span class="detail-value">现居广东省</span>
            </div>
            <div class="detail-item">
              <span class="detail-lable">所在行业</span>
              <span class="detail-value">互联网</span>
            </div>
          </div>
          <div class="content-footer">
            <button class="edit-profile">编辑个人资料</button>
          </div>
        </div>
      </div>
    </el-header>
    <el-container class="profile-main">
      <el-aside class="main">
        <aside-header :menus="menus"></aside-header>
        <router-view></router-view>
        <!-- this is aside one -->
      </el-aside>
      <el-aside class="aside">this is aside tew</el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { CameraFilled } from '@element-plus/icons-vue'
import AsideHeader from './cpns/aside_header.vue'
export default {
  components: {
    CameraFilled,
    AsideHeader
  },
  setup() {
    const menus = [
      { index: 1, value: '动态', url: '/people/1/index' },
      { index: 2, value: '回答', url: '/people/1/answer' },
      { index: 3, value: '提问', url: '/people/1/question' },
      { index: 4, value: '文章', url: '/people/1/article' },
      { index: 5, value: '专栏', url: '/people/1/column' },
      { index: 6, value: '关注', url: '/people/1/follow' }
    ]
    return {
      menus
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
  height: 410px;
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
  height: 162px;
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
  left: 0;
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
  width: 300px;
  background-color: white;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
}
</style>
