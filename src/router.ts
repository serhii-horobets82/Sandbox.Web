import Vue from "vue";
import Router, { Route, RouteRecord, RouteConfig, RouterOptions } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import store from "./store";
import { getPageTitle } from "@/util/index";
import AuthRoutes from "./modules/auth/router";
import UserRoutes from "./modules/user/router";
import AdminRoutes from "./modules/admin/router";
import HomeRoutes from "./modules/home/router";
import OrganizationRoutes from "./modules/organization/router";
import EvaluationRoutes from "./modules/evaluation/router";
import OkrRoutes from "./modules/okr/router";
import PersonalRoutes from "./modules/personal/router";
import AdministrationRoutes from "./modules/administration/router";
import ChatRoutes from "./modules/chat/router";
import IdeasPlatform from "./modules/ideasPlatform/router";
import SalaryRoutes from "./modules/salary/router";
import EducationRoutes from "./modules/education/router";
import SystemRoutes from "./modules/system/router";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

Vue.use(Router);

const ConstantRoutes: RouteConfig[] = [
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      title: "Not found",
      public: false
    }
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      title: "Access denied",
      public: false
    }
  }
];

const errorRoute: RouteConfig = { path: "*", redirect: "/404" };

const router: Router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => <any>{ y: 0 },
  routes: [
    ...ConstantRoutes,
    ...AuthRoutes,
    ...UserRoutes,
    ...AdminRoutes,
    ...HomeRoutes,
    ...PersonalRoutes,
    ...OrganizationRoutes,
    ...AdministrationRoutes,
    ...EvaluationRoutes,
    ...OkrRoutes,
    ...ChatRoutes,
    ...IdeasPlatform,
    ...SalaryRoutes,
    ...EducationRoutes,
    ...SystemRoutes,
    errorRoute
  ]
});

router.beforeEach((to: Route, from: Route, next: any) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (isAuthenticated) {
    const {
      profile,
      isLoading,
    } = store.getters["user/state"];

    // check profile existance (case with manual page refresh)
    if (!profile && !isLoading) {
      store.dispatch("user/userRequest").then(() => {
        next(to);
      });
      return;
    }

    const role = profile.roles != null && profile.roles.length ? profile.roles[0] : '';
    const userIsAdmin = role === 'Admin';
    const userIsSysAdmin = role === 'SysAdmin';

    // override default route
    if (to.path === "/") {
      if (userIsSysAdmin) next({ path: "/system" });
      else if (userIsAdmin) next({ path: "/admin" });
      else next({ path: "/personal/profile" });
      NProgress.done();
    }

    const requiresAdminRole = to.matched.some(
      (record: RouteRecord) => record.meta.requiresAdminRole
    );
    const requiresSysAdminRole = to.matched.some(
      (record: RouteRecord) => record.meta.requiresSysAdminRole
    );
    if (requiresAdminRole && !userIsAdmin) {
      next({ path: "/403", query: { redirect: "/403" } });
    } else if (requiresSysAdminRole && !userIsSysAdmin) {
      next({ path: "/403", query: { redirect: "/403" } });
    } else next();
  } else {
    // skip auth to prevent loop
    if (to.path === "/auth") next();
    else if (to.path != null && to.path.startsWith('/register')) { next(); }
    else {
      next({ path: "/auth", query: { redirect: to.fullPath } });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
