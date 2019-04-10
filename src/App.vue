<template>
  <v-app>
    <template v-if="!$route.meta.public">
      <core-toolbar/>
      <core-drawer/>
      <core-view/>
      <!-- Floating button for settings   -->
      <v-btn
        small
        fab
        falt
        fixed
        top="top"
        right="right"
        class="setting-fab"
        @click="openThemeSettings"
      >
        <v-icon>settings</v-icon>
      </v-btn>
      <!--  Settings drawer  -->
      <v-navigation-drawer
        class="setting-drawer"
        temporary
        right
        v-model="rightDrawer"
        hide-overlay
        fixed
      >
        <theme-settings></theme-settings>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>

    <!-- Global snackbar    -->
    <v-snackbar
      :timeout="snackbar.timeout"
      :left="snackbar.x === 'left'"
      :right="snackbar.x === 'right'"
      :bottom="snackbar.y === 'bottom'"
      :top="snackbar.y === 'top'"
      :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import {EventBus} from "@/event-bus";
  import {EVENTS} from "@/constants/index";

  export default {
    data: () => ({
      expanded: true,
      rightDrawer: false,
      snackbar: {
        show: false,
      }
    }),
    created() {
      EventBus.$on(EVENTS.SHOW_SNACKBAR, snackbar => {
        let defSnackbar = {show: true, color: "green", timeout: 3000, x: "right", y: "bottom"};
        this.snackbar = {...defSnackbar, ...snackbar};
      });
    },
    methods: {
      openThemeSettings() {
        this.$vuetify.goTo(0);
        this.rightDrawer = !this.rightDrawer;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .setting-fab
    top: 50% !important;
    right: 0;
    border-radius: 0
</style>
