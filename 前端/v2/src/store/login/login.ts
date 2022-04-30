import { Module } from 'vuex'

import { ILoginState } from './type'
import { IRootState } from '../type'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import {
  accountLoginRequest,
  userInfoRequest,
  userMenusByRoleIdRequest
} from '@/service/login/login'
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 1.注册动态路由
      const mapRoute = mapMenusToRoutes(userMenus)
      mapRoute.forEach((route) => {
        router.addRoute('main', route)
      })
      // 2.获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 1.登录获取 token,id,保存 token
      const loginResult: any = await accountLoginRequest(payload)
      const { id, token } = loginResult
      commit('changeToken', token)
      console.log(id)
      localCache.setCache('token', token)
      // 发送初始化请求 （role,department）
      console.log('11')
      dispatch('getInitialDataAction', null, { root: true })
      // 2. 获取用户信息
      const userInfoResult = await userInfoRequest()
      const userInfo = userInfoResult
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3.请求用户菜单
      // const userMenusResult = await userMenusByRoleIdRequest(userInfo.role.id)
      // const userMenus = userMenusResult.data
      // userMenus.forEach((item: any) => {
      //   if (item.name === '随便聊聊') {
      //     item.name = '其他组件'
      //     item.children[0].name = '富文本'
      //     item.children.pop()
      //   }
      // })
      const menus = [
        {
          id: 38,
          name: '系统总览',
          type: 1,
          url: '/main/analysis',
          icon: 'el-icon-monitor',
          sort: 1,
          children: [
            {
              id: 39,
              url: '/main/analysis/overview',
              name: '核心技术',
              sort: 106,
              type: 2,
              children: null,
              parentId: 38
            },
            {
              id: 40,
              url: '/main/analysis/dashboard',
              name: '商品统计',
              sort: 107,
              type: 2,
              children: null,
              parentId: 38
            }
          ]
        },
        {
          id: 1,
          name: '社区管理',
          type: 1,
          url: '/main/system',
          icon: 'el-icon-setting',
          sort: 2,
          children: [
            {
              id: 2,
              url: '/main/system/user',
              name: '用户管理',
              sort: 100,
              type: 2,
              children: [
                {
                  id: 5,
                  url: null,
                  name: '创建用户',
                  sort: null,
                  type: 3,
                  parentId: 2,
                  permission: 'system:users:create'
                },
                {
                  id: 6,
                  url: null,
                  name: '删除用户',
                  sort: null,
                  type: 3,
                  parentId: 2,
                  permission: 'system:users:delete'
                },
                {
                  id: 7,
                  url: null,
                  name: '修改用户',
                  sort: null,
                  type: 3,
                  parentId: 2,
                  permission: 'system:users:update'
                },
                {
                  id: 8,
                  url: null,
                  name: '查询用户',
                  sort: null,
                  type: 3,
                  parentId: 2,
                  permission: 'system:users:query'
                }
              ],
              parentId: 1
            },
            {
              id: 3,
              url: '/main/system/department',
              name: '话题管理',
              sort: 101,
              type: 2,
              children: [
                {
                  id: 17,
                  url: null,
                  name: '创建部门',
                  sort: null,
                  type: 3,
                  parentId: 3,
                  permission: 'system:department:create'
                },
                {
                  id: 18,
                  url: null,
                  name: '删除部门',
                  sort: null,
                  type: 3,
                  parentId: 3,
                  permission: 'system:department:delete'
                },
                {
                  id: 19,
                  url: null,
                  name: '修改部门',
                  sort: null,
                  type: 3,
                  parentId: 3,
                  permission: 'system:department:update'
                },
                {
                  id: 20,
                  url: null,
                  name: '查询部门',
                  sort: null,
                  type: 3,
                  parentId: 3,
                  permission: 'system:department:query'
                }
              ],
              parentId: 1
            },
            {
              id: 4,
              url: '/main/system/menu',
              name: '问题管理',
              sort: 103,
              type: 2,
              children: [
                {
                  id: 21,
                  url: null,
                  name: '创建菜单',
                  sort: null,
                  type: 3,
                  parentId: 4,
                  permission: 'system:menu:create'
                },
                {
                  id: 22,
                  url: null,
                  name: '删除菜单',
                  sort: null,
                  type: 3,
                  parentId: 4,
                  permission: 'system:menu:delete'
                },
                {
                  id: 23,
                  url: null,
                  name: '修改菜单',
                  sort: null,
                  type: 3,
                  parentId: 4,
                  permission: 'system:menu:update'
                },
                {
                  id: 24,
                  url: null,
                  name: '查询菜单',
                  sort: null,
                  type: 3,
                  parentId: 4,
                  permission: 'system:menu:query'
                }
              ],
              parentId: 1
            },
            {
              id: 25,
              url: '/main/system/role',
              name: '回答管理',
              sort: 102,
              type: 2,
              children: [
                {
                  id: 26,
                  url: null,
                  name: '创建角色',
                  sort: null,
                  type: 3,
                  parentId: 25,
                  permission: 'system:role:create'
                },
                {
                  id: 27,
                  url: null,
                  name: '删除角色',
                  sort: null,
                  type: 3,
                  parentId: 25,
                  permission: 'system:role:delete'
                },
                {
                  id: 28,
                  url: null,
                  name: '修改角色',
                  sort: null,
                  type: 3,
                  parentId: 25,
                  permission: 'system:role:update'
                },
                {
                  id: 29,
                  url: null,
                  name: '查询角色',
                  sort: null,
                  type: 3,
                  parentId: 25,
                  permission: 'system:role:query'
                }
              ],
              parentId: 1
            }
          ]
        },
        {
          id: 9,
          name: '商品中心',
          type: 1,
          url: '/main/product',
          icon: 'el-icon-goods',
          sort: 3,
          children: [
            {
              id: 15,
              url: '/main/product/category',
              name: '商品类别',
              sort: 104,
              type: 2,
              children: [
                {
                  id: 30,
                  url: null,
                  name: '创建类别',
                  sort: null,
                  type: 3,
                  parentId: 15,
                  permission: 'system:category:create'
                },
                {
                  id: 31,
                  url: null,
                  name: '删除类别',
                  sort: null,
                  type: 3,
                  parentId: 15,
                  permission: 'system:category:delete'
                },
                {
                  id: 32,
                  url: null,
                  name: '修改类别',
                  sort: null,
                  type: 3,
                  parentId: 15,
                  permission: 'system:category:update'
                },
                {
                  id: 33,
                  url: null,
                  name: '查询类别',
                  sort: null,
                  type: 3,
                  parentId: 15,
                  permission: 'system:category:query'
                }
              ],
              parentId: 9
            },
            {
              id: 16,
              url: '/main/product/goods',
              name: '商品信息',
              sort: 105,
              type: 2,
              children: [
                {
                  id: 34,
                  url: null,
                  name: '创建商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:create'
                },
                {
                  id: 35,
                  url: null,
                  name: '删除商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:delete'
                },
                {
                  id: 36,
                  url: null,
                  name: '修改商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:update'
                },
                {
                  id: 37,
                  url: null,
                  name: '查询商品',
                  sort: null,
                  type: 3,
                  parentId: 16,
                  permission: 'system:goods:query'
                }
              ],
              parentId: 9
            }
          ]
        },
        {
          id: 41,
          name: '其他组件',
          type: 1,
          url: '/main/story',
          icon: 'el-icon-chat-line-round',
          sort: 4,
          children: [
            {
              id: 42,
              url: '/main/story/chat',
              name: '富文本',
              sort: 108,
              type: 2,
              children: null,
              parentId: 41
            }
          ]
        }
      ]
      commit('changeUserMenus', menus)
      localCache.setCache('userMenus', menus)
      // 4.跳转首页
      router.push('/main')
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
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('phoneLogin Action 预留代码未编写', payload, commit)
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
