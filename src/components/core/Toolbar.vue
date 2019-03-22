<template>
  <v-toolbar id="core-toolbar" app flat prominent>
    <v-toolbar-title class="tertiary--text font-weight-light">
      <v-btn class="default v-btn--simple" dark icon @click.stop="onClickBtn">
        <v-icon>list</v-icon>
      </v-btn>
      <!--{{ title }}-->
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />
        <!-- Dashboard icon -->
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon color="tertiary">dashboard</v-icon>
        </router-link>

        <!-- Language switch -->
        <widget-locale/>

        <!-- Notification -->
        <widget-notifications/>

        <!-- Sign in-->
        <router-link
          v-show="!isAuthenticated"
          :title="$t('Auth.signIn')"
          v-ripple
          class="toolbar-items"
          to="/auth"
        >
          <v-icon color="tertiary">lock</v-icon>
        </router-link>

        <v-menu bottom left offset-y content-class="dropdown-menu" transition="slide-y-transition">
          <template #activator="data">
            <v-avatar size="32" v-on="data.on" v-show="isAuthenticated">
              <img :src="profile.pictureUrl" :alt="profile.fullName" v-if="profile"/>
              <v-icon color="tertiary" v-else>person</v-icon>
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
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import {mapMutations, mapGetters} from "vuex";
  import {EventBus} from "@/event-bus";
  import {NavigationItem, NavigationGroup} from "@/models/navigation.interface";
  import {UserProfile} from "@/modules/user/types";
  import Menu from "@/data/menu";

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
        return Menu.filter(i => i.group === NavigationGroup.Personal && i.authRequired);
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
      ...mapMutations(["setDrawer"]),
      onClickBtn() {
        this.setDrawer(!this.$store.state.drawer)
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
