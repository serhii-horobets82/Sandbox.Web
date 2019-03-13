<template>
  <nav>
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app absolute v-model="drawer">
      <v-divider></v-divider>

      <v-list dense>
        <template v-for="(item, i) in sidebar">
          <v-subheader v-if="item.header " v-text="item.header" v-bind:key="i"/>
          <v-divider v-else-if="item.divider" v-bind:key="i" light/>
          <template v-else>
            <template v-if="!item.autoHide || (item.unauthRequired && !isAuthenticated) ||
                      (item.authRequired && isAuthenticated && !item.managerRoleRequired && !item.adminRoleRequired) ||
                      (item.authRequired && isAuthenticated && item.adminRoleRequired && userIsAdmin) ||
                      (item.authRequired && isAuthenticated && item.managerRoleRequired && (userIsManager || userIsAdmin))">
              <v-list-tile :key="item.title"
                           @click="item.router != null ? visitRoute(item.router) : visitUrl(item.link)">
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
      </v-list>

      <v-list>
        <v-subheader>Language</v-subheader>
        <v-list-tile>
          <Locale/>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 200px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down" v-bind:title="$appTitle">EvoFlare</span>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>

      <!--render top right icons-->
      <template v-for="item in items">
        <v-tooltip bottom :key="item.text">
          <template #activator="data">
            <v-btn
              v-on="data.on"
              icon
              :to="item.to"
              :class="{ 'hidden-sm-and-down': item.hiddenSmall }"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
      </template>


      <!-- Sign in-->
      <v-tooltip bottom>
        <template #activator="data">
          <v-btn v-on="data.on" v-show="!isAuthenticated" icon to="/auth">
            <v-icon>lock</v-icon>
          </v-btn>
        </template>
        <span>Sign in</span>
      </v-tooltip>

      <v-speed-dial
        direction="bottom"
        v-show="isAuthenticated">
        <template v-slot:activator>
          <v-avatar size="32">
            <img
              v-bind:src="profile.pictureUrl"
              v-bind:alt="profile.fullName">
          </v-avatar>
        </template>
        <v-btn
          fab
          to="/profile"
          small>
          <v-icon>person</v-icon>
        </v-btn>
        <v-btn
          fab
          small @click="logOut">
          <v-icon>exit_to_app</v-icon>
        </v-btn>

      </v-speed-dial>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import Locale from "./Locale.vue";
  import {EventBus} from '@/event-bus';
  import {mapGetters} from 'vuex';

  @Component({
    components: {
      Locale
    },
    computed: mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      profile: 'user/profile',
      userIsAdmin: 'user/userIsAdmin',
      userIsManager: 'user/userIsAdmin'
    }),

  })
  export default class AppNavigation extends Vue {
    private drawer: boolean = true;

    private logOut() {
      this.$store.dispatch('auth/authLogout').then(() => {
        this.$router.push('/');
      });
    }

    private created() {
      const isAuthenticated = this.$store.getters["auth/isAuthenticated"];
      const profile = this.$store.getters["user/profile"];

      if(isAuthenticated && !profile.id){
        this.$store.dispatch('user/userRequest').then(() => {
          this.$router.push('/');
        });
      }
      EventBus.$on('logged-in', (payLoad: any) => {
      });
    }

    private destroyed() {
      EventBus.$off('logged-in');
    }

    visitUrl(url: string) {
      window.open(url);
    }

    visitRoute(url: string) {
      // temporary
      if (url === '/logout') {
        this.logOut();
        this.$router.push('/');
        return;
      }
      this.$router.push(url)
    }

    sidebar: any = [
      {header: 'Main'},
      {
        title: 'Home',
        icon: 'home',
        router: '/'
      },
      {
        title: 'Organization',
        icon: 'supervisor_account',
        router: '/organization'
      },
      {
        title: 'Evaluation',
        icon: 'ballot',
        router: '/evaluation'
      },
      {
        title: 'OKR',
        icon: 'timeline',
        router: '/okr'
      },
      {
        title: 'About',
        icon: 'info',
        router: '/about'
      },
      {header: 'Personal'},
      {
        title: 'Account',
        icon: 'person',
        router: '/profile',
        authRequired: true,
        autoHide: true
      },
      {
        title: 'Login',
        icon: 'person',
        router: '/auth',
        unauthRequired: true,
        autoHide: true
      },
      {
        title: 'Logout',
        icon: 'exit_to_app',
        router: '/logout',
        authRequired: true,
        autoHide: true
      },
      {
        title: 'Administrator',
        icon: 'build',
        router: '/admin',
        authRequired: true,
        adminRoleRequired: true,
        autoHide: true
      }
    ];


    private items: any = [
      {id: 1, icon: "home", text: "Home", to: "/"},
      {id: 2, icon: "supervisor_account", text: "Organization", to: "/organization"},
      {id: 3, icon: "ballot", text: "Evaluation", to: "/evaluation"},
      {id: 4, icon: "timeline", text: "OKR", to: "/okr"},
      {id: 5, icon: "info", text: "About", to: "/about", hiddenSmall: true}
    ];
  }
</script>

<style scoped></style>
