import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import toast from "@/services/toast";
const INSTANCE_LOCATOR = "v1:us1:4d442e23-a1b2-4ea1-9f4f-9ed558e9e367";
const TOKEN_PROVIDER_URL =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4d442e23-a1b2-4ea1-9f4f-9ed558e9e367/token";

class ChatService {
  chatManager: any;
  currentRoom: any;

  connect(userId: String, dispatch: any) {
    const tokenProvider = new TokenProvider({
      url: TOKEN_PROVIDER_URL
    });
    this.chatManager = new ChatManager({
      instanceLocator: INSTANCE_LOCATOR,
      tokenProvider: tokenProvider,
      userId: userId
      // logger: {
      //   info: console.log,
      //   warn: console.log,
      //   error: console.log,
      //   debug: console.log,
      //   verbose: console.log
      // }
    });

    return new Promise((resolve, reject) => {
      this.chatManager
        .connect({
          onAddedToRoom: (room: any) => {
            console.log("added to room: ", room);
            toast.success(`You was added to room "${room.name}"`);
          },
          onRemovedFromRoom: (room: any) => {
            console.log("removed from room: ", room);
            toast.success(`You was removed from room "${room.name}"`);
          },
          onUserJoinedRoom: (room: any, user: any) => {
            console.log("user: ", user, " joined room: ", room);
            toast.success(`User ${user} joined room "${room.name}"`);
          },
          onUserLeftRoom: (room: any, user: any) => {
            console.log("user: ", user, " left room: ", room);
            toast.success(`User ${user} left room "${room.name}"`);
          },
          onPresenceChanged: ({ previous, current }: any, user: any) => {
            //console.log("user: ", user, " was ", previous, " but is now ", current);
            //toast.success(`User [${user.name}${user.id}] was ${previous} but now  ${current}`);
          }
        })
        .then((currentUser: any) => {
          currentUser.rooms.forEach((room: any) => {
            currentUser.subscribeToRoom({
              roomId: room.id,
              hooks: {
                onMessage: (message: any) => {
                  dispatch("chat/getMessage", message, { root: true });
                }
              }
            });
          });
          resolve({ user: currentUser, room: currentUser.rooms[0] });
        })
        .catch((error: any) => {
          reject(error);
          console.log("Error on connection: ", error);
        });
    });
  }
}

// Export a singleton instance in the global namespace
export const chatService = new ChatService();
