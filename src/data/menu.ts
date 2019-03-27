import {NavigationGroup, NavigationItem} from "@/models/navigation.interface";

const Menu: Array<NavigationItem> = [
  {header: "Main"},
  {
    title: "Home",
    icon: "home",
    router: "/"
  },
  {
    title: "Personal",
    icon: "home",
    router: "/personal"
  },
  {
    title: "Organization",
    icon: "supervisor_account",
    router: "/organization"
  },
  {
    title: "HR",
    icon: "ballot",
    router: "/evaluation"
  },
  {
    title: "Administration",
    icon: "accessible_forward",
    router: "/administration"
  },
  {
    title: "OKR",
    icon: "timeline",
    router: "/okr"
  },
  {
    title: "About",
    icon: "info",
    router: "/about"
  },
  {header: "Personal"},
  {
    title: "Account",
    icon: "person",
    router: "/profile",
    authRequired: true,
    group: NavigationGroup.Personal,
    autoHide: true
  },
  {
    title: "Sign in",
    icon: "lock",
    router: "/auth",
    unauthRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Administrator",
    icon: "build",
    router: "/admin",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Sign out",
    icon: "exit_to_app",
    router: "/logout",
    authRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  }
];


export default Menu;
