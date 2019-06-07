import { GetterTree } from "vuex";
import { ChatState } from "./types";
import { GlobalState } from "@/types/global";

export const getters: GetterTree<ChatState, GlobalState> = {
  chatInfo: state => state.chatInfo
};
