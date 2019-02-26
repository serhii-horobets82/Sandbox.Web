import Vue from 'vue'
import Router from 'vue-router'
import AuthRoutes from './modules/auth/router'
import HomeRoutes from './modules/home/router'
import OrganizationRoutes from './modules/organization/router'
import EvaluationRoutes from './modules/evaluation/router'
import OkrRoutes from './modules/okr/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...AuthRoutes, ...HomeRoutes, ...OrganizationRoutes, ...EvaluationRoutes, ...OkrRoutes]
})
