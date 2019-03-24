import Vue from "vue";
import Router, {Route, RouteRecord} from "vue-router";
import store from "./store";
import AuthRoutes from "./modules/auth/router";
import UserRoutes from "./modules/user/router";
import AdminRoutes from "./modules/admin/router";
import HomeRoutes from "./modules/home/router";
import OrganizationRoutes from "./modules/organization/router";
import EvaluationRoutes from "./modules/evaluation/router";
import OkrRoutes from "./modules/okr/router";

Vue.use(Router);

const router: Router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...AuthRoutes,
    ...UserRoutes,
    ...AdminRoutes,
    ...HomeRoutes,
    ...OrganizationRoutes,
    ...EvaluationRoutes,
    ...OkrRoutes
  ]
});

router.beforeEach((to: Route, from: Route, next: any) => {
  if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in if not, redirect to login page.
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    const userIsAdmin = store.getters["user/userIsAdmin"];
    const userIsManager = store.getters["user/userIsManager"];
    const userIsHR = store.getters["user/userIsHR"];

    if (!isAuthenticated) {
      next({path: "/auth", query: {redirect: to.fullPath}});
    } else {
      if (to.matched.some((record: RouteRecord) => record.meta.requiresAdminRole) && !userIsAdmin) {
        next({path: "/403", query: {redirect: "/403"}});
      } else next();
    }
  } else {
    next();
  }
});

export default router;
