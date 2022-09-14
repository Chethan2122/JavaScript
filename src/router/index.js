import apiIntegration from '@/components/apiIntegration.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import addressEmp from '@/components/addressEmp'
import searchElement from '@/components/searchElement.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'searchElement',
    component: searchElement
  },
  {
    path: '/apiIntegration',
    name: 'apiIntegration',
    component: apiIntegration

  },
  {
    path: '/addressEmp',
    name: 'addressEmp',
    component: addressEmp

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
