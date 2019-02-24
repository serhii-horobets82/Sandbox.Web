import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [{
  path: '/evaluation',
  name: 'evaluation',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ './Index.vue')
}]

export default routes;
