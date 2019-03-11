import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [{
  path: '/profile',
  name: 'profile',
  component: () => import(/* webpackChunkName: "user" */ '@/modules/user/Index.vue'),
  meta: {requiresAuth: true}
}]

export default routes;
