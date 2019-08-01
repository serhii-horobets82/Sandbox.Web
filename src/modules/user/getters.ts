import { GetterTree } from "vuex";
import { UserProfileState } from "./types";
import { GlobalState } from "@/types/global";

export const getters: GetterTree<UserProfileState, GlobalState> = {
  state: state => state,
  profile: state => state.profile,
  userIsSysAdmin: state => state.userIsSysAdmin,
  userIsAdmin: state => state.userIsAdmin,
  userIsManager: state => state.userIsManager,
  userIsHR: state => state.userIsHR
};
