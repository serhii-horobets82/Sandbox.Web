import { MutationTree } from "vuex";
import { UserProfileState, UserProfile } from "./types";
import { getDefaultState } from "./index";
import { EVENTS, ROLES } from "@/constants";
import { EventBus } from "@/event-bus";
import { randomInt, randomDecimal } from "@/util";

// mutation constants
export const RESET_PROFILE = "RESET_PROFILE";
export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const REQUEST_PROFILE_SUCCESS = "REQUEST_PROFILE_SUCCESS";
export const REQUEST_PROFILE_ERROR = "REQUEST_PROFILE_ERROR";

export const mutations: MutationTree<UserProfileState> = {
  [REQUEST_PROFILE]: state => {
    state.status = "Attempting request for user profile data";
    state.isLoading = true;
    state.isError = false;
  },
  [REQUEST_PROFILE_SUCCESS](state, payload: UserProfile) {
    // TODO
    state.profile = {
      userScore: randomDecimal(1, 6),
      userPrevScore: randomDecimal(2, 5),
      totalProgress: randomInt(10, 100),
      ...payload
    };
    // check roles
    if (payload.roles) {
      state.accessDescriptor = payload.accessDescriptor;
    }
    state.isError = false;
    state.isLoading = false;
  },
  [REQUEST_PROFILE_ERROR](state) {
    Object.assign(state, getDefaultState());
    state.isError = true;
  },
  [RESET_PROFILE](state) {
    // set state as default
    Object.assign(state, getDefaultState());
    // Show snackbar
    EventBus.$emit(EVENTS.SHOW_SNACKBAR, { text: "Logout successfully" });
  }
};
