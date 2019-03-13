import {profileService} from "@/services/profile.service";
import {EventBus} from "@/event-bus";
import Vue from "vue";

const state = {
  profile: {},
  userIsAdmin : false,
  userIsManager : false,
  status: ""
};

const getters = {
  profile: (userState: any) => userState.profile,
  userIsAdmin: (userState: any) => userState.userIsAdmin,
  userIsManager: (userState: any) => userState.userIsManager,
};

const actions = {
  userRequest: ({commit, dispatch}: { commit: any; dispatch: any }) => {
    commit("userRequest");
    profileService.get().subscribe(
      (result: any) => {
        commit("userSuccess", result);
      },
      (errors: any) => {
        commit("userError");
        //dispatch("auth/authLogout", null, {root: true});
      }
    );
  }
};

const mutations = {
  userRequest: (userState: any) => {
    userState.status = "attempting request for user profile data";
  },
  userSuccess: (userState: any, userProfile: any) => {
    userState.status = "success";

    Vue.set(userState, "profile", userProfile);
    let roles = userProfile["roles"];
    if(roles){
      Vue.set(userState, "userIsAdmin", roles.includes("Admin"));
      Vue.set(userState, "userIsManager", roles.includes("Manager"));
    }
  },
  userError: (userState: any) => {
    userState.status = "error";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
