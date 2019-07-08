import { RouteConfig } from "vue-router";
import SalaryReview from "./components/SalaryReview.vue";

const routes: RouteConfig[] = [
  {
    path: "/salary",
    name: "salary",
    component: () => import(/* webpackChunkName: "salary" */ "./Index.vue"),
    redirect: "/salary/review",
    children: [
      {
        path: "review",
        name: "review",
        component: SalaryReview
      }
    ]
  }
];

export default routes;
