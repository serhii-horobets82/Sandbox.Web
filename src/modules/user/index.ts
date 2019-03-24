import {Module} from "vuex";
import {getters} from "./getters";
import {actions} from "./actions";
import {mutations} from "./mutations";
import {UserProfileState} from "./types";
import {GlobalState} from "@/types/global";

// default state for module
export const getDefaultState = () => {
  return {
    profile: undefined,
    userIsAdmin: false,
    userIsManager: false,
    userIsHR: false,
    isError: false,
    isLoading: false,
    status: ""
  };
};

const state: UserProfileState = getDefaultState();
const namespaced: boolean = true;

export const user: Module<UserProfileState, GlobalState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
