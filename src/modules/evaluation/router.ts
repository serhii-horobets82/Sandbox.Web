import {RouteConfig} from 'vue-router';
import EmployeePersonal from './personal/EmployeePersonal.vue'
import EmployeesEvaluation from './personal/EmployeesEvaluation.vue'
import EcfEvaluationForm from './ecf/EcfEvaluationForm.vue'

const routes: RouteConfig[] = [{
  path: '/evaluation',
  name: 'evaluation',
  redirect: '/evaluation/employees-evaluation',
  component: () => import(/* webpackChunkName: "evaluation" */ '@/modules/evaluation/Index.vue'),

  children: [
    {
      name: 'personalPage',
      path: 'personal/:id',
      component: EmployeePersonal
    },
    {
      name: 'employeesEvaluation',
      path: 'employees-evaluation',
      component: EmployeesEvaluation
    },
    {
      name: 'ecfEvaluationForm',
      path: 'ecf-evaluation-form/:id',
      component: EcfEvaluationForm
    },
  ]
}]

export default routes;
