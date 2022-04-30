import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '@/store/type'
import {
  undeletePageData,
  deletePageData,
  getPageListData,
  editPageData,
  createPageData
} from '@/service/main/system/system'
const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersCount: 0,
      usersList: [],
      roleCount: 0,
      roleList: [],
      goodsCount: 0,
      goodsList: [],
      menuCount: 0,
      menuList: [],
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, roleCount: number) {
      state.goodsCount = roleCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const { pageName, queryInfo, url } = payload
      const { offset: page, size: perpage, ...info } = queryInfo
      const keys = Object.keys(info)
      let str = ``
      if (keys.length > 0) {
        keys.forEach((item) => {
          str += `&${item}=${info[item]}`
        })
      }
      const pageUrl = url
        ? `${url}?page=${page + 1}&per_page=${perpage}` + str
        : `/${pageName}/list`
      const pageResult: any = await getPageListData(pageUrl, queryInfo)
      const { data, meta } = pageResult
      const pageNameUp = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${pageNameUp}List`, data)
      commit(`change${pageNameUp}Count`, meta.total)
    },
    async deletePageDataAction({ commit }, payload: any) {
      console.log(commit)
      const { pageName, id, url } = payload
      const pageUrl = url ? `${url}/${id}` : `/${pageName}/${id}`
      await deletePageData(pageUrl)
    },
    async undeletePageDataAction({ commit }, payload: any) {
      console.log(commit)
      const { pageName, id, url } = payload
      const pageUrl = url ? `${url}/${id}` : `/${pageName}/${id}`
      await undeletePageData(pageUrl)
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { url, editData, id, pageName } = payload
      const pageUrl = url + `/${id}`
      console.log(editData)
      const res = await editPageData(pageUrl, editData['_rawValue'])
      console.log(res)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        },
        url
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, createData, url3, url } = payload
      const pageUrl = url
      console.log({
        ...createData['_value'],
        password: '123456'
      })
      await createPageData(pageUrl, {
        ...createData['_value'],
        password: '123456'
      })
      dispatch('getPageListAction', {
        pageName,
        url: url3,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default system
