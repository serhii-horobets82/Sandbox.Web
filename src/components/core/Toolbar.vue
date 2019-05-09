<template>
  <v-toolbar
    id="core-toolbar"
    color="primary lighten-1"
    app
    fixed
    dense
    extended
    card
    extension-height="100px"
  >
    <template v-slot:extension v-if="isAuthenticated && profile">
      <v-toolbar-title>
        <v-avatar size="90">
          <img :src="profile.pictureUrl" :alt="profile.fullName" v-if="profile">
        </v-avatar>
      </v-toolbar-title>
      <v-toolbar-title>
        <h3>{{profile.fullName}}</h3>
        <div class="caption">User role</div>
        <v-icon class="bl" color="yellow">star_border</v-icon>
        <span class="display-1 ml-1">4.04</span>
        <v-menu bottom left offset-y content-class="dropdown-menu" transition="slide-y-transition">
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
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"/>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-progress-linear color="secondary" height="10" value="15"></v-progress-linear>
      </v-toolbar-title>
      <!-- <v-toolbar-items>
        <v-btn flat to="/evaluation/employees-evaluation">Employees evaluation</v-btn>
        <v-btn flat to="/evaluation/schedule">Evaluation Schedule</v-btn>
        <v-btn flat to="/evaluation/360-team-view">360 Team Review</v-btn>
      </v-toolbar-items>-->

      <!-- <v-list>
        <v-list-tile class="left-menu__icons" to="/">
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>-->
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
    responsive: false,
    responsiveInput: false
  }),
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"]),
    personalNavigationAuth() {
      return Menu.filter(
        i => i.group === NavigationGroup.Personal && i.authRequired
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
