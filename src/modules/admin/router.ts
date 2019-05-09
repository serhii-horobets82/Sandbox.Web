import { RouteConfig } from "vue-router";
import Users from "./Users.vue";
import ActivityLogs from "./ActivityLogs.vue";
import AddUser from "./AddUser.vue";

const routes: RouteConfig[] = [
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/users",
    component: () => import(/* webpackChunkName: "okr" */ "@/modules/admin/Index.vue"),

    meta: { requiresAdminRole: true },

    children: [
      {
        path: "users",
        name: "users",
        component: Users,
        meta: { requiresAdminRole: true }
      },
      {
        path: "activitylogs",
        name: "activitylogs",
        component: ActivityLogs,
        meta: { requiresAdminRole: true }
      },
      {
        path: "addUser",
        name: "addUser",
        component: AddUser,
        meta: { requiresAdminRole: true }
      }
    ]
  }
];

export default routes;
