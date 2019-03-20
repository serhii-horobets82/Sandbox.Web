import Vue from "vue";
import Vuex, {StoreOptions} from "vuex";

import auth from "@/modules/auth/store";
import home from "@/modules/home/store";
import {user} from "@/modules/user";
import admin from "@/modules/admin/store";
import evaluation from "@/modules/evaluation/store";
import okr from "@/modules/okr/store";
import {version} from "../package.json";
import {GlobalState} from "@/types/global";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    title: "Evoflare",
    version: version,
    drawer: true,
    color: 'info',
    image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
  };
};

export const set = (property: any) => (state: any, payload: any) => (state[property] = payload);
export const toggle = (property: any) => (state: any) => (state[property] = !state[property]);

const store: StoreOptions<GlobalState> = {
  state: getDefaultState(),
  mutations: {
    setDrawer: set('drawer'),
    setImage: set('image'),
    setColor: set('color'),
    toggleDrawer: toggle('drawer')
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
