<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="phone">
      <el-form-item label="号码:" prop="name">
        <el-input v-model="phone.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="password">
        <div class="phone-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="getCode">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account.config'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      phoneNum: '',
      code: ''
    })
    const phoneLoginAction = () => {
      store.dispatch('login/phoneLoginAction', { ...phone })
    }
    return {
      phone,
      rules,
      phoneLoginAction
    }
  }
})
</script>

<style scoped>
.phone-code {
  display: flex;
  justify-content: space-around;
}
.getCode {
  margin-left: 8px;
}
</style>
