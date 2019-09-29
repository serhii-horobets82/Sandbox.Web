import { NavigationGroup, NavigationItem } from "@/models/navigation.interface";

const sysadminNavigationItems: NavigationItem[] = [
  {
    title: "System settings",
    icon: "settings_applications",
    router: "/system",
    group: NavigationGroup.Personal,
    accessedBy: ['sysadmin']
  },
];

const adminNavigationItems: NavigationItem[] = [
  {
    title: "Configuration",
    icon: "build",
    router: "/admin",
    group: NavigationGroup.Personal,
    accessedBy: ['admin']
  },
  {
    title: "Employees",
    icon: "receipt",
    router: "/administration/employees",
    group: NavigationGroup.Personal,
    accessedBy: ['admin']
  },
  {
    title: "Projects",
    icon: "receipt",
    router: "/administration/project",
    group: NavigationGroup.Personal,
    accessedBy: ['admin']
  },
  {
    title: "Positions Grade",
    icon: "receipt",
    router: "/administration/positions-grade",
    group: NavigationGroup.Personal,
    accessedBy: ['admin']
  },
  {
    title: "Organization Structure",
    icon: "receipt",
    router: "/administration/organization-structure",
    group: NavigationGroup.Personal,
    accessedBy: ['admin']
  },
];

const managerNavigationItems: NavigationItem[] = [
  {
    title: "Projects",
    icon: "receipt",
    router: "/organization/project",
    group: NavigationGroup.Personal,
    accessedBy: ['manager']
  },
  {
    title: "360 Team Review",
    icon: "insert_chart_outlined",
    router: "/evaluation/360-team-view",
    group: NavigationGroup.Personal,
    accessedBy: ['manager']
  },
  {
    title: "360 Analytics",
    icon: "insert_chart_outlined",
    router: "/evaluation/360-analytics",
    group: NavigationGroup.Personal,
    accessedBy: ['manager']
  },
  {
    title: "Salary Review Plan",
    icon: "local_atm",
    router: "/salary",
    group: NavigationGroup.Personal,
    accessedBy: ['manager']
  },
];

const hrNavigationItems: NavigationItem[] = [
  {
    title: "360 Questionarie",
    icon: "receipt",
    router: "/administration/360-questionarie",
    group: NavigationGroup.Personal,
    accessedBy: ['hr']
  },
  {
    title: "Company Strategy",
    icon: "receipt",
    router: "/administration/company-strategy",
    group: NavigationGroup.Personal,
    accessedBy: ['hr']
  },
  {
    title: "360 Schedule",
    icon: "receipt",
    router: "/administration/360-schedule-setup",
    group: NavigationGroup.Personal,
    accessedBy: ['hr']
  }

];

const defaultNavigationItems: Array<NavigationItem> = [
  {
    title: "My profile",
    icon: "person",
    router: "/personal/profile",
    group: NavigationGroup.Main,
    accessedBy: ['hr', 'default', 'manager']
  },
  {
    title: "360",
    icon: "local_play",
    router: "/personal/i-evaluate",
    group: NavigationGroup.Main,
    accessedBy: ['hr', 'default', 'manager']
  },
  {
    title: "PDP",
    icon: "book",
    router: "/personal/pdp",
    group: NavigationGroup.Main,
    accessedBy: ['hr', 'default', 'manager']
  },
  {
    title: "Ideas Platform",
    icon: "lightbulb",
    router: "/ideas-platform",
    group: NavigationGroup.Main,
    accessedBy: ['hr', 'default', 'manager']
  },
  {
    title: "Education Cubes",
    icon: "fa-cube",
    router: "/education",
    group: NavigationGroup.Personal,
    accessedBy: ['hr', 'manager']
  }
];

export default [...defaultNavigationItems, ...sysadminNavigationItems, ...adminNavigationItems, ...hrNavigationItems, ...managerNavigationItems];
