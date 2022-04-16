import localCache from '@/utils/cache'
import { userLoginRequest, userInfoRequest } from '@/service/login/login.js'
import router from '@/router'
const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async userLoginAction({ commit }, payload) {
      // 1.登录获取 token,id,保存 token
      const loginResult = await userLoginRequest(payload)
      const { id, token } = loginResult
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 2. 获取用户信息
      const userInfoResult = await userInfoRequest(id)
      const userInfo = userInfoResult
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      console.log(router)
      // 4.跳转首页
      router.push('/')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        console.log('object')
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
    },
    setuplogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
