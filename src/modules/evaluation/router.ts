import {RouteConfig} from 'vue-router';
import EvaluationSchedule from './EvaluationSchedule.vue'
import EmployeesEvaluation from './personal/EmployeesEvaluation.vue'
import EvaluationForm from './ecf/EcfEvaluationForm.vue'
import _360TeamView from './360TeamView.vue'
import _360Analytics from './analytics/360Analytics.vue'

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
    {
      name: '360-team-view',
      path: '360-team-view',
      component: _360TeamView
    },

    {
      name: '360-analytics',
      path: '360-analytics',
      component: _360Analytics
    },
  ]
}]

export default routes;
