import * as User from "./user";
import * as Chat from "./chat";
export default {
  // user
  getUser: User.getUser,
  getUserById: User.getUserById,

  // chat
  getChatMenu: Chat.Menu,
  getChatGroup: Chat.Groups,
  getChatGroupById: Chat.getChatById
};
