import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [{
  path: '/evaluation',
  name: 'evaluation',
  component: () => import(/* webpackChunkName: "evaluation" */ '@/modules/evaluation/Index.vue')
}]

export default routes;
