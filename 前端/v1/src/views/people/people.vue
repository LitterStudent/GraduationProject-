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
          <div class="content-head">Musiciandd nihhhhhhhhhhhhhhhhh</div>
          <div class="content-body"></div>
          <div class="content-footer"></div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside>this is aside one </el-aside>
      <el-aside>this is aside tew</el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { CameraFilled } from '@element-plus/icons-vue'
export default {
  components: {
    CameraFilled
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
  width: 1000px;
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
  width: 100%;
  height: 162px;
  position: relative;
  margin: 0 20px 24px;
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
  width: 764px;
  height: 146px;
  border: 1px solid red;
}
</style>
