import { RouteConfig } from "vue-router";
import Logout from "./Logout.vue";
import Register from './Register.vue';

const routes: RouteConfig[] = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      title: "Login",
      public: true
    },
    component: () => import(/* webpackChunkName: "auth" */ "@/modules/auth/Index.vue")
  },
  {
    path: "/register*",
    name: "register",
    meta: {
      title: "Register",
      public: true
    },
    component: Register
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  }
];

export default routes;
