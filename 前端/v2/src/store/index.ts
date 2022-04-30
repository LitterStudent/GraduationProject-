import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/analysis'
import type { IRootState } from './type'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'dongdong',
      age: 12,
      entireDepartment: [],
      entireRole: [],
      entireMenus: []
    }
  },
  getters: {},
  mutations: {
    changeEntiresDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntiresRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenus(state, list) {
      state.entireMenus = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // const departmentResult = await getPageListData('/department/list', {
      //   offset: 0,
      //   size: 1000
      // })
      // const { list: departmentList } = departmentResult.data
      // console.log(departmentResult)
      // const roleResult = await getPageListData('/role/list', {
      //   offset: 0,
      //   size: 1000
      // })
      // const { list: roleList } = roleResult.data
      // const MenusResult = await getPageListData('/menu/list', {})
      // const { list: menuList } = MenusResult.data
      // // console.log(menuList)
      // commit('changeEntiresDepartment', departmentList)
      // commit('changeEntiresRole', roleList)
      // commit('changeEntireMenus', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('login/setuplogin')
  // store.dispatch('getInitalDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
