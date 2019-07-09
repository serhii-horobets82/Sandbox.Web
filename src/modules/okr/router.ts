import { RouteConfig } from "vue-router";
import OkrChart from "./components/OkrChart.vue";
import OkrList from "./components/OkrList.vue";

const routes: RouteConfig[] = [
  {
    path: "/okr",
    name: "okr",
    component: () => import(/* webpackChunkName: "okr" */ "@/modules/okr/Index.vue"),
    meta: { title: "OKR" },
    children: [
      {
        path: "chart",
        name: "chart",
        component: OkrChart,
        meta: {
          public: false
        }
      },
      {
        path: "list",
        name: "list",
        component: OkrList,
        meta: {
          public: false
        }
      }
    ]
  }
];

export default routes;
