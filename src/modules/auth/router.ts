import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [{
  path: '/auth',
  name: 'auth',
  component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/Index.vue')
}]

export default routes;
