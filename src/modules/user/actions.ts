import {ActionTree} from "vuex";
import {UserProfileState, UserProfile} from "./types";
import {GlobalState} from "@/types/global";
import {userService} from "./service";
import {
  REQUEST_PROFILE,
  RESET_PROFILE,
  REQUEST_PROFILE_SUCCESS,
  REQUEST_PROFILE_ERROR
} from "./mutations";

export const actions: ActionTree<UserProfileState, GlobalState> = {
  userRequest({commit, dispatch}): any {
    commit(REQUEST_PROFILE);
    userService
      .getProfile()
      .then(response => {
        commit(REQUEST_PROFILE_SUCCESS, response.data);
      })
      .catch(error => {
        commit(REQUEST_PROFILE_ERROR);
        dispatch("auth/authLogout", null, {root: true});
      });
  },
  userReset({commit}): any {
    commit(RESET_PROFILE);
  }
};
