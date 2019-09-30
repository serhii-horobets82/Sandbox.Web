<template>
  <v-navigation-drawer
    app
    disable-resize-watcher
    floating
    fixed
    permanent
    id="app-drawer"
    mini-variant-width="78"
    :mini-variant="miniDrawer"
    class="primary lighten-1"
    width="270"
  >
    <v-card flat>
      <v-card-title>
        <v-layout align-center justify-center>
          <v-img
            color="secondary"
            :max-width="miniDrawer ? 30: 120"
            :src="miniDrawer ? '/img/logo-small.svg' : '/img/logo.svg'"
            @click.stop="$router.push('/')"
          ></v-img>
        </v-layout>
      </v-card-title>
      <v-card-title>
        <v-layout align-center justify-center v-if="profile">
          <v-progress-circular
            :rotate="135"
            :size="170"
            :width="6"
            :value="profile.totalProgress"
            color="secondary"
          >
            <v-badge bottom color="primary lighten-1">
              <template v-slot:badge>
                <v-btn
                  icon
                  @click.stop="$router.push('/profile')"
                  color="accent"
                  class="ma-0"
                  v-if="!miniDrawer"
                >
                  <v-icon color="secondary" size="24">edit</v-icon>
                </v-btn>
              </template>
              <v-avatar :size="miniDrawer ? 50 : 150" @click.stop="$router.push('/profile')">
                <img :src="getCommonAvatar(profile)" :alt="profile.fullName" v-if="profile" />
              </v-avatar>
            </v-badge>
          </v-progress-circular>
        </v-layout>
      </v-card-title>
      <v-layout align-center justify-center v-if="!miniDrawer">
        <v-toolbar-title class="ml-3" v-if="isAuthenticated && profile">
          <h4>{{profile.fullName}}</h4>
          <div class="caption text-xs-center">{{profile.email}}</div>
          <!--
          <v-icon class="bl" color="secondary">star_border</v-icon>
          <span class="display-1 ml-1">{{profile.userScore}}</span>
          <span class="subheading ml-1">{{profile.userPrevScore}}</span>
          -->
        </v-toolbar-title>
      </v-layout>
    </v-card>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-layout tag="v-list" column class="left-menu mt-3">
        <div v-if="profile">
          <template v-for="(item, index) in links">
            <template>
              <template v-if="isNavigationVisible(item)">
                <v-list-tile class="left-menu__icons" :key="index" :to="item.router">
                  <v-list-tile-action>
                    <v-icon medium class="material-icons-outlined">{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <span class="body-2 font-weight-bold">{{ item.title }}</span>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </template>
          </template>
        </div>
      </v-layout>
    </vue-perfect-scrollbar>1
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { EventBus } from "@/event-bus";
import { getCommonAvatar } from "@/util";
import { NavigationItem } from "@/models/navigation.interface";
import { UserProfile, AccessDescriptor } from "@/modules/user/types";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Menu from "@/data/menu";

@Component({
  computed: {
    ...mapState(["miniDrawer"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", {
      profile: "profile",
      accessDescriptor: "accessDescriptor",
    })
  },
  methods: {
    getCommonAvatar,
    isNavigationVisible(item: NavigationItem) { return isAccessible(item.name, (this as any).accessDescriptor); }
  },
  components: {
    VuePerfectScrollbar
  }
})
export default class AppDrawer extends Vue {
  links: Array<NavigationItem> = Menu;
  scrollSettings: any = {
    maxScrollbarLength: 160
  };
}

const isAccessible = (menuItemName: string, accessContext: { [key: string]: AccessDescriptor }): boolean => {
  if (accessContext == null || accessContext[menuItemName] == null) { return false; }
  return accessContext[menuItemName].isActive;
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
