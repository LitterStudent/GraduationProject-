import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index/index.vue'

const routes = [
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
        path: '/follow',
        component: () => import('@/views/index/follow/follow.vue')
      },
      {
        path: '/hot',
        component: () => import('@/views/index/hot/hot.vue')
      }
    ]
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

export default router
