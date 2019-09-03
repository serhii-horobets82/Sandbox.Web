<template>
  <v-toolbar id="core-toolbar" color="accent" height="80" app flat>
    <v-layout row>
       <!-- <v-toolbar-title>
        <v-text-field clearable flat hide-details solo>
          <template v-slot:label>
            <span class="subheading">{{$t('Toolbar.findLabel')}}</span>
          </template>
          <template v-slot:prepend-inner>
            <v-icon color="primary">search</v-icon>
          </template>
        </v-text-field>
      </v-toolbar-title> -->
      <v-spacer />

      <v-toolbar-items v-if="profile">
        <!-- Swith user on fly - demo only -->
        <widget-switch-employee />

        <!-- Fullscreen icon -->
        <!-- <v-btn icon @click="handleFullScreen()" class="mx-3">
          <v-icon color="secondary">fullscreen</v-icon>
        </v-btn> -->

        <!-- Language switch -->
        <widget-locale />

        <!-- Notification -->
        <widget-notifications />

        <v-btn icon to="/chat" class="mx-3">
          <v-badge color="orange" overlap>
            <template
              slot="badge"
              v-if="chatInfo && chatInfo.room && chatInfo.room.unreadCount > 0"
            >{{chatInfo.room.unreadCount}}</template>
            <v-icon color="secondary">sms</v-icon>
          </v-badge>
        </v-btn>

        <!-- Sign out-->
        <v-divider vertical></v-divider>
        <v-btn icon to="/logout" class="mx-3">
          <v-icon color="secondary">exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-layout>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { EventBus } from "@/event-bus";
import { NavigationItem, NavigationGroup } from "@/models/navigation.interface";
import { UserProfile } from "@/modules/user/types";
import Menu from "@/data/menu";
import { toggleFullScreen } from "@/util";
import { EVENTS } from "@/constants/index";

export default {
  computed: {
    ...mapGetters("chat", ["chatInfo"]),
    ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"])
  },
  methods: {
    handleFullScreen() {
      toggleFullScreen();
    }
  }
};
</script>

<style lang="scss">
.v-toolbar__content {
  background-color: white;
  margin-left: 3px;
}
</style>
