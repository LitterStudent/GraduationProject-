import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index/index.vue'
import localCache from '@/utils/cache'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/',
        component: () => import('@/views/index/recommend/recommend.vue')
      },
      {
        path: 'follow',
        component: () => import('@/views/index/follow/follow.vue')
      },
      {
        path: 'hot',
        component: () => import('@/views/index/hot/hot.vue')
      }
    ]
  },
  {
    path: '/column',
    name: 'Column',
    component: () => import('@/views/column/column.vue')
  },
  {
    path: '/column/:id',
    name: 'ColumItem',
    component: () => import('@/views/columnItem/columnItem.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('@/views/article/article.vue')
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: () => import('../views/question/question.vue')
  },
  {
    path: '/question/:id/answer/:id2',
    name: 'AnswerOne',
    component: () => import('../views/question/questionOne.vue')
  },
  {
    path: '/people/:id',
    name: 'People',
    component: () => import('../views/people/people.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/people/views/index.vue')
      },
      {
        path: 'answer',
        component: () => import('../views/people/views/answer.vue')
      },
      {
        path: 'question',
        component: () => import('../views/people/views/question.vue')
      },
      {
        path: 'article',
        component: () => import('../views/people/views/article.vue')
      },
      {
        path: 'column',
        component: () => import('../views/people/views/column.vue')
      },
      {
        path: 'follow',
        component: () => import('../views/people/views/follow.vue')
      },
      {
        path: 'follower',
        component: () => import('../views/people/views/follower.vue')
      },
      {
        path: 'followquestion',
        component: () => import('../views/people/views/followquestion.vue')
      },
      {
        path: 'followcolumn',
        component: () => import('../views/people/views/followcolumn.vue')
      },
      {
        path: 'followtopic',
        component: () => import('../views/people/views/followtopic.vue')
      }
    ]
  },
  {
    path: '/editProfile',
    component: () => import('../views/people/views/edit.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/editor/editor.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
