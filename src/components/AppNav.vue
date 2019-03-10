<template>
  <nav>
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app absolute v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
          <v-layout row v-if="item.heading" align-center :key="item.heading">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile :to="item.to" v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>

      <v-toolbar flat class="transparent">
        <v-list>
          <v-list-tile>
            <Locale/>
          </v-list-tile>
        </v-list>
      </v-toolbar>

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

      <!-- Sign out-->
      <v-tooltip bottom>
        <template #activator="data">
          <v-btn v-on="data.on" v-show="isAuthenticated" icon @click="logOut">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>Sign out {{profile.fullName}}</span>
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
          small>
          <v-icon>edit</v-icon>
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
    }),
  })
  export default class AppNavigation extends Vue {
    private drawer: boolean = false;

    private logOut() {
      this.$store.dispatch('auth/authLogout').then(() => {
        this.$router.push('/');
      });
    }

    private created() {
      EventBus.$on('logged-in', (payLoad: any) => {
      });
    }

    private destroyed() {
      EventBus.$off('logged-in');
    }

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
