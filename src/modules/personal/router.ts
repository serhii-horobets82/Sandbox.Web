import {RouteConfig} from 'vue-router';
import Notifications from './Notifications.vue'
import Profile from './Profile.vue'
import IEvaluate from './IEvaluate.vue'
import Pdp from './Pdp.vue'

const routes: RouteConfig[] = [{
  path: '/personal',
  name: 'personal',
  // redirect: '/personal/',
  component: () => import(/* webpackChunkName: "personal" */ '@/modules/personal/Index.vue'),

  children: [
    {
      name: 'personal-notifications',
      path: 'notifications',
      component: Notifications
    },
    {
      name: 'personal-profile',
      path: 'profile',
      component: Profile
    },
    {
      name: 'personal-i-evaluate',
      path: 'i-evaluate',
      component: IEvaluate
    },
    {
      name: 'personal-pdp',
      path: 'pdp',
      component: Pdp
    },
  ]
}]

export default routes;
