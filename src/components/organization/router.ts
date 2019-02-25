import { RouteConfig } from 'vue-router';
import Projects from './project/Projects.vue'
import ProjectEdit from './project/Project.edit.vue'
import Positions from './position/Positions.vue'
import PositionEdit from './position/Position.edit.vue'

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
      name: 'positions',
      component: Positions
    },
    {
      path: 'position/:id',
      name: 'positionEdit',
      component: PositionEdit
    },
  ]
}]

export default routes;
