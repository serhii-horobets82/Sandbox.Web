<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawerModel"
    app
    :mini-variant="mini"
    dark
    class="primary lighten-1"
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-layout
      tag="v-list"
      column>
      <v-list-tile avatar>
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile-title v-if="!mini" to="/">
          <v-img
            :src="logo"
            width="100"
            :alt="version"
          />
         </v-list-tile-title>
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
      <v-list-tile v-if="responsive"
      >
        <v-text-field
          class="purple-input search-input"
          label="Search..."
          color="purple"
        />
      </v-list-tile>

      <div>
        <template v-for="(item, i) in links">
          <v-subheader v-if="item.header" v-text="item.header" v-bind:key="i"/>
          <v-divider v-else-if="item.divider" v-bind:key="i" light/>
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
                    (userIsManager || userIsAdmin))">
              <v-list-tile
                :key="item.title"
                :to="item.router"
                :active-class="color"
                avatar
                class="v-list-item"
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
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {mapGetters, mapState, mapMutations} from "vuex";
  import {EventBus} from "@/event-bus";
  import {NavigationItem, NavigationGroup} from "@/models/navigation.interface";
  import {UserProfile} from "@/modules/user/types";
  import Menu from "@/data/menu";

  @Component({
    computed: {
      ...mapState(['title', 'image', 'color', 'drawer', 'version']),
      ...mapGetters("auth", ["isAuthenticated"]),
      ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"]),
      drawerModel: {
        get() {
          return this.$store.state.drawer
        },
        set(val) {
          this.$store.dispatch("showSidebar", val)
        }
      },
    },
    methods: {},
    created(): void {
      // try reload profile data on page refresh
      if (this.isAuthenticated && !this.profile) {
        this.$store.dispatch("user/userRequest").then(() => {
          this.$router.push("/");
        });
      }
      EventBus.$on("logged-in", (payLoad: any) => {
      });
    }
  })
  export default class AppDrawer extends Vue {
    logo: string = '/img/logo.svg';
    responsive: boolean = false;
    mini: boolean = false;
    links: Array<NavigationItem> = Menu;

    get personalNavigation(): Array<NavigationItem> {
      return this.links.filter(i => i.group === NavigationGroup.Personal);
    }

    get personalNavigationAuth(): Array<NavigationItem> {
      return this.links.filter(i => i.group === NavigationGroup.Personal && i.authRequired);
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
