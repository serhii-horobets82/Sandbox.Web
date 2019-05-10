<template>
  <v-toolbar
    id="core-toolbar"
    color="primary lighten-1"
    app
    fixed
    flat
    dense
    extension-height="144px"
  >
    <template v-slot:extension v-if="isAuthenticated && profile">
      <v-container fluid class="ma-0 mt-0 pa-0 pl-4">
        <v-layout row>
          <v-flex shrink>
            <!-- Avatar -->
            <v-toolbar-title>
              <v-avatar size="90">
                <img :src="profile.pictureUrl" :alt="profile.fullName" v-if="profile">
              </v-avatar>
            </v-toolbar-title>
          </v-flex>
          <v-flex shrink>
            <!-- Profile info -->
            <v-toolbar-title class="ml-3">
              <h3>{{profile.fullName}}</h3>
              <div class="caption">User role</div>
              <v-icon class="bl" color="yellow">star_border</v-icon>
              <span class="display-1 ml-1">{{profile.userScore}}</span>
              <v-menu
                bottom
                rigth
                offset-y
                content-class="dropdown-menu"
                transition="slide-y-transition"
              >
                <template #activator="data">
                  <v-avatar class="ml-3 bl" color="accent" size="30" v-on="data.on">
                    <v-icon>more_horiz</v-icon>
                  </v-avatar>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(item, index) in personalNavigationAuth"
                    :key="index"
                    :to="item.router"
                  >
                    <v-list-tile-action>
                      <v-icon color="secondary">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"/>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-title>
          </v-flex>
          <v-flex shrink>
            <v-toolbar-title class="ml-5 toolbar-list">
              <v-tooltip v-model="showProgressTooltip" up fixed>
                <template v-slot:activator="{ on }">
                  <v-progress-linear v-on="on" color="secondary" height="10" value="15"></v-progress-linear>
                </template>
                <div class="subheading text-uppercase">
                  your level
                  <span class="pl-5 headline font-weight-bold">B1</span>
                </div>
                <div class="caption">How i can grow</div>
              </v-tooltip>
              <v-layout row no-wrap>
                <template v-for="(item, index) in toolbarItems">
                  <v-flex :key="'f1' + index">
                    <v-chip :color="item.color + ' lighten-4'" class="py-4 px-0" label small>
                      <v-icon medium :color="item.color">{{item.icon}}</v-icon>
                    </v-chip>
                  </v-flex>
                  <v-flex :key="'f2' + index">
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="title">{{item.title}}</v-list-tile-title>
                          <v-list-tile-sub-title class="caption">{{item.subtitle}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </template>
              </v-layout>
            </v-toolbar-title>
          </v-flex>
        </v-layout>
        <v-layout row class="pa-0 ma-0">
          <v-toolbar-items>
            <v-btn
              class="py-2 subheading"
              flat
              v-for="(link, index) in toolbarLinks"
              :to="link.to"
              :key="index"
            >{{link.title}}</v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-container>
    </template>

    <v-toolbar-title>
      <v-img color="secondary" src="/img/logo.svg" width="100px" @click.stop="$router.push('/')"></v-img>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-toolbar-items>
        <widget-switch-employee/>
      </v-toolbar-items>

      <!-- Fullscreen icon -->
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>

      <v-btn icon to="/">
        <v-icon>dashboard</v-icon>
      </v-btn>

      <!-- Language switch -->
      <widget-locale/>

      <!-- Notification -->
      <widget-notifications/>

      <!-- Sign in-->
      <v-btn icon to="/auth" v-show="!isAuthenticated">
        <v-icon>lock</v-icon>
      </v-btn>
    </v-toolbar-items>
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
    showProgressTooltip: true,
    responsive: false,
    responsiveInput: false,
    toolbarLinks: [
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
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    handleFullScreen() {
      toggleFullScreen();
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  }
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
