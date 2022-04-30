<template>
  <div class="login-panel">
    <el-icon><add-location /></el-icon>
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="tabsName">
      <el-tab-pane name="account">
        <template #label>
          <el-icon><avatar /></el-icon>账号登录
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <!-- <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><calendar /></el-icon>手机登录
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane> -->
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="keepPassword">
        <span>记住密码</span>
      </el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoading">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-accout.vue'
// import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    let keepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    // const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    let tabsName = ref('account')
    const handleLoading = () => {
      if (tabsName.value === 'account') {
        accountRef.value?.loginAction(keepPassword.value)
      } else {
        // phoneRef.value?.phoneLoginAction()
      }
    }

    return { keepPassword, handleLoading, accountRef, tabsName }
  }
})
</script>

<style lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 250px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 5px;
  }
}
</style>
