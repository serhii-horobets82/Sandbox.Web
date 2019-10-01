<template>
  <v-app>
    <template v-if="!$route.meta.public && isAuthenticated">
      <core-toolbar/>
      <core-drawer/>
      <v-btn
        :class="['toggle-btn', miniDrawer ? 'left' : 'right']"
        small
        fixed
        depressed
        top
        left
        fab
        @click.stop="toogleDrawer"
      >
        <v-icon color="primary">{{miniDrawer ? 'add' : 'remove'}}</v-icon>
      </v-btn>
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
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      <span class="body-1">{{ snackbar.text }}</span>
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import { EventBus } from "@/event-bus";
import { EVENTS } from "@/constants/index";

export default {
  data: () => ({
    rightDrawer: false,
    snackbar: {
      show: false
    }
  }),
  created() {
    EventBus.$on(EVENTS.SHOW_SNACKBAR, snackbar => {
      let defSnackbar = {
        show: true,
        color: "secondary",
        timeout: 3000,
        x: "right",
        y: "bottom"
      };
      this.snackbar = { ...defSnackbar, ...snackbar };
    });
    EventBus.$on(EVENTS.REDIRECT_TO_LOGIN, () => {
      this.$router.push("/auth");
    });
  },
  computed: {
    ...mapState(["miniDrawer"]),
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
    toogleDrawer() {
      this.$store.state.miniDrawer = !this.$store.state.miniDrawer;
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.toggle-btn {
  top: 30px;
  height: 24px;
  width: 24px;
  background-color: white !important;
  border: 1px solid lightgrey;

  &:focus:before, &:focus {
    background-color: white !important;
  }

  &.left {
    left: 66px;
  }

  &.right {
    left: 258px;
  }
}
</style>
