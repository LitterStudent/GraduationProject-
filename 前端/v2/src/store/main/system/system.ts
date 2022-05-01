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
      answerCount: 0,
      answerList: [],
      articleCount: 0,
      articleList: [],
      columnCount: 0,
      columnList: [],
      goodsCount: 0,
      goodsList: [],
      questionCount: 0,
      questionList: [],
      topicList: [],
      topicCount: 0,
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
    changeAnswerList(state, answerList: any[]) {
      state.answerList = answerList
    },
    changeAnswerCount(state, answerCount: number) {
      state.answerCount = answerCount
    },
    changeColumnList(state, columnList: any[]) {
      state.columnList = columnList
    },
    changeColumnCount(state, columnCount: number) {
      state.columnCount = columnCount
    },
    changeArticleList(state, articleList: any[]) {
      state.articleList = articleList
    },
    changeArticleCount(state, articleCount: number) {
      state.articleCount = articleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, answerCount: number) {
      state.goodsCount = answerCount
    },
    changeQuestionList(state, questionList: any[]) {
      state.questionList = questionList
    },
    changeQuestionCount(state, questionCount: number) {
      state.questionCount = questionCount
    },
    changeTopicList(state, topicList: any[]) {
      state.topicList = topicList
    },
    changeTopicCount(state, topicCount: number) {
      state.topicCount = topicCount
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
      console.log(`change${pageNameUp}List`)
      console.log(pageResult)
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
      const { url, editData, id, pageName, url3 } = payload
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
        url: url3
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
