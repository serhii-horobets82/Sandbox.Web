import { RouteConfig } from 'vue-router';
import Projects from './project/Projects.vue'
import ProjectEdit from './project/Project.edit.vue'
import Positions from './position/Positions.vue'

const routes: RouteConfig[] = [{
  path: '/organization',
  name: 'organization',
  redirect: '/organization/project',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ './Index.vue'),

  children: [
    {
      path: 'project',
      name: 'projects',
      component: Projects
    },
    {
      path: 'project/:id',
      name: 'projectEdit',
      component: ProjectEdit
    },
    {
      path: 'position',
      name: 'position',
      component: Positions
    },
  ]
}]

export default routes;
