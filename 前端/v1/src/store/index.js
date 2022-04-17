import { createStore } from 'vuex'
import login from './login/login'
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { login }
})
export default store

export function setuStore() {
  store.dispatch('login/loadLocalLogin')
}
