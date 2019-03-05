import user from "./user";

export default {
  namespaced: true,
  state: user.state,
  mutations: user.mutations,
  getters: user.getters,
  actions: user.actions
};
