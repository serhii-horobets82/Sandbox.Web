<template>
  <v-navigation-drawer
    id="app-drawer"
    app
    stateless
    hide-overlay
    mini-variant-width="78"
    :mini-variant="mini"
    class="primary lighten-1"
    fixed
    permanent
    width="250"
  >
    <v-card flat>
      <v-card-title>
        <v-layout align-center justify-center>
          <v-img
            color="secondary"
            :max-width="mini ? 30: 120"
            :src="mini ? '/img/logo-small.svg' : '/img/logo.svg'"
            @click.stop="mini = !mini"
          ></v-img>
        </v-layout>
      </v-card-title>
      <v-card-title>
        <v-layout align-center justify-center>
          <v-progress-circular :rotate="135" :size="170" :width="6" value="20" color="secondary">
            <v-badge bottom color="primary lighten-1">
              <template v-slot:badge>
                <v-btn
                  icon
                  @click.stop="$router.push('/profile')"
                  color="accent"
                  class="ma-0"
                  v-if="!mini"
                >
                  <v-icon color="secondary" size="24">edit</v-icon>
                </v-btn>
              </template>
              <v-avatar :size="mini ? 50 : 150">
                <img
                  :src="profile.pictureUrl"
                  :alt="profile.fullName"
                  v-if="profile"
                  @click.stop="mini = !mini"
                >
              </v-avatar>
            </v-badge>
          </v-progress-circular>
        </v-layout>
      </v-card-title>
      <v-layout align-center justify-center v-if="!mini">
        <v-toolbar-title class="ml-3" v-if="isAuthenticated && profile">
          <h3>{{profile.fullName}}</h3>
          <div class="caption text-xs-center">User Role</div>
          <v-icon class="bl" color="secondary">star_border</v-icon>
          <span class="display-1 ml-1">{{profile.userScore}}</span>
          <span class="subheading ml-1">4.02</span>
        </v-toolbar-title>
      </v-layout>
    </v-card>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-layout tag="v-list" column class="left-menu mt-3">
        <v-divider/>
        <template v-for="(item, index) in mainNavigation">
          <template>
            <template
              v-if="
                !item.autoHide ||
                  (item.unauthRequired && !isAuthenticated) ||
                  (item.authRequired &&
                    isAuthenticated &&
                    !item.managerRoleRequired &&
                    !item.adminRoleRequired) ||
                  (item.authRequired && isAuthenticated && item.adminRoleRequired && userIsAdmin) ||
                  (item.authRequired &&
                    isAuthenticated &&
                    item.managerRoleRequired &&
                    (userIsManager || userIsAdmin))"
            >
              <v-list-tile class="left-menu__icons" :key="index" :to="item.router">
                <v-list-tile-action>
                  <v-icon medium class="material-icons-outlined">{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="subheading font-weight-bold">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </template>
        </template>
      </v-layout>
    </vue-perfect-scrollbar>1
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState, mapMutations } from "vuex";
import { EventBus } from "@/event-bus";
import { NavigationItem, NavigationGroup } from "@/models/navigation.interface";
import { UserProfile } from "@/modules/user/types";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Menu from "@/data/menu";

@Component({
  computed: {
    ...mapState(["title", "image", "color", "drawer", "version"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"])
  },
  components: {
    VuePerfectScrollbar
  },
  created(): void {
    // try reload profile data on page refresh
    if (this.isAuthenticated && !this.profile) {
      this.$store.dispatch("user/userRequest").then(() => {});
    }
    EventBus.$on("logged-in", (payLoad: any) => {});
  }
})
export default class AppDrawer extends Vue {
  mini: boolean = false;
  links: Array<NavigationItem> = Menu;

  get mainNavigation(): Array<NavigationItem> {
    return this.links.filter(i => i.group === NavigationGroup.Main);
  }

  get personalNavigation(): Array<NavigationItem> {
    return this.links.filter(i => i.group === NavigationGroup.Personal);
  }

  get personalNavigationAuth(): Array<NavigationItem> {
    return this.links.filter(
      i => i.group === NavigationGroup.Personal && i.authRequired
    );
  }
  scrollSettings: any = {
    maxScrollbarLength: 160
  };

  // methods
  private logOut() {
    this.$store.dispatch("auth/authLogout").then(() => {
      this.$router.push("/");
    });
  }

  private destroyed() {
    EventBus.$off("logged-in");
  }
}
</script>

<style lang="stylus">
#app-drawer {
  overflow: hidden;

  .drawer-menu--scroll {
    height: calc(100vh - 200px);
    overflow: auto;
  }
}
</style>