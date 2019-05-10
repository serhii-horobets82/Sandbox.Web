import { RouteConfig } from 'vue-router';
import Employees from './employee/Employees.vue'
import EmployeeEdit from './employee/Employee.edit.vue'
import _360Questionarie from './360/Questionarie.edit.vue'
import Positions from './position/Positions.vue'
import PositionEdit from './position/Position.edit.vue'

const routes: RouteConfig[] = [{
  path: '/administration',
  name: 'administration',
  redirect: '/administration/employees',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "administration" */ './Index.vue'),

  children: [
    {
      path: 'employees',
      name: 'administration-employees',
      component: Employees
    },
    {
      path: 'employee/:id',
      name: 'administration-employeeEdit',
      component: EmployeeEdit
    },
    {
      path: '360-questionarie',
      name: 'administration-360Questionarie',
      component: _360Questionarie
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