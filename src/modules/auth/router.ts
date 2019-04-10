import { RouteConfig } from "vue-router";
import Logout from "./Logout.vue";

const routes: RouteConfig[] = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      public: true,
    },
    component: () => import(/* webpackChunkName: "auth" */ "@/modules/auth/Index.vue")
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  }
];

export default routes;
