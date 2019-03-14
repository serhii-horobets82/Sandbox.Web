import {GetterTree} from "vuex";
import {UserProfileState} from "./types";
import {GlobalState} from "@/types/global";

export const getters: GetterTree<UserProfileState, GlobalState> = {
  profile: state => state.profile,
  userIsAdmin: state => state.userIsAdmin,
  userIsManager: state => state.userIsManager,
  userIsHR: state => state.userIsHR
};
