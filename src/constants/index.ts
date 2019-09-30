// Base roles
export const ROLES = {
  SysAdmin: "SysAdmin",
  Admin: "Admin",
  Manager: "Manager",
  HR: "HR",
  User: "User"
};

// Events for EventBus
export const EVENTS = {
  LOGGED_IN: "logged-in",
  LOGGED_OUT: "logged-out",
  REDIRECT_TO_LOGIN: "redirect-to-login",
  SHOW_SNACKBAR: "show-snackbar"
};


export const PERMISSION = {
  Add : "add",
  Delete : "delete",
  Edit : "edit",
  View : "view",
}

export enum GENDER {
  Unknown = 0,
  Male = 1, 
  Female = 2
}