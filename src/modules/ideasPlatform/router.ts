import { RouteConfig } from "vue-router";
import Index from "./Index.vue";

const routes: RouteConfig[] = [
  {
    path: "/ideas-platform",
    name: "ideas-platform",
    // redirect: '/personal/',
    component: () => import(/* webpackChunkName: "ideasPlatform" */ "@/modules/ideasPlatform/Index.vue"),

    children: [
      {
        name: "index",
        path: "",
        component: Index
      }
    ]
  }
];

export default routes;
