import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "user" */ "@/modules/user/views/Index.vue"),
    meta: { title: "Profile" }
  }
];

export default routes;
