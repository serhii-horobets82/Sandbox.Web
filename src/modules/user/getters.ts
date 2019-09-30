import { GetterTree } from "vuex";
import { UserProfileState } from "./types";
import { GlobalState } from "@/types/global";

export const getters: GetterTree<UserProfileState, GlobalState> = {
  state: state => state,
  profile: state => state.profile,
  accessDescriptor: state => state.accessDescriptor
};
