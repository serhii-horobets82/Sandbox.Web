import { RouteConfig } from "vue-router";
import Index from "./Index.vue";
import List from "./Idea.list.vue";
import Edit from "./Idea.edit.vue";
import View from "./Idea.view.vue";

const routes: RouteConfig[] = [
  {
    path: "/ideas-platform",
    name: "ideas-platform",
    redirect: '/ideas-platform/dashboard',
    component: () => import(/* webpackChunkName: "ideasPlatform" */ "@/modules/ideasPlatform/Index.vue"),

    children: [
      {
        path: "",
        name: "ideas-platform-list",
        component: List,
      },
      {
        path: "edit/:id",
        name: "ideas-platform-edit",
        component: Edit
      },
      {
        path: ":id",
        name: "ideas-platform-view",
        component: View
      }
    ]
  }
];

export default routes;
