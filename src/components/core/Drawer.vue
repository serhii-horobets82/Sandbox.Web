<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawerModel"
    app
    mini-variant-width="60"
    :mini-variant="mini"
    class="primary lighten-1"
    floating
    persistent
    width="260"
  >
    <v-layout tag="v-list" column>
      <v-list-tile>
        <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
      <template v-for="(item, i) in links">
        <v-subheader v-if="item.header" v-text="item.header" v-bind:key="i"/>
        <v-divider v-else-if="item.divider" v-bind:key="i"/>
        <template v-else>
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
            <v-list-tile
              :key="item.title"
              :to="item.router"
              :active-class="color"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </template>
      </template>
    </v-layout>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState, mapMutations } from "vuex";
import { EventBus } from "@/event-bus";
import { NavigationItem, NavigationGroup } from "@/models/navigation.interface";
import { UserProfile } from "@/modules/user/types";
import Menu from "@/data/menu";

@Component({
  computed: {
    ...mapState(["title", "image", "color", "drawer", "version"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"]),
    drawerModel: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.dispatch("showSidebar", val);
      }
    }
  },
  methods: {
    handleDrawerToggle() {
      this.$store.dispatch("toggleSideBar");
    }
  },
  created(): void {
    // try reload profile data on page refresh
    if (this.isAuthenticated && !this.profile) {
      this.$store.dispatch("user/userRequest").then(() => {
        this.$router.push("/");
      });
    }
    EventBus.$on("logged-in", (payLoad: any) => {});
  }
})
export default class AppDrawer extends Vue {
  logo: string = "/img/logo.svg";
  responsive: boolean = false;
  mini: boolean = true;
  links: Array<NavigationItem> = Menu;

  get personalNavigation(): Array<NavigationItem> {
    return this.links.filter(i => i.group === NavigationGroup.Personal);
  }

  get personalNavigationAuth(): Array<NavigationItem> {
    return this.links.filter(
      i => i.group === NavigationGroup.Personal && i.authRequired
    );
  }

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


<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
