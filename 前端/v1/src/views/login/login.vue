<template>
  <div class="login">
    <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
      <span>用户名或者密码错误</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="login-box">
      <h2 style="padding-left: 120px; font-size: 18px; font-weight: 600">
        用户登录
      </h2>
      <el-form :model="form" style="margin-top: 40px">
        <el-form-item>
          <el-input placeholder="邮箱/用户名" v-model="form.name" />
        </el-form-item>
        <el-form-item prop="passwrod">
          <el-input
            placeholder="密码"
            v-model="form.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" style="width: 40%">注册</el-button>

          <el-button
            type="primary"
            @click="onSubmit"
            style="margin-left: 50px; width: 40%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const invalidate = (name) => {
      if (name == '13433638802') {
        return '123456789@qq.com'
      } else if (name == '13433638803') {
        return '123456@qq.com'
      } else if (name == '13433638804') {
        return '123456a@qq.com'
      } else if (name == '13433638805') {
        return '123456b@qq.com'
      } else if (name == '13433638806') {
        return '123456c@qq.com'
      } else if (name == '13533630001') {
        return '123456d@qq.com'
      } else if (name == '13433630002') {
        return '123456e@qq.com'
      } else if (name == '13433630003') {
        return '123456f@qq.com'
      } else if (name == '13433630004') {
        return '123456g@qq.com'
      } else if (name == '13433630005') {
        return '123456h@qq.com'
      } else if (name == '13433630006') {
        return '123456i@qq.com'
      } else if (name == '13433630007') {
        return ''
      }
    }
    const form = reactive({
      name: '',
      password: ''
    })
    const store = useStore()
    const centerDialogVisible = ref(false)
    const onSubmit = () => {
      console.log(form.name, form.password)
      const name = invalidate(form.name)
      store
        .dispatch('login/userLoginAction', {
          email: name,
          password: form.password
        })
        .catch((e) => {
          console.log(e)
          centerDialogVisible.value = true
        })
    }
    return { onSubmit, form, centerDialogVisible }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 888px;
  background-image: url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png);
  position: relative;
}
.login-box {
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  width: 350px;
  height: 250px;
}
</style>
