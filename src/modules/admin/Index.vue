<template>
  <div>
    <v-toolbar flat color="accent" height="35">
      <v-toolbar-items>
        <template v-for="(item, ix) in links">
          <v-btn
            flat
            :key="ix"
            v-if="!item.autoHide || (item.authRequired && isAuthenticated)"
            :to="item.router"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            <span class="subheading font-weight-bold">{{ item.name }}</span>
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated",
    profile: "user/profile"
  })
})
export default class AdminPage extends Vue {
  links: any = [
    {
      name: "Users",
      icon: "people",
      router: "/admin/users",
      autoHide: true,
      authRequired: true
    },
    {
      name: "Logs",
      icon: "schedule",
      router: "/admin/activitylogs",
      autoHide: true,
      authRequired: true
    },
    {
      name: "Add user",
      icon: "add",
      router: "/admin/addUser",
      autoHide: true,
      authRequired: true
    }
  ];
}
</script>

<style>
</style>
