import { RouteConfig } from "vue-router";
import EducationCubes from "./components/EducationCubes.vue";

const routes: RouteConfig[] = [
  {
    path: "/education",
    name: "education",
    component: () => import(/* webpackChunkName: "education" */ "./Index.vue"),
    redirect: "/education/cubes",
    children: [
      {
        path: "cubes",
        name: "cubes",
        component: EducationCubes
      }
    ]
  }
];

export default routes;
