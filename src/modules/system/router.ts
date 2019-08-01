import { RouteConfig } from "vue-router";
import Setup from "./components/Setup.vue";

const routes: RouteConfig[] = [
  {
    path: "/system",
    name: "system",
    component: () => import(/* webpackChunkName: "system" */ "./Index.vue"),
    redirect: "/system/setup",
    meta: { requiresSysAdminRole: true },
    children: [
      {
        path: "setup",
        name: "setup",
        component: Setup,
        meta: { requiresSysAdminRole: true }
      }
    ]
  }
];

export default routes;
