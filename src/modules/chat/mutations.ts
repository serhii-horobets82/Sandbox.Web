import { MutationTree } from "vuex";
import { ChatInfo, ChatState } from "./types";
import { getDefaultState } from "./index";

// mutation constants
export const REQUEST_CHAT = "REQUEST_CHAT";
export const REQUEST_CHAT_SUCCESS = "REQUEST_CHAT_SUCCESS";
export const REQUEST_CHAT_ERROR = "REQUEST_CHAT_ERROR";

export const mutations: MutationTree<ChatState> = {
  [REQUEST_CHAT]: state => {
    state.isLoading = true;
    state.isError = false;
  },
  [REQUEST_CHAT_SUCCESS](state, payload: any) {
    console.log("state", state);
    console.log("payload", payload);
    state.isError = false;
    state.isLoading = false;
  },
  [REQUEST_CHAT_ERROR](state) {
    Object.assign(state, getDefaultState());
    state.isError = true;
  }
};
