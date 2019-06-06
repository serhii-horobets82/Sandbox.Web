import { ActionTree } from "vuex";
import { ChatInfo, ChatState } from "./types";
import { UserProfile } from "../user/types";
import { GlobalState } from "@/types/global";
import { chatService } from "./service";
import toast from "@/services/toast";
import { EVENTS } from "@/constants";
import { EventBus } from "@/event-bus";
import { REQUEST_CHAT, REQUEST_CHAT_SUCCESS, REQUEST_CHAT_ERROR } from "./mutations";

export const actions: ActionTree<ChatState, GlobalState> = {
  connect({ commit }, profile: UserProfile): any {
    commit(REQUEST_CHAT);
    console.log(profile);
    chatService
      .connect(profile.email)
      .then((chatInfo: any) => {
        toast.success("Connected to chat ...");
        console.log("chatInfo", chatInfo);
        commit(REQUEST_CHAT_SUCCESS, chatInfo);
      })
      .catch((error: any) => {
        console.log("error", error);
        toast.error(error);
        commit(REQUEST_CHAT_ERROR, error);
      });
  }
};
