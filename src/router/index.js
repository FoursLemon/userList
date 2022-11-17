import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import UserList from '@/components/UserList'
import UserDetail from '@/components/UserDetail'

Vue.use(VueRouter)

// 声明路由规则
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'users'
  },
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  {
    path: '/users/:id',
    name: 'userDetail',
    component: UserDetail,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
