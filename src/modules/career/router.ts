import { RouteConfig } from "vue-router";
import CareerCubes from "./components/CarrerCubes.vue";

const routes: RouteConfig[] = [
  {
    path: "/career",
    name: "career",
    component: () => import(/* webpackChunkName: "salary" */ "./Index.vue"),
    redirect: "/career/cubes",
    children: [
      {
        path: "cubes",
        name: "cubes",
        component: CareerCubes
      }
    ]
  }
];

export default routes;
