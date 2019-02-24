import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Home from './views/Home.vue'
import EvaluationRoutes from './components/evaluation/router'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(EvaluationRoutes)
})
