import { NavigationItem } from "@/models/navigation.interface";

const navigationItems: NavigationItem[] = [
  {
    name: "my-profile",
    title: "My profile",
    icon: "person",
    router: "/personal/profile",
  },
  {
    name: "system-settings",
    title: "System settings",
    icon: "settings_applications",
    router: "/system",
  },
  {
    name: "configuration",
    title: "Configuration",
    icon: "build",
    router: "/admin",
  },
  {
    name: "employees",
    title: "Employees",
    icon: "receipt",
    router: "/administration/employees",
  },
  {
    name: "administration-projects",
    title: "Projects",
    icon: "receipt",
    router: "/administration/project",
  },
  {
    name: "positions-grade",
    title: "Positions Grade",
    icon: "receipt",
    router: "/administration/positions-grade",
  },
  {
    name: "organization-structure",
    title: "Organization Structure",
    icon: "receipt",
    router: "/administration/organization-structure",
  },
  {
    name: "projects",
    title: "Projects",
    icon: "receipt",
    router: "/organization/project",
  },
  {
    name: "360-team-review",
    title: "360 Team Review",
    icon: "insert_chart_outlined",
    router: "/evaluation/360-team-view",
  },
  {
    name: "360-analytics",
    title: "360 Analytics",
    icon: "insert_chart_outlined",
    router: "/evaluation/360-analytics",
  },
  {
    name: "salary-review-plan",
    title: "Salary Review Plan",
    icon: "local_atm",
    router: "/salary",
  },
  {
    name: "360-questionarie",
    title: "360 Questionarie",
    icon: "receipt",
    router: "/administration/360-questionarie",
  },
  {
    name: "company-strategy",
    title: "Company Strategy",
    icon: "receipt",
    router: "/administration/company-strategy",
  },
  {
    name: "360-schedule",
    title: "360 Schedule",
    icon: "receipt",
    router: "/administration/360-schedule-setup",
  },
  {
    name: "360",
    title: "360",
    icon: "local_play",
    router: "/personal/i-evaluate",
  },
  {
    name: "pdp",
    title: "PDP",
    icon: "book",
    router: "/personal/pdp",
  },
  {
    name: "ideas-platform",
    title: "Ideas Platform",
    icon: "lightbulb",
    router: "/ideas-platform",
  },
  {
    name: "education-cubes",
    title: "Education Cubes",
    icon: "fa-cube",
    router: "/education",
  }
];

export default navigationItems;
