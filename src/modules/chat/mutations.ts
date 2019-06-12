import { MutationTree } from "vuex";
import { ChatInfo, ChatState } from "./types";
import { getDefaultState } from "./index";

// mutation constants
export const REQUEST_CHAT = "REQUEST_CHAT";
export const REQUEST_CHAT_SUCCESS = "REQUEST_CHAT_SUCCESS";
export const REQUEST_CHAT_ERROR = "REQUEST_CHAT_ERROR";
export const READ_MESSAGE = "READ_MESSAGE";
export const SWITCH_ROOM = "SWITCH_ROOM";

export const mutations: MutationTree<ChatState> = {
  [REQUEST_CHAT]: state => {
    state.isLoading = true;
    state.isError = false;
  },
  [REQUEST_CHAT_SUCCESS](state, payload: ChatInfo) {
    const { user, room } = payload;
    state.chatInfo = Object.assign({}, state.chatInfo, { user, room, messages: [] });
    state.isError = false;
    state.isLoading = false;
  },
  [REQUEST_CHAT_ERROR](state) {
    Object.assign(state, getDefaultState());
    state.isError = true;
  },
  [READ_MESSAGE](state, message: any) {
    if (state.chatInfo && state.chatInfo.messages) state.chatInfo.messages.push(message);
  },
  [SWITCH_ROOM](state, room: any) {
    if (state.chatInfo && state.chatInfo.room) state.chatInfo.room = room;
  }
};
