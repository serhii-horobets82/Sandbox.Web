import {RouteConfig} from "vue-router";
import Users from "./Users.vue";
import ActivityLogs from "./ActivityLogs.vue";
import AddUser from "./AddUser.vue";

const routes: RouteConfig[] = [
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/users",
    component: () => import(/* webpackChunkName: "okr" */ "@/modules/admin/Index.vue"),

    meta: {requiresAuth: true, requiresAdminRole: true},

    children: [
      {
        path: "users",
        name: "users",
        component: Users,
        meta: {requiresAuth: true, requiresAdminRole: true}
      },
      {
        path: "activitylogs",
        name: "activitylogs",
        component: ActivityLogs,
        meta: {requiresAuth: true, requiresAdminRole: true}
      },
      {
        path: "addUser",
        name: "activitylogs",
        component: AddUser,
        meta: {requiresAuth: true, requiresAdminRole: true}
      }
    ]
  }
];

export default routes;
