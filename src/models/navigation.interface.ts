// Describe router information
export interface NavigationItem {
  header?: string;
  title?: string;
  icon?: string;
  router?: string;
  authRequired?: boolean;
  group?: NavigationGroup;
  accessedBy: Role[];
}

export enum NavigationGroup {
  Main,
  Personal
}

export type Role = 'admin' | 'sysadmin' | 'manager' | 'hr' | 'default';

export type AccessDescriptor = { [key in Role]?: boolean };

export interface RoleMatrix {
  userIsSysAdmin: boolean;
  userIsAdmin: boolean;
  userIsHR: boolean;
  userIsManager: boolean
}