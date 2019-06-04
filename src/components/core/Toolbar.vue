<template>
  <v-toolbar id="core-toolbar" color="accent" height="80" app flat>
    <v-layout row class="primary lighten-1">
      <v-toolbar-title>
        <v-text-field clearable flat hide-details solo>
          <template v-slot:label>
            <span class="subheading disabled">Find something ...</span>
          </template>
          <template v-slot:prepend-inner>
            <v-icon color="primary">search</v-icon>
          </template>
        </v-text-field>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-toolbar-items>
          <widget-switch-employee/>
        </v-toolbar-items>

        <!-- Fullscreen icon -->
        <v-btn icon @click="handleFullScreen()" class="mx-3">
          <v-icon color="secondary">fullscreen</v-icon>
        </v-btn>

        <!-- Language switch -->
        <widget-locale/>

        <!-- Notification -->
        <widget-notifications/>

        <v-btn icon to="/chat" class="mx-3">
          <v-badge color="orange" overlap>
            <template slot="badge">1</template>
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
  data: () => ({
    title: null,
    showProgressTooltip: false,
    responsive: false,
    responsiveInput: false,
    toolbarLinks: [
      { title: "Dashboard", to: "/" },
      { title: "My profile", to: "/personal/profile" },
      { title: "360", to: "/evaluation/360-team-view" },
      { title: "Latest summary", to: "/personal/summary" },
      { title: "PDP", to: "/personal/pdp" }
    ],
    toolbarItems: [
      {
        icon: "rate_review",
        color: "orange",
        title: "127",
        subtitle: "Reviews"
      },
      {
        icon: "book",
        color: "blue",
        title: "4",
        subtitle: "Courses"
      },
      {
        icon: "trending_up",
        color: "green",
        title: "12",
        subtitle: "Trainings"
      }
    ]
  }),
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"]),
    personalNavigationAuth() {
      let personal = Menu.filter(
        i => i.group === NavigationGroup.Personal && i.authRequired
      );
      return personal.filter(
        i => (i.adminRoleRequired && this.userIsAdmin) || !i.adminRoleRequired
      );
    }
  },
  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    if (this.isAuthenticated && !this.profile)
      this.$store.dispatch("user/userRequest");
  },
  beforeDestroy() {},

  methods: {
    handleFullScreen() {
      toggleFullScreen();
    }
  }
};
</script>
