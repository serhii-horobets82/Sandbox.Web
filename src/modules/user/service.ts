import axios from "axios";
import { UserProfile } from "./types";

class UserService {
  constructor() {}

  getProfile() {
    return axios.get<UserProfile>(`api/profile/me`);
  }

  getPermission() {
    return axios.get(`api/profile/permissions`);
  }

  getClaims() {
    return axios.get(`api/profile/claims`);
  }
}

// Export a singleton instance in the global namespace
export const userService = new UserService();
