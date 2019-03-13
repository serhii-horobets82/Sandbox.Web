import Vue from "vue";
import Vuex from "vuex";

import auth from "@/modules/auth/store";
import home from "@/modules/home/store";
import user from "@/modules/user/store";
import admin from "@/modules/admin/store";
import evaluation from "@/modules/evaluation/store";
import okr from "@/modules/okr/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    home,
    admin,
    evaluation,
    okr
  }
});
