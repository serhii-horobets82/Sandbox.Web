import { NavigationGroup, NavigationItem } from "@/models/navigation.interface";

const Menu: Array<NavigationItem> = [
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
  {
    title: "Configuration",
    icon: "build",
    router: "/admin",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Employees",
    icon: "receipt",
    router: "/administration/employees",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Projects",
    icon: "receipt",
    router: "/administration/project",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "360 Questionarie",
    icon: "receipt",
    router: "/administration/360-questionarie",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Positions Grade",
    icon: "receipt",
    router: "/administration/positions-grade",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Company Strategy",
    icon: "receipt",
    router: "/administration/company-strategy",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "360 Schedule",
    icon: "receipt",
    router: "/administration/360-schedule-setup",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Organization Structure",
    icon: "receipt",
    router: "/administration/organization-structure",
    authRequired: true,
    adminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "System settings",
    icon: "settings_applications",
    router: "/system",
    authRequired: true,
    sysAdminRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },

  {
    title: "Projects",
    icon: "receipt",
    router: "/organization/project",
    authRequired: true,
    managerRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "360 Team Review",
    icon: "insert_chart_outlined",
    router: "/evaluation/360-team-view",
    authRequired: true,
    managerRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "360 Analytics",
    icon: "insert_chart_outlined",
    router: "/evaluation/360-analytics",
    authRequired: true,
    managerRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Salary Review Plan",
    icon: "local_atm",
    router: "/salary",
    authRequired: true,
    managerRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "Education Cubes",
    icon: "fa-cube",
    router: "/education",
    authRequired: true,
    managerRoleRequired: true,
    hrRoleRequired: true,
    autoHide: true,
    group: NavigationGroup.Personal
  },
  {
    title: "My profile",
    icon: "person",
    router: "/personal/profile",
    group: NavigationGroup.Main
  },
  {
    title: "360",
    icon: "local_play",
    router: "/personal/i-evaluate",
    group: NavigationGroup.Main
  },
  { title: "PDP", icon: "book", router: "/personal/pdp", group: NavigationGroup.Main },
  {
    title: "Ideas Platform",
    icon: "lightbulb",
    router: "/ideas-platform",
    group: NavigationGroup.Main
  }
];

export default Menu;
