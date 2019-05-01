import {RouteConfig} from 'vue-router';
import EvaluationSchedule from './EvaluationSchedule.vue'
import EmployeesEvaluation from './personal/EmployeesEvaluation.vue'
import EvaluationForm from './ecf/EcfEvaluationForm.vue'

const routes: RouteConfig[] = [{
  path: '/evaluation',
  name: 'evaluation',
  redirect: '/evaluation/employees-evaluation',
  component: () => import(/* webpackChunkName: "evaluation" */ '@/modules/evaluation/Index.vue'),

  children: [
    {
      name: 'employeesEvaluation',
      path: 'employees-evaluation',
      component: EmployeesEvaluation
    },
    {
      name: 'ecfEvaluationForm',
      path: 'evaluation-form/:id',
      component: EvaluationForm
    },
    {
      name: 'evaluation-schedule',
      path: 'schedule',
      component: EvaluationSchedule
    },
  ]
}]

export default routes;
