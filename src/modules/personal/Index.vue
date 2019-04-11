<template>
  <div>
  <!-- <v-content>
    <v-container> -->
      <!-- <v-layout> -->
        <!-- <v-flex> -->

        <v-toolbar height="35">
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat v-for="item in items"
              :key="item.title"
              :to="{name: item.url}"
            >
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- <v-navigation-drawer clipped light>
          <v-list>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              :to="{name: item.url}"
            >

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer> -->
        <!-- </v-flex> -->

        <!-- <v-flex> -->
          <router-view></router-view>
        <!-- </v-flex> -->

      <!-- </v-layout> -->
    <!-- </v-container>
  </v-content> -->
</div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {title: 'Notifications', url: 'personal-notifications'},
      {title: 'Profile', url: 'personal-profile'},
      {title: 'I Evaluate', url: 'personal-i-evaluate'},
      {title: 'Suggestions to improve', url: 'personal-suggestions-to-improve'},
      {title: 'PDP', url: 'personal-pdp'},
      // {title: 'Notifications', url: ''},
    ],
  }),
  created() {
    if (this.$router.currentRoute.name == 'personal') {
      this.$router.push({name: 'personal-profile'});
      // this.$router.push({name: 'personal-notifications'});
    }
  },
}
</script>

<style>

</style>
