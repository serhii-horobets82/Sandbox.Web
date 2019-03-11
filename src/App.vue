<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import AppNavigation from '@/components/AppNav.vue'

  export default {
    name: 'App',
    components: {
      AppNavigation
    }
  }
</script>
<style lang="scss">
</style>
