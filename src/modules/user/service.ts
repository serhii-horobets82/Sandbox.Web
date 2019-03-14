import axios from 'axios';
import {UserProfile} from './types';

class UserService {
  constructor() {
  }

  getProfile() {
    return axios.get<UserProfile>(`api/profile/me`);
  }
}

// Export a singleton instance in the global namespace
export const userService = new UserService();
