<template>
  <div class="chat-history">
    <v-toolbar dense>
      <v-text-field clearable flat hide-details solo>
        <template v-slot:label>
          <span class="subheading disabled">Find in rooms</span>
        </template>
        <template v-slot:prepend>
          <v-icon color="primary">search</v-icon>
        </template>
      </v-text-field>
    </v-toolbar>
    <vue-perfect-scrollbar class="chat-history--scrollbar">
      <v-divider></v-divider>
      <v-list two-line class="chat-history--list">
        <v-subheader>Rooms</v-subheader>
        <template v-for="(item, index) in chats">
          <v-divider :key="index"></v-divider>
          <v-list-tile class="chat-list" avatar :key="item.id" @click="switchRoom(item)">
            <v-list-tile-avatar :color="randomColor()" size="50">
              <v-badge color="orange" left>
                <template v-slot:badge>
                  <span class="white--text">{{item.unreadCount}}</span>
                </template>
                <span class="white--text headline">{{ firstLetter(item.name)}}</span>
              </v-badge>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-icon>{{item.isPrivate ? 'lock' : 'public'}}</v-icon>
                {{item.createdByUserId}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>{{ item.createdAt | formatDate }}</v-list-tile-action-text>
              <v-circle dot :color="chatStatusColor(item)"></v-circle>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import { Groups } from "@/api/chat";
import { getUserById } from "@/api/user";
import VCircle from "@/components/circle/VCircle";
import { randomElement, getAvatar } from "@/util";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  components: {
    VuePerfectScrollbar,
    VCircle
  },
  computed: {
    ...mapState("chat", ["chatInfo"]),
    chats() {
      if (this.chatInfo && this.chatInfo.user) {
        const { user } = this.chatInfo;
        return user.rooms;
      }
    }
  },
  methods: {
    getAvatar,
    switchRoom(room) {
      this.$store.dispatch("chat/switchRoom", room, { root: true });
    },
    firstLetter(title) {
      return title.charAt(0);
    },
    formatChatTime(s) {
      return new Date(s).toLocaleDateString();
    },
    computeTitle(item) {
      return item.name;
    },
    randomColor() {
      return randomElement(["blue", "indigo", "success", "error", "green"]);
    },

    chatStatusColor() {
      return "black";
    }
  }
};
</script>

