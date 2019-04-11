import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import auth from "@/modules/auth/store";
import home from "@/modules/home/store";
import { user } from "@/modules/user";
import admin from "@/modules/admin/store";
import evaluation from "@/modules/evaluation/store";
import okr from "@/modules/okr/store";
import { version } from "../package.json";
import { GlobalState } from "@/types/global";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    title: "Evoflare",
    version: version,
    drawer: true,
    color: "info"
  };
};

// mutation constants
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

const set = (property: any) => (state: any, payload: any) => (state[property] = payload);
const toggle = (property: any) => (state: any) => (state[property] = !state[property]);

const store: StoreOptions<GlobalState> = {
  state: getDefaultState(),
  mutations: {
    TOGGLE_SIDEBAR: toggle("drawer")
  },
  actions: {
    toggleSideBar({ commit }) {
      commit(TOGGLE_SIDEBAR);
    },
    showSidebar({ commit }, val) {
      if (val !== this.state.drawer) commit(TOGGLE_SIDEBAR);
    }
  },
  modules: {
    auth,
    user,
    home,
    admin,
    evaluation,
    okr
  }
};

export default new Vuex.Store<GlobalState>(store);
