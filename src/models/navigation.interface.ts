// Describe router information
export interface NavigationItem {
  header?: string,
  title?: string,
  icon?: string,
  router?: string
  authRequired?: boolean,
  adminRoleRequired?: boolean,
  managerRoleRequired?: boolean,
  hrRoleRequired?: boolean,
  autoHide?: boolean,
  unauthRequired?: boolean,
  group?: NavigationGroup;
}

export enum NavigationGroup {
  Main,
  Personal
}
