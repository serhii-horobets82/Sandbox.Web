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

const store: StoreOptions<GlobalState> = {
  state: {
    version: version
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
