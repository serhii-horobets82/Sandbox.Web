import { ActionTree } from "vuex";
import { UserProfileState } from "./types";
import { GlobalState } from "@/types/global";
import { userService } from "./service";
import {
  REQUEST_PROFILE,
  RESET_PROFILE,
  REQUEST_PROFILE_SUCCESS,
  REQUEST_PROFILE_ERROR
} from "./mutations";

export const actions: ActionTree<UserProfileState, GlobalState> = {
  userRequest({ commit, dispatch }): any {
    return new Promise((resolve, reject) => {
      commit(REQUEST_PROFILE);
      userService
        .getProfile()
        .then(response => {
          commit(REQUEST_PROFILE_SUCCESS, response.data);
          resolve(response.data);
          //dispatch("chat/connect", response.data, { root: true });
        })
        .catch(error => {
          commit(REQUEST_PROFILE_ERROR);
          reject(error);
          dispatch("auth/authLogout", null, { root: true });
        });
    });
  },
  userReset({ commit }): any {
    commit(RESET_PROFILE);
  }
};
