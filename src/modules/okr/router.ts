import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [{
  path: '/okr',
  name: 'okr',
  component: () => import(/* webpackChunkName: "okr" */ '@/modules/okr/Index.vue')
}]

export default routes;
