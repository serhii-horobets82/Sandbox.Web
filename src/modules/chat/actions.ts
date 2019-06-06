import { ActionTree } from "vuex";
import { ChatInfo, ChatState } from "./types";
import { UserProfile } from "../user/types";
import { GlobalState } from "@/types/global";
import { chatService } from "./service";
import toast from "@/services/toast";
import { REQUEST_CHAT, REQUEST_CHAT_SUCCESS, REQUEST_CHAT_ERROR, READ_MESSAGE } from "./mutations";

export const actions: ActionTree<ChatState, GlobalState> = {
  connect({ commit, dispatch }, profile: UserProfile): any {
    commit(REQUEST_CHAT);
    chatService
      .connect(profile.email, dispatch)
      .then((chatInfo: ChatInfo) => {
        commit(REQUEST_CHAT_SUCCESS, chatInfo);
      })
      .catch((error: any) => {
        toast.error(error);
        commit(REQUEST_CHAT_ERROR, error);
      });
  },
  getMessage({ commit }, message: any): any {
    commit(READ_MESSAGE, message);
  }
};
