// Describe user profile
export interface UserProfile {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  fullName: string;
  pictureUrl: string;
  roles?: Array<string>;
  userScore: number;
  userPrevScore?: number;
  totalProgress?: number;
  accessDescriptor?: { [key: string]: AccessDescriptor };
  permissions?: Array<Permission>;
}

// Vuex state for user profile
export interface UserProfileState {
  profile?: UserProfile;
  status?: string;
  isError: boolean;
  isLoading: boolean;
  accessDescriptor?: { [key: string]: AccessDescriptor };
  permissions?: Array<Permission>;
}

export interface AccessDescriptor {
  name: string;
  isActive: boolean;
}

export interface Permission {
  moduleId: string;
  action: string;
}