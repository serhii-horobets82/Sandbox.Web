<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawerModel"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar to="/"
            color="white"
          >
            <v-img
              :src="logo"
              height="50"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title>
            {{title}} {{version}}
          </v-list-tile-title>
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

        <div color="transparent">
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
    </v-img>
  </v-navigation-drawer>
</template>

<script2>
  // Utilities
  import {
  mapMutations,
  mapState
  } from 'vuex'

  export default {
  data: () => ({
  logo: './img/logo.png',
  menu : Menu,
  links: [
  {
  to: '/dashboard',
  icon: 'home',
  text: 'Dashboard'
  },
  {
  to: '/user-profile',
  icon: 'mdi-account',
  text: 'User Profile'
  },
  {
  to: '/table-list',
  icon: 'mdi-clipboard-outline',
  text: 'Table List'
  },
  {
  to: '/typography',
  icon: 'mdi-format-font',
  text: 'Typography'
  },
  {
  to: '/icons',
  icon: 'mdi-chart-bubble',
  text: 'Icons'
  },
  {
  to: '/maps',
  icon: 'mdi-map-marker',
  text: 'Maps'
  },
  {
  to: '/notifications',
  icon: 'mdi-bell',
  text: 'Notifications'
  }
  ],
  responsive: false
  }),
  computed: {
  ...mapState(['image', 'color', ]),
  inputValue: {
  get () {
  return this.$store.state.drawer
  },
  set (val) {
  this.setDrawer(val)
  }
  },
  items () {
  console.log('xxx')
  return this.$t('Layout.View.items')
  }
  },
  mounted () {
  this.onResponsiveInverted()
  window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
  window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
  ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
  onResponsiveInverted () {
  if (window.innerWidth < 991) {
  this.responsive = true
  } else {
  this.responsive = false
  }
  }
  }
  }
</script2>

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
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.dispatch("setDrawer", val)
        }
      },
    },
    methods: {
      ...mapMutations(['setDrawer', 'toggleDrawer']),
    }
  })
  export default class AppDrawer extends Vue {
    // for mapped variables
    isAuthenticated: boolean;
    profile: UserProfile;

    logo: string = '/img/logo.png';
    responsive: boolean = false;

    links : Array<NavigationItem> = Menu;

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

    private created() {
      // try reload profile data on page refresh
      if (this.isAuthenticated && !this.profile) {
        this.$store.dispatch("user/userRequest").then(() => {
          this.$router.push("/");
        });
      }
      EventBus.$on("logged-in", (payLoad: any) => {
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
