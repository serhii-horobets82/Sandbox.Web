import auth from "./auth";

export default {
  namespaced: true,
  state: auth.state,
  mutations: auth.mutations,
  getters: auth.getters,
  actions: auth.actions
};
