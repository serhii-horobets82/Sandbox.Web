<template>

  <!-- <v-content>
    <v-container> -->
      <v-layout>
        <!-- <v-flex> -->
        <v-navigation-drawer clipped light>
          <v-list>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              :to="{name: item.url}"
            >
              <!-- <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action> -->

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <!-- </v-flex> -->

        <!-- <v-flex> -->
          <router-view></router-view>
        <!-- </v-flex> -->

      </v-layout>
    <!-- </v-container>
  </v-content> -->

</template>

<script>
export default {
  data: () => ({
    items: [
      {title: 'Notifications', url: 'personal-notifications'},
      {title: 'Profile', url: 'personal-profile'},
      {title: 'I Evaluate', url: 'personal-i-evaluate'},
      {title: 'PDP', url: 'personal-pdp'},
      // {title: 'Notifications', url: ''},
    ],
  }),
  created() {
    this.$router.push({name: 'personal-notifications'});
  },
}
</script>

<style>

</style>
