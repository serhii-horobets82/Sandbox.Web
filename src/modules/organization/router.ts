import { RouteConfig } from 'vue-router';
import Projects from './project/Projects.vue'
import ProjectEdit from './project/Project.edit.vue'
import Positions from './position/Positions.vue'
import PositionEdit from './position/Position.edit.vue'
import TeamEdit from './project/Team.edit.vue'
import PositionsGrade from './position/PositionsGrade.vue'

const routes: RouteConfig[] = [{
  path: '/organization',
  name: 'organization',
  redirect: '/organization/project',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "organization" */ './Index.vue'),

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
      path: 'positions-grade',
      name: 'positions-grade',
      component: PositionsGrade
    },

    {
      path: 'project/:projectId/position',
      name: 'project-positions',
      component: Positions
    },
    {
      path: 'project/:projectId/position/:id',
      name: 'project-positionEdit',
      component: PositionEdit
    },

    {
      path: 'team/:projectId/:id',
      name: 'teamEdit',
      component: TeamEdit
    },
  ]
}]

export default routes;
