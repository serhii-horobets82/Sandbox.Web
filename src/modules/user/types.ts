// Describe user profile
export interface UserProfile {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  fullName: string;
  pictureUrl: string;
  roles?: Array<string>;
  userScore?: string;
}

// Vuex state for user profile
export interface UserProfileState {
  profile?: UserProfile;
  userIsAdmin: boolean;
  userIsManager: boolean;
  userIsHR: boolean;
  status?: string;
  isError: boolean;
  isLoading: boolean;
}
