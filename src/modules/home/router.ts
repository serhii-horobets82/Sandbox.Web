import { RouteConfig } from "vue-router";
import Home from "./Index.vue";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home" }
  },
  {
    path: "/dashboard/home",
    name: "dashboard-home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  }
];

export default routes;
