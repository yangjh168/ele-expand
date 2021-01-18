import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index'),
    children: [
      {
        path: '/',
        redirect: '/select'
      },
      {
        path: '/select',
        name: 'select',
        component: () => import('@/example/select')
      },
      {
        path: '/range',
        name: 'range',
        component: () => import('@/example/range')
      },
      {
        path: '/form',
        name: 'form',
        component: () => import('@/example/form')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/example/search')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
