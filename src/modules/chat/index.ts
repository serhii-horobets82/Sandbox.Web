import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ChatInfo, ChatState } from "./types";
import { GlobalState } from "@/types/global";

// default state for module
export const getDefaultState = () => {
  return {
    chatInfo: { messages: [] },
    isError: false,
    isLoading: false,
    status: ""
  };
};

const state: ChatState = getDefaultState();
const namespaced: boolean = true;

export const chat: Module<ChatState, GlobalState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
