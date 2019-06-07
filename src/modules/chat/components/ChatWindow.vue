<template>
  <v-card class="chat-room ml-2" v-if="chat">
    <v-toolbar card dense flat class="white chat-room--toolbar" light>
      <v-btn icon>
        <v-icon color="text--secondary">keyboard_arrow_left</v-icon>
      </v-btn>
      <template v-if="chat.users">
        <v-avatar size="32" class="avatar-stack" v-for="(uuid,index) in chat.users" :key="index">
          <img :src="getAvatar(uuid)" :alt="uuid" :title="uuid">
        </v-avatar>
      </template>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h3>{{chat.title}}</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon color="text--primary">add</v-icon>
        </v-btn>
        <span>Add user</span>
      </v-tooltip>
    </v-toolbar>
    <vue-perfect-scrollbar class="chat-room--scrollbar grey lighten-5" v-bind:style="computeHeight">
      <v-card-text class="chat-room--list pa-3">
        <template v-for="(item, index) in chat.messages">
          <div
            v-bind:class="[ item.user.uuid === profile.email ? 'reverse' : '']"
            class="messaging-item layout row my-4"
            :key="index"
          >
            <v-avatar class="indigo mx-1" size="40">
              <img v-bind:src="item.user.avatar" alt>
            </v-avatar>
            <div class="messaging--body layout column mx-2">
              <p
                :value="true"
                v-bind:class="[ index % 2 == 0 ? 'primary white--text' : 'white']"
                class="pa-2"
              >{{item.text}}</p>
              <div class="caption px-2 text--secondary">{{item.created_at | formatDate}}</div>
            </div>
            <v-spacer></v-spacer>
          </div>
        </template>
      </v-card-text>
    </vue-perfect-scrollbar>
    <v-card-actions class>
      <emoji-list :show="emojiPanel" @close="toggleEmojiPanel" @click="addMessage"></emoji-list>
      <v-btn icon class="blue--text emoji-panel" @click="toggleEmojiPanel">
        <v-icon>mood</v-icon>
      </v-btn>
      <v-text-field
        @keyup.enter="sendMessage"
        v-model="messageText"
        clearable
        flat
        hide-details
        solo
      >
        <template v-slot:label>
          <span class="subheading">{{$t('Chat.messageHint')}}</span>
        </template>
        <template v-slot:append>
          <v-icon @click="sendMessage" color="primary">send</v-icon>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>
<script>
import { getChatById } from "@/api/chat";
import { getUserById } from "@/api/user";
import { mapGetters, mapState, mapMutations } from "vuex";
import { getAvatar } from "@/util";
import EmojiList from "./EmojiList.vue";

import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar,
    EmojiList
  },
  data: () => ({
    messageText: "",
    emojiPanel: false
  }),
  methods: {
    getAvatar,
    addMessage(emoji) {
      this.messageText += emoji.native;
    },
    toggleEmojiPanel() {
      this.emojiPanel = !this.emojiPanel;
    },
    sendMessage() {
      if (!this.messageText) return;
      const { user, room } = this.chatInfo;
      user
        .sendMessage({
          text: this.messageText,
          roomId: room.id
        })
        .then(messageId => {
          this.messageText = "";
        })
        .catch(error => {
          console.log("Error", error);
        });
    }
  },
  computed: {
    chat() {
      if (this.chatInfo && this.chatInfo.user) {
        const { room, user, messages } = this.chatInfo;
        let msgs = messages
          .filter(m => m.roomId === room.id)
          .map(message => ({
            uuid: message.id,
            text: message.text,
            userId: message.senderId,
            created_at: message.createdAt,
            user: {
              uuid: message.sender.id,
              name: message.sender.name,
              avatar: this.getAvatar(message.sender.id)
            }
          }));

        const chat = {
          uuid: room.id,
          title: `${room.name} (id=${room.id})`,
          users: room.userIds,
          messages: msgs,
          created_by: room.createdByUserId,
          created_at: room.createdAt,
          user: {
            uuid: user.id,
            name: user.name,
            avatar: this.getAvatar(user.id)
          }
        };
        return chat;
      }
    },
    ...mapState(["user"]),
    ...mapState("chat", ["chatInfo"]),
    ...mapGetters("user", ["profile"]),
    computeHeight() {
      return {
        height: this.height || ""
      };
    }
  }
};
</script>

